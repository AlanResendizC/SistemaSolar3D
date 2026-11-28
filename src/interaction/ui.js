import * as THREE from 'three';

export function initUI({ camera, controls, selectableMeshes, orbitLines, asteroidBelt }) {
    const state = {
        isPaused: false,
        speedMultiplier: 1.0,
        focusedMesh: null
    };

    // Referencias DOM
    const btnPlay = document.getElementById('btn-play');
    const btnReset = document.getElementById('btn-reset');
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    const planetSelect = document.getElementById('planet-select');
    const toggleOrbits = document.getElementById('toggle-orbits');
    const toggleAsteroids = document.getElementById('toggle-asteroids');

    const infoCard = document.getElementById('info-card');
    const btnCloseInfo = document.getElementById('btn-close-info');
    const infoName = document.getElementById('info-name');
    const infoType = document.getElementById('info-type');
    const infoDiameter = document.getElementById('info-diameter');
    const infoDistance = document.getElementById('info-distance');
    const infoPeriod = document.getElementById('info-period');
    const infoDesc = document.getElementById('info-desc');

    const statFps = document.getElementById('stat-fps');
    const statCalls = document.getElementById('stat-calls');
    const statTris = document.getElementById('stat-tris');

    // Vectores reutilizables para seguimiento suave sin generar basura en memoria
    const prevTargetPos = new THREE.Vector3();
    const currentTargetPos = new THREE.Vector3();
    const deltaPos = new THREE.Vector3();

    function showInfoCard(data) {
        infoName.textContent = data.name;
        infoType.textContent = data.info.tipo;
        infoDiameter.textContent = data.info.diametro;
        infoDistance.textContent = data.info.distanciaReal;
        infoPeriod.textContent = data.info.periodoOrbital;
        infoDesc.textContent = data.info.descripcion;
        infoCard.classList.remove('hidden');
    }

    function focusOnMesh(mesh) {
        state.focusedMesh = mesh;
        mesh.getWorldPosition(prevTargetPos);

        const radius = mesh.userData.radius || 5;
        const offset = new THREE.Vector3(radius * 3.8, radius * 1.8, radius * 3.8);

        controls.target.copy(prevTargetPos);
        camera.position.copy(prevTargetPos).add(offset);

        showInfoCard(mesh.userData);
        planetSelect.value = mesh.userData.id;
    }

    function resetView() {
        state.focusedMesh = null;
        controls.target.set(0, 0, 0);
        camera.position.set(0, 75, 210);
        planetSelect.value = '';
        infoCard.classList.add('hidden');
    }

    // Eventos del HUD
    btnPlay.addEventListener('click', () => {
        state.isPaused = !state.isPaused;
        btnPlay.textContent = state.isPaused ? 'Reanudar' : 'Pausar';
    });

    btnReset.addEventListener('click', resetView);

    speedSlider.addEventListener('input', (e) => {
        state.speedMultiplier = parseFloat(e.target.value);
        speedValue.textContent = `${state.speedMultiplier.toFixed(1)}x`;
    });

    planetSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        if (!selectedId) {
            resetView();
            return;
        }
        const match = selectableMeshes.find((m) => m.userData.id === selectedId);
        if (match) focusOnMesh(match);
    });

    toggleOrbits.addEventListener('change', (e) => {
        orbitLines.forEach((line) => {
            line.visible = e.target.checked;
        });
    });

    toggleAsteroids.addEventListener('change', (e) => {
        asteroidBelt.visible = e.target.checked;
    });

    btnCloseInfo.addEventListener('click', () => {
        infoCard.classList.add('hidden');
    });

    // Raycasting 3D para seleccionar planetas con clic (distingue clic de arrastre)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    window.addEventListener('pointerdown', (event) => {
        pointerDownPos = { x: event.clientX, y: event.clientY };
    });

    window.addEventListener('pointerup', (event) => {
        // Ignorar clics realizados sobre los paneles del HUD
        if (event.target.closest('.glass-panel')) return;

        const moveDist = Math.hypot(
            event.clientX - pointerDownPos.x,
            event.clientY - pointerDownPos.y
        );
        if (moveDist > 5) return; // Fue un arrastre de OrbitControls, no un clic

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(selectableMeshes, false);

        if (intersects.length > 0) {
            focusOnMesh(intersects[0].object);
        }
    });

    // Mantiene la cámara acoplada al planeta seleccionado mientras orbita
    function updateCameraFocus() {
        if (!state.focusedMesh) return;

        state.focusedMesh.getWorldPosition(currentTargetPos);
        deltaPos.subVectors(currentTargetPos, prevTargetPos);

        controls.target.add(deltaPos);
        camera.position.add(deltaPos);
        prevTargetPos.copy(currentTargetPos);
    }

    function updateTelemetry(fps, renderer) {
        statFps.textContent = Math.round(fps);
        statCalls.textContent = renderer.info.render.calls;
        statTris.textContent = renderer.info.render.triangles.toLocaleString('es-MX');
    }

    return { state, updateCameraFocus, updateTelemetry };
}