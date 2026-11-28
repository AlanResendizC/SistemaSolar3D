import * as THREE from 'three';

export function createAsteroidBelt(scene, config) {
    const geometry = new THREE.DodecahedronGeometry(0.45, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x8f8a82,
        roughness: 0.9,
        metalness: 0.1
    });

    // InstancedMesh agrupa los 1,500 asteroides en 1 sola Draw Call
    const instancedBelt = new THREE.InstancedMesh(geometry, material, config.count);
    instancedBelt.receiveShadow = true;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < config.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = config.innerRadius + Math.random() * (config.outerRadius - config.innerRadius);

        dummy.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * config.verticalSpread,
            Math.sin(angle) * radius
        );

        dummy.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        // Escala no uniforme para dar aspecto rocoso irregular
        dummy.scale.set(
            0.35 + Math.random() * 0.9,
            0.35 + Math.random() * 0.7,
            0.35 + Math.random() * 0.9
        );

        dummy.updateMatrix();
        instancedBelt.setMatrixAt(i, dummy.matrix);
    }

    instancedBelt.instanceMatrix.needsUpdate = true;
    scene.add(instancedBelt);

    return instancedBelt;
}