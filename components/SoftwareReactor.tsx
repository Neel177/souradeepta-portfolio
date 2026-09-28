"use client";

import { useEffect, useRef } from "react";

/** Single-scene generative background; constrained devices keep the CSS reactor. */
export function SoftwareReactor() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const compact = window.matchMedia("(max-width: 700px)").matches;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        const cores = navigator.hardwareConcurrency || 4;
        if (motionPreference.matches || cores <= 4 || !window.WebGLRenderingContext) return;
        if (compact && cores <= 6) return;

        let disposed = false;
        let frame = 0;
        let last = 0;
        let lastScrollAt = 0;
        let lastScrollY = window.scrollY;
        let targetX = 0;
        let targetY = 0;
        let parallaxX = 0;
        let parallaxY = 0;
        let scrollTarget = 0;
        let scrollPosition = 0;
        let scrollVelocity = 0;
        let pulse = 0;
        let renderer: import("three").WebGLRenderer | undefined;
        let scene: import("three").Scene | undefined;
        let camera: import("three").PerspectiveCamera | undefined;
        let rig: import("three").Group | undefined;
        let core: import("three").Mesh | undefined;
        let coreShell: import("three").Mesh | undefined;
        let network: import("three").Group | undefined;
        let nodeMesh: import("three").InstancedMesh | undefined;
        let nodeColorScratch: import("three").Color | undefined;
        let nodeDayColors: number[] = [];
        let nodeNightColors: number[] = [];
        let orbitGroups: import("three").Group[] = [];
        let themeMaterials: Array<{ material: import("three").Material; day: number; night: number }> = [];
        let geometries: import("three").BufferGeometry[] = [];
        let materials: import("three").Material[] = [];
        let ambient: import("three").HemisphereLight | undefined;
        let accentLight: import("three").PointLight | undefined;
        let lastHapticAt = 0;

        const canVibrate = () => !motionPreference.matches && coarse && "vibrate" in navigator;
        const vibrateOnce = (now: number) => {
            if (!canVibrate() || now - lastHapticAt < 1100) return;
            lastHapticAt = now;
            try { navigator.vibrate(8); } catch { /* Unsupported or denied by the browser. */ }
        };

        const setTheme = () => {
            const day = document.documentElement.dataset.theme === "day";
            themeMaterials.forEach(({ material, day: dayColor, night: nightColor }) => {
                const color = day ? dayColor : nightColor;
                const candidate = material as import("three").MeshBasicMaterial;
                candidate.color?.setHex(color);
                const standard = material as import("three").MeshStandardMaterial;
                standard.emissive?.setHex(day ? 0x287a9a : 0x423cb9);
            });
            if (nodeMesh) {
                const colors = day
                    ? nodeDayColors
                    : nodeNightColors;
                if (nodeColorScratch) colors.forEach((color, index) => {
                    nodeColorScratch?.setHex(color);
                    nodeMesh?.setColorAt(index, nodeColorScratch!);
                });
                if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
            }
            if (ambient) ambient.color.setHex(day ? 0xf3fbff : 0xcbdcff);
            if (accentLight) accentLight.color.setHex(day ? 0x40b6d2 : 0x7f73ff);
        };

        const onPointerMove = (event: PointerEvent) => {
            if (coarse) return;
            targetX = (event.clientX / window.innerWidth - 0.5) * 0.1;
            targetY = (event.clientY / window.innerHeight - 0.5) * 0.08;
        };
        const onScroll = () => {
            const now = performance.now();
            const y = window.scrollY;
            const elapsed = Math.max(16, now - (lastScrollAt || now - 16));
            const delta = y - lastScrollY;
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollTarget = scrollableHeight > 0
                ? y / scrollableHeight
                : 0;
            scrollVelocity = Math.max(-3, Math.min(3, (delta / elapsed) * 1000 / Math.max(1, window.innerHeight)));
            if (Math.abs(scrollVelocity) > 2.15 && now - lastScrollAt > 650) {
                pulse = 1;
                vibrateOnce(now);
            }
            lastScrollY = y;
            lastScrollAt = now;
        };
        const resize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight, false);
        };
        const themeObserver = new MutationObserver(setTheme);
        const teardown = () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("visibilitychange", onVisibility);
            motionPreference.removeEventListener("change", onMotionChange);
            themeObserver.disconnect();
            geometries.forEach((geometry) => geometry.dispose());
            materials.forEach((material) => material.dispose());
            geometries = [];
            materials = [];
            renderer?.dispose();
            renderer?.domElement.remove();
            delete host.dataset.webgl;
        };

        const animate = (now: number) => {
            frame = 0;
            if (disposed || !renderer || !scene || !camera || document.hidden || motionPreference.matches) return;
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
            last = now;
            const blend = Math.min(1, dt * 2.4);
            parallaxX += (targetX - parallaxX) * blend;
            parallaxY += (targetY - parallaxY) * blend;
            scrollPosition += (scrollTarget - scrollPosition) * Math.min(1, dt * 1.6);
            scrollVelocity *= Math.exp(-dt * 2.8);
            pulse *= Math.exp(-dt * 2.5);
            const scrollTurn = scrollPosition * 0.12 + scrollVelocity * 0.008;
            if (rig) {
                rig.rotation.x = parallaxY * 0.8 + Math.sin(now * 0.00011) * 0.018 + scrollTurn * 0.35;
                rig.rotation.y = parallaxX * 0.8 + now * 0.000018 + scrollTurn;
                rig.rotation.z = Math.sin(now * 0.00009) * 0.012 + scrollPosition * 0.035;
                rig.position.set((compact ? 0.32 : 0.82) + parallaxX * 0.8, 0.18 - parallaxY * 0.65, -0.08 + pulse * 0.045);
                rig.scale.setScalar(1 + pulse * 0.012);
            }
            if (core) {
                core.rotation.y += dt * 0.045;
                core.rotation.x = Math.sin(now * 0.00015) * 0.08 + scrollPosition * 0.08;
                core.scale.setScalar(1 + Math.sin(now * 0.00065) * 0.004 + pulse * 0.012);
            }
            if (coreShell) {
                coreShell.rotation.y -= dt * 0.018;
                coreShell.rotation.z += dt * 0.012;
            }
            orbitGroups.forEach((group, index) => {
                group.rotation.z += dt * (index % 2 ? -0.012 : 0.009);
                group.rotation.x += dt * (index % 2 ? 0.003 : -0.002);
            });
            if (network) {
                network.rotation.y = Math.sin(now * 0.0002) * 0.035 + scrollTurn * 0.4;
                network.rotation.x = Math.cos(now * 0.00016) * 0.025 + parallaxY * 0.35;
            }
            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };
        const schedule = () => {
            if (!frame && !disposed && !document.hidden && !motionPreference.matches) frame = requestAnimationFrame(animate);
        };
        const onVisibility = () => {
            if (document.hidden) { if (frame) cancelAnimationFrame(frame); frame = 0; }
            else { last = 0; schedule(); }
        };
        const onMotionChange = () => {
            host.dataset.reduced = String(motionPreference.matches);
            if (motionPreference.matches) { if (frame) cancelAnimationFrame(frame); frame = 0; }
            else { last = 0; schedule(); }
        };
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

        void import("three").then((THREE) => {
            if (disposed) return;
            try {
                renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 0.85 : 1.2));
                renderer.setSize(window.innerWidth, window.innerHeight, false);
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.12;
                renderer.domElement.setAttribute("aria-hidden", "true");
                host.appendChild(renderer.domElement);

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 40);
                camera.position.set(0, 0, 8.2);
                rig = new THREE.Group();
                scene.add(rig);
                ambient = new THREE.HemisphereLight(0xeaf7ff, 0x282744, 1.25);
                scene.add(ambient);
                accentLight = new THREE.PointLight(0x777cff, 1.6, 12, 2);
                accentLight.position.set(-1.2, 1.6, 3.2);
                scene.add(accentLight);

                const registerTheme = (material: import("three").Material, day: number, night: number) => {
                    themeMaterials.push({ material, day, night });
                    materials.push(material);
                    return material;
                };
                const coreMaterial = registerTheme(new THREE.MeshStandardMaterial({
                    color: 0x65cce3, emissive: 0x423cb9, emissiveIntensity: 0.42,
                    metalness: 0.16, roughness: 0.3, transparent: true, opacity: 0.84,
                }), 0x65cce3, 0x7790fa) as import("three").MeshStandardMaterial;
                const coreGeometry = new THREE.IcosahedronGeometry(0.7, 4);
                geometries.push(coreGeometry);
                core = new THREE.Mesh(coreGeometry, coreMaterial);
                rig.add(core);

                const shellGeometry = new THREE.SphereGeometry(0.88, 32, 24);
                geometries.push(shellGeometry);
                const shellMaterial = registerTheme(new THREE.MeshBasicMaterial({
                    color: 0x91d9ed, wireframe: true, transparent: true, opacity: 0.28,
                    depthWrite: false,
                }), 0x70b9dd, 0x7878ec);
                coreShell = new THREE.Mesh(shellGeometry, shellMaterial);
                coreShell.scale.set(1.07, 0.96, 1.12);
                rig.add(coreShell);

                const nodeCount = compact ? 16 : 40;
                const nodeGeometry = new THREE.SphereGeometry(1, 8, 6);
                geometries.push(nodeGeometry);
                nodeColorScratch = new THREE.Color();
                const nodeMaterial = registerTheme(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }), 0xffffff, 0xffffff);
                const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
                nodeMesh = nodes;
                nodeDayColors = compact
                    ? [0x1598b7, 0x4b59ca, 0x8a5eb9, 0x278e86]
                    : [0x1598b7, 0x4b59ca, 0x8a5eb9, 0xc86a9f, 0x278e86];
                nodeNightColors = compact
                    ? [0x48d7f4, 0x818bff, 0xc08dff, 0x66e4d7]
                    : [0x48d7f4, 0x818bff, 0xc08dff, 0xffa0d1, 0x66e4d7];
                const matrix = new THREE.Matrix4();
                const position = new THREE.Vector3();
                const scale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                for (let i = 0; i < nodeCount; i++) {
                    const v = 1 - (i / (nodeCount - 1)) * 2;
                    const phi = i * Math.PI * (3 - Math.sqrt(5));
                    const depth = Math.sin(i * 2.1) * 0.3;
                    const radius = 1.22 + ((i * 7) % 5) * 0.095;
                    position.set(Math.cos(phi) * Math.sqrt(1 - v * v) * radius, v * radius, depth + Math.sin(phi * 2) * 0.12);
                    const size = 0.025 + (i % 4) * 0.006;
                    scale.set(size, size, size);
                    matrix.compose(position, quaternion, scale);
                    nodes.setMatrixAt(i, matrix);
                    nodes.setColorAt(i, new THREE.Color(nodeNightColors[i % nodeNightColors.length]));
                }
                nodes.instanceMatrix.needsUpdate = true;
                if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
                rig.add(nodes);

                // Curated near-neighbour links make a sparse architecture rather than a point cloud.
                const linkPositions: number[] = [];
                const nodePoints: Array<[number, number, number]> = [];
                for (let i = 0; i < nodeCount; i++) {
                    const v = 1 - (i / (nodeCount - 1)) * 2;
                    const phi = i * Math.PI * (3 - Math.sqrt(5));
                    const radius = 1.22 + ((i * 7) % 5) * 0.095;
                    nodePoints.push([Math.cos(phi) * Math.sqrt(1 - v * v) * radius, v * radius, Math.sin(i * 2.1) * 0.3 + Math.sin(phi * 2) * 0.12]);
                }
                for (let i = 0; i < nodeCount; i++) {
                    for (const step of [1, 5]) {
                        const j = (i + step) % nodeCount;
                        if (step === 5 && i % 2) continue;
                        linkPositions.push(...nodePoints[i], ...nodePoints[j]);
                    }
                }
                const linkGeometry = new THREE.BufferGeometry();
                linkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3));
                geometries.push(linkGeometry);
                const linkMaterial = registerTheme(new THREE.LineBasicMaterial({ color: 0x7b8eff, transparent: true, opacity: 0.4 }), 0x439cbe, 0x8172ea);
                network = new THREE.Group();
                network.add(new THREE.LineSegments(linkGeometry, linkMaterial));
                rig.add(network);

                const orbitCount = compact ? 2 : 4;
                for (let index = 0; index < orbitCount; index++) {
                    const radius = 1.06 + index * 0.2;
                    const group = new THREE.Group();
                    group.rotation.set(0.55 + index * 0.36, (index % 2 ? -0.52 : 0.35) + index * 0.08, index * 0.67);
                    const dayPalette = [0x38b8d1, 0x7269dc, 0x8b72d4, 0x54b7c8];
                    const nightPalette = [0x55cde8, 0x887cff, 0xb274e0, 0x6aa7fb];
                    const material = registerTheme(new THREE.MeshBasicMaterial({ color: nightPalette[index], transparent: true, opacity: index === 0 ? 0.5 : 0.36, depthWrite: false }), dayPalette[index], nightPalette[index]);
                    const geometry = new THREE.TorusGeometry(radius, index === 0 ? 0.006 : 0.004, 5, 112);
                    geometries.push(geometry);
                    group.add(new THREE.Mesh(geometry, material));
                    orbitGroups.push(group);
                    rig.add(group);
                }
                setTheme();
                host.dataset.webgl = "true";
                window.addEventListener("resize", resize, { passive: true });
                window.addEventListener("pointermove", onPointerMove, { passive: true });
                window.addEventListener("scroll", onScroll, { passive: true });
                document.addEventListener("visibilitychange", onVisibility);
                motionPreference.addEventListener("change", onMotionChange);
                schedule();
            } catch {
                teardown();
            }
        }).catch(() => undefined);

        return () => { disposed = true; teardown(); };
    }, []);

    return <div ref={hostRef} className="software-reactor" aria-hidden="true"><div className="software-reactor__fallback" /></div>;
}
