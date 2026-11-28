export const SUN_DATA = {
    id: 'sol',
    name: 'Sol',
    radius: 14,
    rotationSpeed: 0.003,
    texture: 'assets/textures/sol.jpg',
    info: {
        tipo: 'Estrella enana amarilla (G2V)',
        diametro: '1,392,700 km',
        distanciaReal: '0 km (Centro del sistema)',
        periodoOrbital: '230 millones de años (galáctico)',
        descripcion: 'Fuente principal de radiación electromagnética del sistema solar; concentra el 99.86% de su masa total.'
    }
};

export const PLANETS_DATA = [
    {
        id: 'mercurio',
        name: 'Mercurio',
        radius: 1.8,
        distance: 24,
        orbitSpeed: 0.024,
        rotationSpeed: 0.008,
        axialTiltDeg: 0.03,
        texture: 'assets/textures/mercurio.jpg',
        info: {
            tipo: 'Planeta rocoso',
            diametro: '4,879 km',
            distanciaReal: '57.9 millones de km',
            periodoOrbital: '88 días terrestres',
            descripcion: 'Planeta más cercano al Sol y el más pequeño del sistema; presenta fuertes contrastes térmicos.'
        }
    },
    {
        id: 'venus',
        name: 'Venus',
        radius: 2.8,
        distance: 34,
        orbitSpeed: 0.016,
        rotationSpeed: -0.004, // Rotación retrógrada
        axialTiltDeg: 177.4,
        texture: 'assets/textures/venus.jpg',
        info: {
            tipo: 'Planeta rocoso',
            diametro: '12,104 km',
            distanciaReal: '108.2 millones de km',
            periodoOrbital: '225 días terrestres',
            descripcion: 'Posee una atmósfera densa rica en CO2 y rotación retrógrada en sentido opuesto a la mayoría de los planetas.'
        }
    },
    {
        id: 'tierra',
        name: 'Tierra',
        radius: 3.6,
        distance: 48,
        orbitSpeed: 0.011,
        rotationSpeed: 0.02,
        axialTiltDeg: 23.4,
        texture: 'assets/textures/tierra.jpg',
        info: {
            tipo: 'Planeta rocoso',
            diametro: '12,742 km',
            distanciaReal: '149.6 millones de km (1 UA)',
            periodoOrbital: '365.25 días',
            descripcion: 'Tercer planeta desde el Sol; su inclinación axial de 23.4° origina las estaciones del año.'
        },
        moon: {
            id: 'luna',
            name: 'Luna',
            radius: 0.95,
            distance: 6.5,
            orbitSpeed: 0.045,
            rotationSpeed: 0.01,
            texture: 'assets/textures/luna.jpg',
            info: {
                tipo: 'Satélite natural',
                diametro: '3,474 km',
                distanciaReal: '384,400 km de la Tierra',
                periodoOrbital: '27.3 días',
                descripcion: 'Satélite natural de la Tierra; su órbita produce las fases lunares y los eclipses.'
            }
        }
    },
    {
        id: 'marte',
        name: 'Marte',
        radius: 2.4,
        distance: 62,
        orbitSpeed: 0.0085,
        rotationSpeed: 0.018,
        axialTiltDeg: 25.2,
        texture: 'assets/textures/marte.jpg',
        info: {
            tipo: 'Planeta rocoso',
            diametro: '6,779 km',
            distanciaReal: '227.9 millones de km',
            periodoOrbital: '687 días terrestres',
            descripcion: 'Conocido como el planeta rojo debido al óxido de hierro en su superficie.'
        }
    },
    {
        id: 'jupiter',
        name: 'Júpiter',
        radius: 7.5,
        distance: 94,
        orbitSpeed: 0.0042,
        rotationSpeed: 0.035,
        axialTiltDeg: 3.1,
        texture: 'assets/textures/jupiter.jpg',
        info: {
            tipo: 'Gigante gaseoso',
            diametro: '139,820 km',
            distanciaReal: '778.5 millones de km',
            periodoOrbital: '11.86 años terrestres',
            descripcion: 'El planeta de mayor tamaño del sistema solar, caracterizado por sus bandas nubosas y la Gran Mancha Roja.'
        }
    },
    {
        id: 'saturno',
        name: 'Saturno',
        radius: 6.4,
        distance: 126,
        orbitSpeed: 0.003,
        rotationSpeed: 0.03,
        axialTiltDeg: 26.7,
        texture: 'assets/textures/saturno.jpg',
        info: {
            tipo: 'Gigante gaseoso',
            diametro: '116,460 km',
            distanciaReal: '1,434 millones de km',
            periodoOrbital: '29.45 años terrestres',
            descripcion: 'Reconocido por su sistema de anillos compuestos principalmente por partículas de hielo y roca.'
        },
        rings: {
            innerRadius: 8.2,
            outerRadius: 13.8,
            color: 0xd4b68a,
            opacity: 0.78
        }
    },
    {
        id: 'urano',
        name: 'Urano',
        radius: 4.5,
        distance: 154,
        orbitSpeed: 0.002,
        rotationSpeed: -0.022,
        axialTiltDeg: 97.8,
        texture: 'assets/textures/urano.jpg',
        info: {
            tipo: 'Gigante de hielo',
            diametro: '50,724 km',
            distanciaReal: '2,871 millones de km',
            periodoOrbital: '84 años terrestres',
            descripcion: 'Su eje de rotación está inclinado casi 98°, por lo que gira prácticamente recostado sobre su plano orbital.'
        }
    },
    {
        id: 'neptuno',
        name: 'Neptuno',
        radius: 4.3,
        distance: 180,
        orbitSpeed: 0.0014,
        rotationSpeed: 0.022,
        axialTiltDeg: 28.3,
        texture: 'assets/textures/neptuno.jpg',
        info: {
            tipo: 'Gigante de hielo',
            diametro: '49,244 km',
            distanciaReal: '4,495 millones de km',
            periodoOrbital: '164.8 años terrestres',
            descripcion: 'Planeta más lejano del sistema solar, con los vientos más veloces registrados en el sistema.'
        }
    }
];

export const ASTEROID_BELT_DATA = {
    count: 1500,
    innerRadius: 72,
    outerRadius: 83,
    verticalSpread: 2.8,
    rotationSpeed: 0.0012
};