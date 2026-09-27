"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** One shared, low-draw-call WebGL scene; motion reads the backdrop's master scroll value. */
export function CinematicWorld() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host || !window.WebGLRenderingContext) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const touch = window.matchMedia("(pointer: coarse)").matches;
        const cores = navigator.hardwareConcurrency || 4;
        const quality = reduced || touch || cores <= 4 ? "low" : cores <= 8 ? "medium" : "high";
        host.dataset.quality = quality;
        if (reduced || touch || cores <= 2) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: quality === "high", powerPreference: "low-power" });
        } catch {
            host.dataset.failed = "true";
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality === "high" ? 1.35 : 1));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 80);
        camera.position.set(0, 0, 8.5);

        const world = new THREE.Group();
        scene.add(world);

        // A few reusable forms establish one visual language: glass, technical lines, data nodes.
        const glassMaterial = new THREE.MeshBasicMaterial({ color: 0x7887ff, wireframe: true, transparent: true, opacity: 0.22 });
        const cyanLine = new THREE.LineBasicMaterial({ color: 0x55dff2, transparent: true, opacity: 0.48 });
        const violetLine = new THREE.LineBasicMaterial({ color: 0x9d86ff, transparent: true, opacity: 0.4 });
        const structure = new THREE.Group();
        world.add(structure);

        const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 1), glassMaterial);
        structure.add(shell);
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.006, 4, 128), cyanLine);
        orbit.rotation.set(0.55, 0.18, -0.28);
        structure.add(orbit);
        const orbit2 = new THREE.Mesh(new THREE.TorusGeometry(1.78, 0.004, 4, 112), violetLine);
        orbit2.rotation.set(-0.72, 0.44, 0.3);
        structure.add(orbit2);

        const count = quality === "high" ? 210 : quality === "medium" ? 110 : 48;
        const points = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 2.5 + Math.random() * 2.7;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            points[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            points[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            points[i * 3 + 2] = radius * Math.cos(phi);
        }
        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
        const pointCloud = new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x88c9f5, size: quality === "high" ? 0.018 : 0.014, transparent: true, opacity: 0.68, sizeAttenuation: true }));
        world.add(pointCloud);

        const nodes = new THREE.Group();
        world.add(nodes);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8a80ff, transparent: true, opacity: 0.75 });
        const nodeGeo = new THREE.IcosahedronGeometry(0.045, 1);
        const nodePositions = [
            [-1.7, 0.9, 0], [-0.6, 1.55, -0.2], [0.8, 1.1, 0.2], [1.65, 0.4, -0.1],
            [-1.3, -0.4, 0.2], [-0.2, -0.1, -0.3], [1, -0.7, 0.1], [0.2, -1.45, 0],
        ];
        nodePositions.forEach(([x, y, z]) => {
            const node = new THREE.Mesh(nodeGeo, nodeMaterial);
            node.position.set(x, y, z);
            nodes.add(node);
        });
        const connections = new THREE.BufferGeometry().setFromPoints(nodePositions.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
        const network = new THREE.Line(connections, cyanLine);
        nodes.add(network);

        // A restrained panel composition gives CGC a spatial cue without fabricating screenshot UI.
        const panels = new THREE.Group();
        world.add(panels);
        const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x827aff, wireframe: true, transparent: true, opacity: 0.34 });
        const panelGeometry = new THREE.BoxGeometry(2.45, 1.45, 0.08);
        const panelA = new THREE.Mesh(panelGeometry, panelMaterial);
        panels.add(panelA);
        const panelB = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.72, 0.06), panelMaterial);
        panelB.position.set(1.8, -0.82, -0.35);
        panels.add(panelB);
        const panelC = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.56, 0.06), panelMaterial);
        panelC.position.set(-1.75, 0.9, -0.45);
        panels.add(panelC);

        // Robotics circuit: connected path plus small component-like nodes.
        const circuit = new THREE.Group();
        world.add(circuit);
        const circuitPoints = [
            new THREE.Vector3(-2.4, -0.65, 0), new THREE.Vector3(-1.35, -0.65, 0), new THREE.Vector3(-1.35, 0.5, 0),
            new THREE.Vector3(-0.2, 0.5, 0), new THREE.Vector3(-0.2, -0.95, 0), new THREE.Vector3(1.05, -0.95, 0),
            new THREE.Vector3(1.05, 0.72, 0), new THREE.Vector3(2.3, 0.72, 0),
        ];
        circuit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circuitPoints), cyanLine));
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.43, 0.1), panelMaterial);
        chip.position.set(0.38, 0.5, 0.05);
        circuit.add(chip);
        circuitPoints.filter((_, index) => index % 2 === 0).forEach((position) => {
            const node = new THREE.Mesh(nodeGeo, nodeMaterial);
            node.position.copy(position);
            circuit.add(node);
        });

        const path = new THREE.Group();
        world.add(path);
        const pathPoints: THREE.Vector3[] = [];
        for (let i = 0; i <= 48; i++) {
            const t = i / 48;
            pathPoints.push(new THREE.Vector3(-3.3 + t * 6.6, Math.sin(t * Math.PI * 2) * 0.55, -0.3));
        }
        path.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPoints), violetLine));

        nodes.visible = panels.visible = circuit.visible = path.visible = false;

        let scroll = 0;
        let targetX = 0;
        let targetY = 0;
        let mouseX = 0;
        let mouseY = 0;
        const bootTime = performance.now();
        let active = !document.hidden;
        let frame = 0;
        const scrollSource = document.querySelector<HTMLElement>(".cinematic-backdrop");
        const setTargets = (event: PointerEvent) => {
            if (touch) return;
            targetX = (event.clientX / window.innerWidth - 0.5) * 0.16;
            targetY = (event.clientY / window.innerHeight - 0.5) * 0.12;
        };
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        const visibility = () => { active = !document.hidden; };
        const animate = () => {
            frame = 0;
            if (!active) return;
            scroll = Number(scrollSource?.style.getPropertyValue("--scroll-progress") || 0);
            mouseX += (targetX - mouseX) * 0.035;
            mouseY += (targetY - mouseY) * 0.035;
            const phase = (start: number, end: number) => THREE.MathUtils.clamp((scroll - start) / (end - start), 0, 1);

            // Smooth camera travel: enter the form, pass the interface and settle into the closing field.
            const pass = phase(0.02, 0.2);
            camera.position.x += ((mouseX + (scroll - 0.5) * 0.28) - camera.position.x) * 0.025;
            camera.position.y += ((-mouseY + Math.sin(scroll * Math.PI * 2) * 0.06) - camera.position.y) * 0.025;
            camera.position.z += ((8.5 - pass * 1.4 + phase(0.72, 1) * 0.8) - camera.position.z) * 0.025;
            camera.rotation.y += ((-mouseX * 0.2 + (scroll - 0.5) * 0.025) - camera.rotation.y) * 0.025;

            const heroFade = 1 - phase(0.12, 0.29);
            const networkFade = phase(0.2, 0.4) * (1 - phase(0.52, 0.64));
            const panelFade = phase(0.48, 0.62) * (1 - phase(0.67, 0.76));
            const circuitFade = phase(0.66, 0.78) * (1 - phase(0.83, 0.91));
            const pathFade = phase(0.78, 0.9);
            structure.visible = heroFade > 0.01;
            nodes.visible = networkFade > 0.01;
            panels.visible = panelFade > 0.01;
            circuit.visible = circuitFade > 0.01;
            path.visible = pathFade > 0.01;
            const intro = THREE.MathUtils.clamp((performance.now() - bootTime) / 1400, 0, 1);
            glassMaterial.opacity = 0.22 * heroFade * intro;
            nodeMaterial.opacity = 0.75 * networkFade * intro;
            panelMaterial.opacity = 0.34 * Math.max(panelFade, circuitFade) * intro;
            cyanLine.opacity = 0.48 * Math.max(heroFade, networkFade, circuitFade) * intro;
            violetLine.opacity = 0.4 * Math.max(heroFade, panelFade, pathFade) * intro;
            (pointCloud.material as THREE.PointsMaterial).opacity = 0.68 * intro;
            nodes.scale.setScalar(0.8 + networkFade * 0.2);
            panels.scale.setScalar(0.86 + panelFade * 0.14);
            circuit.scale.setScalar(0.88 + circuitFade * 0.12);
            structure.position.set(-0.8 + scroll * 1.3, Math.sin(scroll * Math.PI * 1.5) * 0.15, -scroll * 0.4);
            structure.rotation.set(0.14 + scroll * 0.3 + mouseY, scroll * 0.7 + mouseX, scroll * 0.22);
            orbit.rotation.y = 0.18 + scroll * 0.85;
            orbit2.rotation.x = -0.72 + scroll * 0.48;
            nodes.position.set(0.6 - scroll * 0.5, 0, -0.4);
            panels.position.set(0.25, 0, -0.35);
            panels.rotation.y = -0.08 + mouseX * 0.16;
            circuit.position.set(-0.15, 0, -0.25);
            path.position.set(0.1, -0.1, -0.2);
            path.scale.setScalar(0.75 + pathFade * 0.25);
            pointCloud.rotation.y += 0.0007;
            pointCloud.rotation.x = mouseY * 0.15;

            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };
        const schedule = () => { if (!frame && active) frame = requestAnimationFrame(animate); };
        const onVisibility = () => { visibility(); if (active) schedule(); else if (frame) cancelAnimationFrame(frame); frame = 0; };
        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("pointermove", setTargets, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        schedule();

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", setTargets);
            document.removeEventListener("visibilitychange", onVisibility);
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
                    object.geometry.dispose();
                    const materials = Array.isArray(object.material) ? object.material : [object.material];
                    materials.forEach((material) => material.dispose());
                }
            });
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={hostRef} className="cinematic-world" aria-hidden="true" />;
}
