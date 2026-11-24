import * as THREE from 'three';

export function createStarfield(scene, count = 2500) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        // Distribución uniforme en una esfera lejana (radio entre 350 y 750)
        const radius = 350 + Math.random() * 400;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85
    });

    const starfield = new THREE.Points(geometry, material);
    scene.add(starfield);

    return starfield;
}