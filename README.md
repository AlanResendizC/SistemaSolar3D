# Visualizador Interactivo del Sistema Solar 3D

## Descripción General
Simulación tridimensional interactiva del sistema solar desarrollada con WebGL mediante Three.js. Implementa modelado de primitivas 3D, mapeo de texturas planetarias, iluminación puntual omnidireccional con mapeo de sombras, jerarquía de transformaciones orbitales y axiales, generación procedural de partículas, GPU Instancing para el cinturón de asteroides, selección 3D mediante Raycasting y cámara orbital con seguimiento dinámico.

## Tecnologías Utilizadas
* **Lenguajes:** JavaScript (ES6 Modules), HTML5, CSS3.
* **Biblioteca gráfica:** Three.js (v0.160.0 sobre WebGL).
* **Control de versiones:** Git y GitHub.
* **Entorno de desarrollo:** Visual Studio Code + Live Server.

## Integrante
* **Armando Alan Resendiz Carrera** — Grupo 6CV3 — Ingeniería en Sistemas Computacionales (ESCOM - IPN).

## Instrucciones de Instalación
1. Clonar el repositorio:

   ```bash
   git clone https://github.com/AlanResendizC/SistemaSolar3D.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd SistemaSolar3D
   ```

*(No requiere instalación de dependencias con npm, ya que Three.js se carga mediante Import Map desde CDN).*

## Instrucciones de Ejecución
Debido a las políticas de seguridad CORS de los navegadores para módulos ES6 y texturas locales, el proyecto debe ejecutarse en un servidor HTTP local:

* **Opción A (Visual Studio Code - Live Server):** Abrir la carpeta en VS Code, dar clic derecho sobre `index.html` y seleccionar **Open with Live Server**.
* **Opción B (Python):** Ejecutar en la terminal dentro de la carpeta raíz y abrir `http://localhost:5500`:

  ```bash
  python -m http.server 5500
  ```
## Atribución de Recursos
* Motor gráfico: [Three.js](https://threejs.org/) (Licencia MIT).
* Mapas de texturas planetarias: Recursos de dominio público de la NASA / Solar System Scope.