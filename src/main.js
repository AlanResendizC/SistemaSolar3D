import * as THREE from 'three';
import { SUN_DATA, ASTEROID_BELT_DATA } from './config/solarData.js';
import { initScene } from './core/sceneSetup.js';
import { createStarfield } from './objects/starfield.js';
import { createSolarSystem } from './objects/planets.js';
import { createAsteroidBelt } from './objects/asteroids.js';
import { initUI } from './interaction/ui.js';

// 1. Inicialización de módulos
const { scene, camera, renderer, controls } = initScene();
createStarfield(scene, 2500);

const { sun, planetEntities, orbitLines, selectableMeshes } = createSolarSystem(scene);
const asteroidBelt = createAsteroidBelt(scene, ASTEROID_BELT_DATA);

const ui = initUI({
    camera,
    controls,
    selectableMeshes,
    orbitLines,
    asteroidBelt
});

// 2. Bucle principal de animación (Delta Time + telemetría)
const clock = new THREE.Clock();
let frameCount = 0;
let elapsedTelemetry = 0;

function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);
    const timeScale = ui.state.isPaused ? 0 : delta * 60 * ui.state.speedMultiplier;

    // Rotación solar
    sun.rotation.y += SUN_DATA.rotationSpeed * timeScale;

    // Traslación y rotación planetaria + satélites
    planetEntities.forEach((entity) => {
        entity.orbitGroup.rotation.y += entity.orbitSpeed * timeScale;
        entity.mesh.rotation.y += entity.rotationSpeed * timeScale;

        if (entity.moon) {
            entity.moon.pivot.rotation.y += entity.moon.orbitSpeed * timeScale;
            entity.moon.mesh.rotation.y += entity.moon.rotationSpeed * timeScale;
        }
    });

    // Rotación del cinturón de asteroides
    asteroidBelt.rotation.y += ASTEROID_BELT_DATA.rotationSpeed * timeScale;

    // Seguimiento de cámara y renderizado
    ui.updateCameraFocus();
    controls.update();
    renderer.render(scene, camera);

    // Actualización de métricas cada 0.5 segundos
    frameCount++;
    elapsedTelemetry += delta;
    if (elapsedTelemetry >= 0.5) {
        ui.updateTelemetry(frameCount / elapsedTelemetry, renderer);
        frameCount = 0;
        elapsedTelemetry = 0;
    }
}

animate();