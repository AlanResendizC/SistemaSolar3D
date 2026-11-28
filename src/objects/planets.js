import * as THREE from 'three';
import { SUN_DATA, PLANETS_DATA } from '../config/solarData.js';

const textureLoader = new THREE.TextureLoader();

function loadColorTexture(path) {
    const texture = textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function createOrbitLine(radius) {
    const segments = 128;
    const points = [];
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.16
    });

    return new THREE.LineLoop(geometry, material);
}

export function createSolarSystem(scene) {
    const planetEntities = [];
    const orbitLines = [];
    const selectableMeshes = [];

    // 1. Sol (material básico no afectado por sombras)
    const sunGeometry = new THREE.SphereGeometry(SUN_DATA.radius, 48, 48);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: loadColorTexture(SUN_DATA.texture)
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = {
        id: SUN_DATA.id,
        name: SUN_DATA.name,
        radius: SUN_DATA.radius,
        info: SUN_DATA.info
    };
    scene.add(sun);
    selectableMeshes.push(sun);

    // 2. Planetas, anillos y satélites
    PLANETS_DATA.forEach((data) => {
        // Pivote orbital en el origen (Sol)
        const orbitGroup = new THREE.Object3D();
        // Ángulo inicial distribuido para evitar alineación artificial al arrancar
        orbitGroup.rotation.y = Math.random() * Math.PI * 2;
        scene.add(orbitGroup);

        // Grupo del sistema planetario ubicado en el radio orbital
        const planetSystem = new THREE.Group();
        planetSystem.position.x = data.distance;
        orbitGroup.add(planetSystem);

        // Grupo inclinado para respetar la oblicuidad axial
        const tiltedGroup = new THREE.Group();
        tiltedGroup.rotation.z = THREE.MathUtils.degToRad(data.axialTiltDeg);
        planetSystem.add(tiltedGroup);

        // Malla del planeta con PBR básico y soporte de sombras
        const geometry = new THREE.SphereGeometry(data.radius, 40, 40);
        const material = new THREE.MeshStandardMaterial({
            map: loadColorTexture(data.texture),
            roughness: 0.65,
            metalness: 0.05
        });
        const planetMesh = new THREE.Mesh(geometry, material);
        planetMesh.castShadow = true;
        planetMesh.receiveShadow = true;
        planetMesh.userData = {
            id: data.id,
            name: data.name,
            radius: data.radius,
            info: data.info
        };
        tiltedGroup.add(planetMesh);
        selectableMeshes.push(planetMesh);

        // Anillos planetarios (Saturno)
        if (data.rings) {
            const ringGeo = new THREE.RingGeometry(data.rings.innerRadius, data.rings.outerRadius, 64);
            const ringMat = new THREE.MeshStandardMaterial({
                color: data.rings.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: data.rings.opacity,
                roughness: 0.8
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = Math.PI / 2;
            ringMesh.castShadow = true;
            ringMesh.receiveShadow = true;
            tiltedGroup.add(ringMesh);
        }

        // Satélite natural (Luna de la Tierra)
        let moonEntity = null;
        if (data.moon) {
            const moonPivot = new THREE.Object3D();
            planetSystem.add(moonPivot);

            const moonGeo = new THREE.SphereGeometry(data.moon.radius, 32, 32);
            const moonMat = new THREE.MeshStandardMaterial({
                map: loadColorTexture(data.moon.texture),
                roughness: 0.85,
                metalness: 0.02
            });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            moonMesh.position.x = data.moon.distance;
            moonMesh.castShadow = true;
            moonMesh.receiveShadow = true;
            moonMesh.userData = {
                id: data.moon.id,
                name: data.moon.name,
                radius: data.moon.radius,
                info: data.moon.info
            };
            moonPivot.add(moonMesh);
            selectableMeshes.push(moonMesh);

            const moonOrbit = createOrbitLine(data.moon.distance);
            planetSystem.add(moonOrbit);
            orbitLines.push(moonOrbit);

            moonEntity = {
                pivot: moonPivot,
                mesh: moonMesh,
                orbitSpeed: data.moon.orbitSpeed,
                rotationSpeed: data.moon.rotationSpeed
            };
        }

        // Trayectoria orbital alrededor del Sol
        const orbitLine = createOrbitLine(data.distance);
        scene.add(orbitLine);
        orbitLines.push(orbitLine);

        planetEntities.push({
            orbitGroup,
            mesh: planetMesh,
            orbitSpeed: data.orbitSpeed,
            rotationSpeed: data.rotationSpeed,
            moon: moonEntity
        });
    });

    return { sun, planetEntities, orbitLines, selectableMeshes };
}