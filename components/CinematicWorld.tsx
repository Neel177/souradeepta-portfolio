"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Shot = { at: number; position: THREE.Vector3; target: THREE.Vector3; fov: number; light: THREE.Color };

/** One shared procedural diorama. Scroll keyframes choreograph the camera through its connected districts. */
export function CinematicWorld() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host || !window.WebGLRenderingContext) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const touch = window.matchMedia("(pointer: coarse)").matches;
        const cores = navigator.hardwareConcurrency || 4;
        const quality = cores > 8 ? "high" : "medium";
        host.dataset.quality = quality;
        if (reduced || touch || cores <= 4) return;

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
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x9eafbd, 0.006);
        const camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, 0.1, 180);
        camera.position.set(0, 8, 22);
        const hemi = new THREE.HemisphereLight(0xe7f4ff, 0x7c7567, 1.45);
        scene.add(hemi);
        const sun = new THREE.DirectionalLight(0xffe4bc, 2.35);
        sun.position.set(-10, 18, 13);
        scene.add(sun);
        const coolFill = new THREE.DirectionalLight(0xabcfff, 0.72);
        coolFill.position.set(12, 8, -12);
        scene.add(coolFill);
        const world = new THREE.Group();
        scene.add(world);

        const mat = (color: number, options: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
            new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04, ...options });
        const lineMat = (color: number, opacity = 0.75) => new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
        const boxGeo = new THREE.BoxGeometry(1, 1, 1);
        const sphereGeo = new THREE.SphereGeometry(1, 12, 10);
        const groundMat = mat(0x899f91);
        const roadMat = mat(0x596a7a, { roughness: 0.88 });
        const sidewalkMat = mat(0xadb6a7);
        const glassMat = mat(0x8fb9d0, { roughness: 0.24, metalness: 0.17 });
        const creamMat = mat(0xf0dfbd);
        const coralMat = mat(0xe99476);
        const sageMat = mat(0x7b9c81);
        const leafMat = mat(0x719d7d, { roughness: 0.9 });
        const trunkMat = mat(0x806b58);
        const warmWindowMat = mat(0xffd48e, { emissive: 0x9e5f22, emissiveIntensity: 0.42, roughness: 0.42 });
        const coolWindowMat = mat(0xc8e8ff, { emissive: 0x3b759b, emissiveIntensity: 0.35, roughness: 0.36 });
        const darkMat = mat(0x253346, { roughness: 0.48 });
        const cyanMat = mat(0x64d9ea, { emissive: 0x137888, emissiveIntensity: 0.65, roughness: 0.38 });
        const violetMat = mat(0x9d8beb, { emissive: 0x4d368b, emissiveIntensity: 0.56, roughness: 0.38 });
        const blueMat = mat(0x547fbd, { roughness: 0.48 });
        const steelMat = mat(0x9baebb, { metalness: 0.68, roughness: 0.32 });
        const woodMat = mat(0xa77d60);
        const charcoalMat = mat(0x363c49, { roughness: 0.46 });

        const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.scale.set(sx, sy, sz);
            parent.add(mesh);
            return mesh;
        };
        const addBox = (parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number, w: number, h: number, d: number) =>
            addMesh(boxGeo, material, parent, x, y, z, w, h, d);
        const addSphere = (parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number) =>
            addMesh(sphereGeo, material, parent, x, y, z, sx, sy, sz);
        const addLine = (parent: THREE.Object3D, points: THREE.Vector3[], material: THREE.Material) => {
            const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
            parent.add(line);
            return line;
        };
        const between = (parent: THREE.Object3D, material: THREE.Material, a: THREE.Vector3, b: THREE.Vector3, radius: number) => {
            const delta = b.clone().sub(a);
            const bone = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.82, radius, delta.length(), 8), material);
            bone.position.copy(a).add(b).multiplyScalar(0.5);
            bone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
            parent.add(bone);
            return bone;
        };

        // A long, low diorama island lets each section be a district on one continuous road.
        // Keep the ground behind the street edge so foreground text never sits on a bright ground slab.
        const terrain = addMesh(new THREE.PlaneGeometry(68, 13), groundMat, world, 16, -0.42, -3.1, 1, 1, 1);
        terrain.rotation.x = -Math.PI / 2;
        addBox(world, roadMat, 16, -0.27, 0, 66, 0.08, 3.8);
        addBox(world, sidewalkMat, 16, -0.22, 2.48, 66, 0.2, 1.05);
        addBox(world, sidewalkMat, 16, -0.22, -2.48, 66, 0.2, 1.05);
        addBox(world, mat(0xb9c1b1), 16, -0.24, 3.07, 66, 0.11, 0.12);
        addBox(world, mat(0xb9c1b1), 16, -0.24, -3.07, 66, 0.11, 0.12);

        const dashGeo = new THREE.BoxGeometry(0.72, 0.012, 0.075);
        const dash = new THREE.InstancedMesh(dashGeo, mat(0xf7e8c9), 54);
        const matrix = new THREE.Matrix4();
        for (let i = 0; i < 54; i++) {
            matrix.makeTranslation(-15 + i * 1.18, -0.224, 0);
            dash.setMatrixAt(i, matrix);
        }
        world.add(dash);
        // Crosswalks repeat as one instanced mesh, keeping the city scene inexpensive.
        const stripe = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 0.015, 2.3), mat(0xf5eee1), 24);
        for (let group = 0; group < 3; group++) for (let i = 0; i < 8; i++) {
            matrix.makeTranslation(4 + group * 18 + i * 0.27, -0.214, 0);
            stripe.setMatrixAt(group * 8 + i, matrix);
        }
        world.add(stripe);

        // Original pastel city: shared box/window geometry, instanced facades and a soft distant ridge.
        const buildingRows: Array<{ x: number; z: number; w: number; h: number; d: number; color: number }> = [];
        const palette = [0x8ca9b6, 0xe4c8a7, 0xc8977f, 0x9bb2a8, 0xa4a0c0, 0xd8d8cd, 0x7595a7];
        for (let i = 0; i < 24; i++) {
            const x = -8 + i * 2.28;
            const hash = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
            const h = 2.2 + hash(i + 2) * 4.2;
            const w = 1.25 + hash(i + 50) * 0.8;
            buildingRows.push({ x, z: -6.25, w, h, d: 1.7, color: palette[i % palette.length] });
            if (i % 2 === 0 && !(x > 0 && x < 5)) buildingRows.push({ x: x + 0.72, z: -3.95, w: 1.15, h: 1.8 + hash(i + 91) * 2.2, d: 1.25, color: palette[(i + 3) % palette.length] });
        }
        const cityBuildings = new THREE.InstancedMesh(boxGeo, mat(0xffffff, { vertexColors: true, roughness: 0.68 }), buildingRows.length);
        buildingRows.forEach((b, i) => {
            matrix.compose(new THREE.Vector3(b.x, b.h / 2 - 0.31, b.z), new THREE.Quaternion(), new THREE.Vector3(b.w, b.h, b.d));
            cityBuildings.setMatrixAt(i, matrix);
            cityBuildings.setColorAt(i, new THREE.Color(b.color));
        });
        world.add(cityBuildings);
        const windowMatrices: THREE.Matrix4[] = [];
        const windowColors: THREE.Color[] = [];
        buildingRows.forEach((b, index) => {
            const cols = Math.max(2, Math.floor(b.w / 0.3));
            const floors = Math.max(2, Math.floor(b.h / 0.53));
            for (let row = 0; row < floors; row++) for (let col = 0; col < cols; col++) {
                const x = b.x - b.w / 2 + 0.19 + col * ((b.w - 0.25) / cols);
                const y = 0.06 + row * 0.48;
                matrix.compose(new THREE.Vector3(x, y, b.z + b.d / 2 + 0.012), new THREE.Quaternion(), new THREE.Vector3(0.11, 0.19, 0.025));
                windowMatrices.push(matrix.clone());
                windowColors.push((row + col + index) % 5 === 0 ? new THREE.Color(0xffd69d) : new THREE.Color(0xb9deea));
            }
        });
        const windows = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat(0xffffff, { vertexColors: true, emissive: 0x294257, emissiveIntensity: 0.18, roughness: 0.4 }), windowMatrices.length);
        windowMatrices.forEach((m, i) => { windows.setMatrixAt(i, m); windows.setColorAt(i, windowColors[i]); });
        world.add(windows);
        const ridgeMat = mat(0x899f91, { roughness: 1 });
        [-8, 1, 10, 20, 30, 40].forEach((x, i) => addSphere(world, ridgeMat, x, -0.42, -11, 6.2, 2 + (i % 3) * 0.6, 1.6));

        // Park trees and round-canopy planters share geometry and material; no per-tree draw calls.
        const treeXs = [-6, -2, 6, 9, 13, 17, 21, 26, 30, 35, 39, 43];
        const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.13, 0.19, 1.2, 7), trunkMat, treeXs.length * 2);
        const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.58, 1), leafMat, treeXs.length * 2);
        let treeIdx = 0;
        treeXs.forEach((x, i) => [-1, 1].forEach((side) => {
            const z = side * 3.12;
            matrix.compose(new THREE.Vector3(x + (i % 2) * 0.5, 0.44, z), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
            trunks.setMatrixAt(treeIdx, matrix);
            matrix.compose(new THREE.Vector3(x + (i % 2) * 0.5, 1.35, z), new THREE.Quaternion(), new THREE.Vector3(1, 0.88 + (i % 3) * 0.08, 1));
            crowns.setMatrixAt(treeIdx, matrix);
            treeIdx++;
        }));
        world.add(trunks, crowns);
        treeXs.forEach((x) => addBox(world, mat(0xc4c8bc), x, -0.08, 3.12, 0.9, 0.24, 0.82));

        // Slow, tiny traffic gives the city a sense of life without competing with scroll.
        const cars: THREE.Group[] = [];
        [0, 1, 2].forEach((i) => {
            const car = new THREE.Group();
            const body = i === 1 ? coralMat : blueMat;
            addBox(car, body, 0, 0.25, 0, 1.24, 0.34, 0.66);
            addBox(car, glassMat, -0.06, 0.5, 0, 0.58, 0.25, 0.55);
            [-0.39, 0.39].forEach((x) => [-0.31, 0.31].forEach((z) => {
                const wheel = addMesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 9), charcoalMat, car, x, 0.13, z, 1, 1, 1);
                wheel.rotation.x = Math.PI / 2;
            }));
            car.position.set(-8 + i * 6, -0.19, i % 2 ? -0.78 : 0.8);
            world.add(car);
            cars.push(car);
        });

        // HERO: friendly, symbolic engineer at a plain aluminum laptop. No brand marks or realistic face.
        const desk = new THREE.Group();
        desk.position.set(2.25, 0, 1.24);
        world.add(desk);
        addBox(desk, woodMat, 0, 1.04, 0, 2.65, 0.14, 1.35);
        [-1.1, 1.1].forEach((x) => [-0.5, 0.5].forEach((z) => addBox(desk, steelMat, x, 0.49, z, 0.09, 1.0, 0.09)));
        addBox(desk, darkMat, -0.86, 0.68, -0.52, 0.38, 0.045, 0.32); // seat
        addBox(desk, darkMat, -1.02, 0.94, -0.68, 0.08, 0.5, 0.08);
        addBox(desk, darkMat, 0.06, 1.13, -0.08, 0.9, 0.045, 0.57); // laptop base
        addBox(desk, steelMat, 0.06, 1.16, -0.08, 0.9, 0.018, 0.57);
        const screenCanvas = document.createElement("canvas");
        screenCanvas.width = 512; screenCanvas.height = 320;
        const screenCtx = screenCanvas.getContext("2d");
        if (screenCtx) {
            screenCtx.fillStyle = "#17243b"; screenCtx.fillRect(0, 0, 512, 320);
            screenCtx.fillStyle = "#314763"; screenCtx.fillRect(0, 0, 512, 32);
            for (let i = 0; i < 8; i++) {
                screenCtx.fillStyle = ["#70d7e6", "#ae9af4", "#f0b58e", "#9fceb0"][i % 4];
                screenCtx.fillRect(32 + (i % 3) * 72, 66 + i * 27, 90 + (i % 2) * 76, 5);
            }
            screenCtx.fillStyle = "#d6e5ed"; screenCtx.fillRect(32, 278, 280, 3);
        }
        const screenTexture = new THREE.CanvasTexture(screenCanvas);
        const screenMaterial = new THREE.MeshStandardMaterial({ map: screenTexture, emissive: 0x24466c, emissiveIntensity: 0.7, roughness: 0.3 });
        addBox(desk, steelMat, 0.06, 1.51, -0.34, 0.92, 0.76, 0.055);
        const laptopScreen = addMesh(new THREE.PlaneGeometry(0.82, 0.64), screenMaterial, desk, 0.06, 1.51, -0.307);
        laptopScreen.userData.portal = true;
        // Tiny abstract code bars on keyboard deck; intentionally not a branded device.
        for (let i = 0; i < 6; i++) addBox(desk, mat(0x687887), -0.27 + i * 0.13, 1.168, -0.23, 0.075, 0.006, 0.025);
        const cup = addMesh(new THREE.CylinderGeometry(0.105, 0.085, 0.22, 12), creamMat, desk, 0.92, 1.22, -0.34);
        addMesh(new THREE.TorusGeometry(0.06, 0.018, 6, 12), creamMat, desk, 1.02, 1.23, -0.34, 1, 1, 1).rotation.y = Math.PI / 2;
        addBox(desk, charcoalMat, -0.84, 1.17, -0.24, 0.18, 0.12, 0.18); // notebook
        const person = new THREE.Group();
        desk.add(person);
        addSphere(person, blueMat, -0.64, 1.27, 0.51, 0.36, 0.45, 0.29); // sweater/torso
        addSphere(person, mat(0xc98665), -0.64, 1.89, 0.52, 0.26, 0.29, 0.25); // head
        addSphere(person, mat(0x343444), -0.64, 2.05, 0.49, 0.268, 0.17, 0.26); // hair
        [-0.73, -0.55].forEach((x) => addSphere(person, darkMat, x, 1.91, 0.747, 0.025, 0.032, 0.018));
        addSphere(person, mat(0xf1c0a1), -0.64, 1.82, 0.765, 0.07, 0.035, 0.035); // subtle smile
        const arms = new THREE.Group();
        person.add(arms);
        between(arms, blueMat, new THREE.Vector3(-0.82, 1.49, 0.58), new THREE.Vector3(-0.47, 1.19, 0.08), 0.115);
        between(arms, blueMat, new THREE.Vector3(-0.46, 1.48, 0.57), new THREE.Vector3(-0.13, 1.19, 0.02), 0.115);
        addSphere(arms, mat(0xc98665), -0.47, 1.18, 0.06, 0.1, 0.07, 0.12);
        addSphere(arms, mat(0xc98665), -0.13, 1.18, 0, 0.1, 0.07, 0.12);
        addBox(person, darkMat, -0.64, 0.83, 0.6, 0.47, 0.13, 0.43); // chair seat
        addBox(person, darkMat, -0.64, 0.94, 0.86, 0.47, 0.55, 0.09); // chair back
        const lamp = new THREE.Group();
        desk.add(lamp);
        between(lamp, steelMat, new THREE.Vector3(1.02, 1.13, 0.35), new THREE.Vector3(1.02, 1.65, 0.35), 0.045);
        addSphere(lamp, warmWindowMat, 1.02, 1.7, 0.35, 0.18, 0.08, 0.14);

        // Software district: data architecture and floating, blank interface planes (never fake product data).
        const software = new THREE.Group();
        world.add(software);
        const digitalGlass = mat(0x87bde0, { transparent: true, opacity: 0.48, metalness: 0.18, roughness: 0.25, emissive: 0x17415d, emissiveIntensity: 0.24, side: THREE.DoubleSide });
        const digitTowerMat = mat(0x768dc6, { transparent: true, opacity: 0.72, roughness: 0.3, metalness: 0.12, emissive: 0x252c70, emissiveIntensity: 0.25 });
        [
            [9, 2.4, -0.5, 1.8, 4.8, 1.6], [11.5, 1.8, -0.2, 1.5, 3.6, 1.5],
            [14.3, 2.1, -0.7, 2.0, 4.2, 1.7], [16.2, 1.2, 0.2, 1.1, 2.4, 1.15],
        ].forEach(([x, z, depth, w, h, d]) => {
            addBox(software, digitTowerMat, x, h / 2 - 0.24, depth, w, h, d);
            addBox(software, cyanMat, x, h - 0.22, depth + d / 2 + 0.02, w * 0.72, 0.055, 0.025);
        });
        const dataNodes: THREE.Vector3[] = [
            new THREE.Vector3(8.5, 2.1, 1.4), new THREE.Vector3(10.1, 3.4, 0.8), new THREE.Vector3(11.5, 1.5, 1.6),
            new THREE.Vector3(13, 2.8, 0.9), new THREE.Vector3(14.8, 1.3, 1.2), new THREE.Vector3(16.4, 2.3, 0.7),
        ];
        addLine(software, dataNodes, lineMat(0x7de4ec, 0.72));
        dataNodes.forEach((p, i) => addSphere(software, i % 2 ? violetMat : cyanMat, p.x, p.y, p.z, 0.11, 0.11, 0.11));
        const interfacePlanes = new THREE.Group();
        software.add(interfacePlanes);
        const uiFrameMat = mat(0xadc7ed, { wireframe: true, transparent: true, opacity: 0.68, emissive: 0x444b91, emissiveIntensity: 0.3 });
        [[11, 2.0, 0.9, 1.8, 1.1], [13.7, 3.3, -0.2, 1.5, 0.9], [15.7, 1.8, 0.9, 1.25, 0.82]].forEach(([x, y, z, w, h]) => {
            addBox(interfacePlanes, uiFrameMat, x, y, z, w, h, 0.035);
            addBox(interfacePlanes, cyanMat, x - w * 0.23, y + h * 0.29, z + 0.03, w * 0.24, 0.035, 0.015);
        });

        // Teaching district: warm classroom proportions, small desks and a digital blackboard.
        const classroom = new THREE.Group();
        world.add(classroom);
        const classroomWall = mat(0xe7d9ba);
        addBox(classroom, classroomWall, 19.5, 1.65, -2.45, 7, 3.8, 0.38);
        addBox(classroom, blueMat, 19.6, 2.1, -2.21, 3.45, 1.55, 0.12);
        addBox(classroom, mat(0x20384a, { emissive: 0x18354d, emissiveIntensity: 0.35 }), 19.6, 2.1, -2.12, 3.24, 1.34, 0.035);
        // Board diagrams are abstract educational lines rather than untrue product/UI text.
        addLine(classroom, [new THREE.Vector3(18.6, 2.25, -2.08), new THREE.Vector3(19.25, 2.55, -2.08), new THREE.Vector3(19.85, 2.14, -2.08), new THREE.Vector3(20.45, 2.53, -2.08)], lineMat(0xc3ecdf, 0.9));
        const classroomDeskMat = mat(0xc59a72);
        for (let row = 0; row < 2; row++) for (let col = 0; col < 3; col++) {
            const x = 18 + col * 1.5 + row * 0.35;
            const z = 1.1 + row * 1.45;
            addBox(classroom, classroomDeskMat, x, 0.87, z, 1.0, 0.12, 0.67);
            [-0.39, 0.39].forEach((dx) => addBox(classroom, steelMat, x + dx, 0.45, z, 0.055, 0.75, 0.055));
            const book = addBox(classroom, row ? coralMat : sageMat, x - 0.15, 0.99, z - 0.06, 0.36, 0.1, 0.26);
            book.rotation.y = (col - 1) * 0.08;
            // Friendly abstract student silhouettes, with no facial detail.
            addSphere(classroom, mat(0xc88769), x, 1.28, z + 0.5, 0.16, 0.17, 0.15);
            addSphere(classroom, [blueMat, coralMat, sageMat][col], x, 1.02, z + 0.48, 0.2, 0.23, 0.16);
        }
        addBox(classroom, mat(0xd9c59f), 22.8, 0.8, -1.3, 1.25, 0.12, 0.68);
        addBox(classroom, violetMat, 22.3, 0.9, -1.3, 0.12, 0.2, 0.36);

        // CGC district. Its sign names the real project; panels remain decorative and data-free.
        const cgc = new THREE.Group();
        world.add(cgc);
        addBox(cgc, mat(0x8297b2), 25, 2.2, -2.25, 7.8, 4.5, 3.3);
        addBox(cgc, mat(0x5974a2), 25, 4.64, -2.25, 8.15, 0.26, 3.52);
        addBox(cgc, digitalGlass, 25, 2.5, -0.54, 6.7, 3.1, 0.08);
        const cgcWindows = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), coolWindowMat, 24);
        for (let row = 0; row < 3; row++) for (let col = 0; col < 8; col++) {
            matrix.compose(new THREE.Vector3(21.95 + col * 0.87, 1.28 + row * 0.92, -0.48), new THREE.Quaternion(), new THREE.Vector3(0.53, 0.56, 0.04));
            cgcWindows.setMatrixAt(row * 8 + col, matrix);
        }
        cgc.add(cgcWindows);
        addBox(cgc, mat(0x536e95), 25, 0.42, -0.2, 2.4, 0.82, 0.72); // entrance
        addBox(cgc, mat(0xe6edf4), 25, 4.05, -0.18, 2.5, 0.55, 0.08);
        const signCanvas = document.createElement("canvas");
        signCanvas.width = 512; signCanvas.height = 112;
        const signContext = signCanvas.getContext("2d");
        if (signContext) {
            signContext.fillStyle = "#eaf3fa"; signContext.fillRect(0, 0, 512, 112);
            signContext.fillStyle = "#35557e"; signContext.font = "600 54px Arial"; signContext.textAlign = "center";
            signContext.fillText("CGC ERP", 256, 72);
        }
        const signTexture = new THREE.CanvasTexture(signCanvas);
        addMesh(new THREE.PlaneGeometry(2.32, 0.48), new THREE.MeshStandardMaterial({ map: signTexture, roughness: 0.5 }), cgc, 25, 4.05, -0.125);
        const cgcPanels = new THREE.Group();
        cgc.add(cgcPanels);
        const cgcPanelMat = mat(0xc6d9f5, { wireframe: true, transparent: true, opacity: 0.58, emissive: 0x4d5689, emissiveIntensity: 0.32 });
        [[21, 3.2, 1, 1.45, 1.0], [25, 3.35, 1.3, 1.8, 1.15], [29, 2.9, 0.7, 1.4, 0.95]].forEach(([x, y, z, w, h]) => addBox(cgcPanels, cgcPanelMat, x, y, z, w, h, 0.045));

        // Robotics lab: clean aluminum workbench, microcontroller, sensor, servo and signal trace.
        const robotics = new THREE.Group();
        world.add(robotics);
        addBox(robotics, woodMat, 32.8, 0.73, 0.35, 7.0, 0.18, 3.0);
        [-2.9, 2.9].forEach((x) => [-0.9, 0.9].forEach((z) => addBox(robotics, steelMat, 32.8 + x, 0.22, 0.35 + z, 0.11, 0.84, 0.11)));
        const boardMat = mat(0x3b806c, { roughness: 0.45 });
        addBox(robotics, boardMat, 31.4, 0.88, 0.2, 1.85, 0.08, 1.18);
        addBox(robotics, charcoalMat, 31.4, 0.95, 0.2, 0.64, 0.12, 0.56);
        addBox(robotics, darkMat, 31.0, 0.95, 0.2, 0.2, 0.13, 0.76);
        const pinMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.055, 0.14, 0.055), mat(0xd5b973, { metalness: 0.7, roughness: 0.34 }), 22);
        for (let i = 0; i < 11; i++) for (let side = 0; side < 2; side++) {
            matrix.makeTranslation(30.63 + i * 0.15, 0.98, 0.67 * (side ? 1 : -1) + 0.2);
            pinMesh.setMatrixAt(i * 2 + side, matrix);
        }
        robotics.add(pinMesh);
        // Sensor puck and servo assembly.
        addMesh(new THREE.CylinderGeometry(0.4, 0.4, 0.17, 20), steelMat, robotics, 33.1, 0.9, -0.47);
        addMesh(new THREE.CylinderGeometry(0.29, 0.29, 0.03, 24), darkMat, robotics, 33.1, 1.0, -0.47);
        addBox(robotics, creamMat, 34.25, 1.0, 0.16, 0.82, 0.43, 0.58);
        addBox(robotics, steelMat, 34.71, 1.13, 0.16, 0.12, 0.72, 0.1);
        addSphere(robotics, cyanMat, 33.95, 0.98, -0.08, 0.06, 0.06, 0.06);
        const tracePoints = [new THREE.Vector3(31.4, 0.99, 0.2), new THREE.Vector3(32.3, 1.0, 0.2), new THREE.Vector3(32.3, 1.0, -0.47), new THREE.Vector3(33.1, 1.0, -0.47), new THREE.Vector3(34.25, 1.0, 0.16)];
        addLine(robotics, tracePoints, lineMat(0x55dfe8, 0.95));
        for (let i = 0; i < 3; i++) addBox(robotics, violetMat, 32.15 + i * 0.25, 1, 0.83, 0.08, 0.07, 0.08);

        // The electronics trace becomes one warm-lit professional timeline path.
        const timeline = new THREE.Group();
        world.add(timeline);
        const timelineCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(35.6, -0.08, 0.65), new THREE.Vector3(36.6, 0.18, 0.34), new THREE.Vector3(38.1, 0.03, 0.78),
            new THREE.Vector3(39.4, 0.26, 0.32), new THREE.Vector3(40.8, 0.04, 0.75), new THREE.Vector3(42.4, 0.22, 0.3), new THREE.Vector3(44.2, 0.04, 0.62),
        ]);
        const pathMat = mat(0x75d8e3, { emissive: 0x227987, emissiveIntensity: 1.15, metalness: 0.25, roughness: 0.3 });
        timeline.add(new THREE.Mesh(new THREE.TubeGeometry(timelineCurve, 84, 0.035, 6, false), pathMat));
        const milestoneMat = mat(0xffca8a, { emissive: 0x9e5835, emissiveIntensity: 0.82 });
        [36.6, 38.1, 39.4, 40.8, 42.4, 44.2].forEach((x, i) => {
            addSphere(timeline, i % 2 ? cyanMat : milestoneMat, x, i % 2 ? 0.35 : 0.42, i % 2 ? 0.34 : 0.62, 0.19, 0.19, 0.19);
            addBox(timeline, mat(0xd9d1bf), x, -0.05, i % 2 ? 0.34 : 0.62, 0.14, 0.36, 0.14);
        });

        // The blue story orb follows every district, then returns to the engineer for the closing wide shot.
        const orbMat = mat(0x83e5f0, { emissive: 0x3bc2d9, emissiveIntensity: 1.8, roughness: 0.18, metalness: 0.12 });
        const orb = addMesh(new THREE.IcosahedronGeometry(0.2, 2), orbMat, world, 2.3, 1.65, 0.3);
        const orbHalo = addMesh(new THREE.TorusGeometry(0.32, 0.012, 6, 32), lineMat(0x8beaff, 0.72), world, 2.3, 1.65, 0.3);
        const orbLight = new THREE.PointLight(0x70ddeb, 3.2, 7, 2);
        world.add(orbLight);
        const orbCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(2.3, 1.65, 0.3), new THREE.Vector3(8.5, 2.1, 1.1), new THREE.Vector3(13.4, 2.7, 1.2),
            new THREE.Vector3(19.6, 2.1, 1.5), new THREE.Vector3(25.2, 2.8, 1.2), new THREE.Vector3(32.2, 1.5, 1.15),
            new THREE.Vector3(40.2, 0.7, 0.8), new THREE.Vector3(2.3, 1.65, 0.3),
        ]);

        // Directional clouds, leaves, and the typing pose animate gently even when scroll is at rest.
        const clouds: THREE.Group[] = [];
        const cloudMat = mat(0xfff5e4, { transparent: true, opacity: 0.46, roughness: 1 });
        [-2, 13, 28, 42].forEach((x, index) => {
            const cloud = new THREE.Group();
            cloud.position.set(x, 7.2 + (index % 2) * 0.8, -7.6);
            [[0, 0, 0, 1.1], [0.9, 0.1, 0.05, 0.75], [-0.85, -0.06, 0.1, 0.7]].forEach(([dx, dy, dz, scale]) => addSphere(cloud, cloudMat, dx, dy, dz, scale, scale * 0.34, scale * 0.44));
            world.add(cloud); clouds.push(cloud);
        });

        const anchors = { about: 0.14, skills: 0.25, projects: 0.4, experience: 0.65, achievements: 0.82, contact: 0.93 };
        const clamp01 = (n: number) => THREE.MathUtils.clamp(n, 0, 1);
        const sectionProgress = (id: string, fallback: number) => {
            const section = document.getElementById(id);
            if (!section) return fallback;
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            return clamp01((section.getBoundingClientRect().top + window.scrollY) / max);
        };
        const getAnchors = () => ({
            about: sectionProgress("about", anchors.about), skills: sectionProgress("skills", anchors.skills),
            projects: sectionProgress("projects", anchors.projects), experience: sectionProgress("experience", anchors.experience),
            achievements: sectionProgress("achievements", anchors.achievements), contact: sectionProgress("contact", anchors.contact),
        });
        let landmarks = getAnchors();
        let shots: Shot[] = [];
        const sunColors = {
            day: new THREE.Color(0xffe0b5), digital: new THREE.Color(0x96cfff), school: new THREE.Color(0xffe7c3),
            cgc: new THREE.Color(0xb6d2ff), lab: new THREE.Color(0xbad7ff), sunset: new THREE.Color(0xffb57e),
        };
        const keyframes = (): Shot[] => {
            const a = landmarks.about, s = landmarks.skills, p = landmarks.projects, e = landmarks.experience, m = landmarks.achievements, c = landmarks.contact;
            const mix = (x: number, y: number, t: number) => x + (y - x) * t;
            return [
                { at: 0, position: new THREE.Vector3(-1, 8.2, 22), target: new THREE.Vector3(2.7, 1.7, 0), fov: 43, light: sunColors.day },
                { at: mix(0, a, 0.27), position: new THREE.Vector3(1, 5.3, 14.6), target: new THREE.Vector3(2.3, 1.6, 0.3), fov: 39, light: sunColors.day },
                { at: mix(0, a, 0.62), position: new THREE.Vector3(2.0, 3.2, 8.4), target: new THREE.Vector3(2.7, 1.55, 0.6), fov: 35, light: sunColors.day },
                { at: mix(0, a, 0.9), position: new THREE.Vector3(2.1, 2.25, 4.65), target: new THREE.Vector3(2.36, 1.52, 0.18), fov: 29, light: sunColors.digital },
                { at: a, position: new THREE.Vector3(9, 5.1, 14), target: new THREE.Vector3(10.3, 1.8, 0), fov: 40, light: sunColors.digital },
                { at: s, position: new THREE.Vector3(13.1, 4.7, 13), target: new THREE.Vector3(14, 1.8, 0), fov: 39, light: sunColors.digital },
                { at: mix(s, p, 0.58), position: new THREE.Vector3(19.1, 5.1, 14.5), target: new THREE.Vector3(20, 1.7, 0), fov: 39, light: sunColors.school },
                { at: p, position: new THREE.Vector3(24, 5.2, 14.3), target: new THREE.Vector3(25, 2.0, 0), fov: 37, light: sunColors.cgc },
                { at: e, position: new THREE.Vector3(32.2, 4.3, 12.5), target: new THREE.Vector3(32.5, 1.3, 0), fov: 38, light: sunColors.lab },
                { at: m, position: new THREE.Vector3(40.2, 5.4, 13.3), target: new THREE.Vector3(40, 0.6, 0), fov: 39, light: sunColors.sunset },
                { at: c, position: new THREE.Vector3(17.5, 33, 63), target: new THREE.Vector3(18, 0.4, 0), fov: 47, light: sunColors.sunset },
                { at: 1, position: new THREE.Vector3(17.5, 33, 63), target: new THREE.Vector3(18, 0.4, 0), fov: 47, light: sunColors.sunset },
            ];
        };
        shots = keyframes();

        const scrollSource = document.querySelector<HTMLElement>(".cinematic-backdrop");
        let active = !document.hidden;
        let frame = 0;
        let lastTime = performance.now();
        let targetMouseX = 0, targetMouseY = 0, mouseX = 0, mouseY = 0;
        let scroll = 0;
        const bootTime = performance.now();
        const cameraPosition = camera.position.clone();
        const cameraTarget = new THREE.Vector3(2.7, 1.7, 0);
        const scratch = new THREE.Vector3();
        const setMouse = (event: PointerEvent) => {
            if (touch) return;
            targetMouseX = (event.clientX / window.innerWidth - 0.5) * 0.2;
            targetMouseY = (event.clientY / window.innerHeight - 0.5) * 0.13;
        };
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            landmarks = getAnchors();
            shots = keyframes();
        };
        let resizeObserver: ResizeObserver | undefined;
        const main = document.querySelector("main");
        if (main && "ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(() => { landmarks = getAnchors(); shots = keyframes(); });
            resizeObserver.observe(main);
        }
        const dispose = () => {
            resizeObserver?.disconnect();
            const geometries = new Set<THREE.BufferGeometry>();
            const materials = new Set<THREE.Material>();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
                    geometries.add(object.geometry);
                    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
                    objectMaterials.forEach((material) => materials.add(material));
                }
            });
            geometries.forEach((geometry) => geometry.dispose());
            materials.forEach((material) => material.dispose());
            screenTexture.dispose();
            signTexture.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
        const onVisibility = () => {
            active = !document.hidden;
            if (active && !frame) frame = requestAnimationFrame(animate);
            else if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
        };
        const animate = (now: number) => {
            frame = 0;
            if (!active) return;
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;
            scroll = Number(scrollSource?.style.getPropertyValue("--scroll-progress") || 0);
            mouseX = THREE.MathUtils.damp(mouseX, targetMouseX, 2.2, dt);
            mouseY = THREE.MathUtils.damp(mouseY, targetMouseY, 2.2, dt);

            let left = shots[0], right = shots[shots.length - 1];
            for (let i = 0; i < shots.length - 1; i++) if (scroll >= shots[i].at && scroll <= shots[i + 1].at) { left = shots[i]; right = shots[i + 1]; break; }
            const raw = right.at > left.at ? THREE.MathUtils.clamp((scroll - left.at) / (right.at - left.at), 0, 1) : 1;
            const t = THREE.MathUtils.smootherstep(raw, 0, 1);
            scratch.lerpVectors(left.position, right.position, t);
            scratch.x += mouseX * (scroll < landmarks.about ? 0.6 : 0.2);
            cameraPosition.lerp(scratch, 1 - Math.exp(-3.2 * dt));
            camera.position.copy(cameraPosition);
            scratch.lerpVectors(left.target, right.target, t);
            scratch.x += mouseX * 0.22;
            scratch.y -= mouseY * 0.15;
            cameraTarget.lerp(scratch, 1 - Math.exp(-3.5 * dt));
            camera.lookAt(cameraTarget);
            camera.fov = THREE.MathUtils.damp(camera.fov, THREE.MathUtils.lerp(left.fov, right.fov, t), 2.6, dt);
            camera.updateProjectionMatrix();
            sun.color.copy(left.light).lerp(right.light, t);

            // Transition scene districts on at the same section waypoints used by the directed camera.
            const smoothPhase = (from: number, to: number) => THREE.MathUtils.smootherstep(scroll, from, to);
            const softwareMix = smoothPhase(landmarks.about * 0.88, landmarks.skills);
            const classroomMix = smoothPhase(landmarks.skills + (landmarks.projects - landmarks.skills) * 0.25, landmarks.skills + (landmarks.projects - landmarks.skills) * 0.78);
            const cgcMix = smoothPhase(landmarks.projects - 0.025, landmarks.projects + 0.08) * (1 - smoothPhase(landmarks.experience - 0.12, landmarks.experience));
            const roboticsMix = smoothPhase(landmarks.experience - 0.035, landmarks.experience + 0.11) * (1 - smoothPhase(landmarks.achievements - 0.1, landmarks.achievements));
            const timelineMix = smoothPhase(landmarks.achievements - 0.06, landmarks.achievements + 0.04);
            software.visible = softwareMix > 0.01;
            interfacePlanes.visible = softwareMix > 0.2 && softwareMix < 0.95;
            classroom.visible = classroomMix > 0.01;
            cgc.visible = cgcMix > 0.01;
            cgcPanels.visible = cgcMix > 0.18 && cgcMix < 0.98;
            robotics.visible = roboticsMix > 0.01;
            timeline.visible = timelineMix > 0.01;
            // Color continuity: the orb travels from the laptop through software, classrooms, CGC and the circuit path.
            const routeStart = landmarks.about * 0.88;
            const routeEnd = landmarks.achievements + (landmarks.contact - landmarks.achievements) * 0.48;
            const routeT = THREE.MathUtils.clamp((scroll - routeStart) / Math.max(0.1, routeEnd - routeStart), 0, 1);
            const orbPoint = orbCurve.getPoint(routeT);
            orb.position.copy(orbPoint);
            orbHalo.position.copy(orbPoint);
            orbHalo.rotation.x = now * 0.00022;
            orbLight.position.copy(orbPoint);
            const intro = THREE.MathUtils.clamp((now - bootTime) / 1600, 0, 1);
            orb.scale.setScalar(intro * (1 + Math.sin(now * 0.0018) * 0.07));
            const portal = smoothPhase(landmarks.about * 0.78, landmarks.about * 1.04);
            const portalScale = 1 + portal * 0.55;
            laptopScreen.scale.set(portalScale, portalScale, 1);
            person.rotation.z = Math.sin(now * 0.0028) * 0.018;
            arms.rotation.z = Math.sin(now * 0.005) * 0.028;
            cup.rotation.z = Math.sin(now * 0.0015) * 0.015;
            clouds.forEach((cloud, i) => { cloud.position.x += dt * (0.06 + i * 0.007); if (cloud.position.x > 49) cloud.position.x = -12; });
            cars.forEach((car, i) => { car.position.x += dt * (0.34 + i * 0.11); if (car.position.x > 47) car.position.x = -13 - i * 2; });

            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };
        const schedule = () => { if (!frame && active) frame = requestAnimationFrame(animate); };
        const onScroll = () => schedule();
        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("pointermove", setMouse, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        landmarks = getAnchors();
        schedule();

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", setMouse);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("visibilitychange", onVisibility);
            dispose();
        };
    }, []);

    return <div ref={hostRef} className="cinematic-world" aria-hidden="true" />;
}
