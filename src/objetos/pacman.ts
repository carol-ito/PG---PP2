import * as THREE from 'three';

export function criarPacman(envMap: THREE.CubeTexture): THREE.Group {
    const raio = 1;
    const segmentos = 32;
    
    const materialMetalico = new THREE.MeshStandardMaterial({
        color: 0xFFFF00,
        metalness: 1.0,
	roughness: 0.2,
	side: THREE.DoubleSide,
	envMap: envMap
    });

    // Desenha da parte de cima (polo norte, ângulo 0) até o meio (equador, ângulo PI/2)
    const geometriaSuperior = new THREE.SphereGeometry(raio, segmentos, segmentos, 0, Math.PI * 2, 0, Math.PI / 2);
    const metadeSuperior = new THREE.Mesh(geometriaSuperior, materialMetalico);

    // 2. Criar uma geometria específica para a METADE INFERIOR
    // Desenha do meio (equador, ângulo PI/2) até a parte de baixo (polo sul, ângulo PI/2)
    const geometriaInferior = new THREE.SphereGeometry(raio, segmentos, segmentos, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const metadeInferior = new THREE.Mesh(geometriaInferior, materialMetalico);
    
    // unindo as geometrias
    const pacman = new THREE.Group();
    pacman.add(metadeSuperior);
    pacman.add(metadeInferior);

    pacman.userData.boca = {
        superior: metadeSuperior,
        inferior: metadeInferior
    };
    
    return pacman;
}
