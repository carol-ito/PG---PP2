import * as THREE from 'three';

export function glowstone() {

    const textura = new THREE.TextureLoader();
    const texturaCubo = textura.load('Glowstone_(texture)_JE2_BE2.png');

    //Filtro para melhorar a qualidade da textura 
    texturaCubo.magFilter = THREE.NearestFilter;

    const formatoCubo = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const materialCubo = new THREE.MeshStandardMaterial({
        emissiveMap: texturaCubo,
        emissive: 0xffaa00,
        emissiveIntensity: 1.5
    });

    const cuboTexturizado = new THREE.Mesh(formatoCubo, materialCubo);

    return cuboTexturizado;

}