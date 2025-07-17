import * as THREE from 'three';

export function glowstone() {

    const textureLoader = new THREE.TextureLoader();
    const cubeTexture = textureLoader.load('Glowstone_(texture)_JE2_BE2.png'); // coloque o arquivo na pasta raiz ou ajuste o caminho

    //Filtro para melhorar a qualidade da textura 
    cubeTexture.magFilter = THREE.NearestFilter;

    const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const cubeMaterial = new THREE.MeshStandardMaterial({
        // A 'emissiveMap' usa a própria textura para definir o que brilha.
        emissiveMap: cubeTexture,

        emissive: 0xffaa00,

        // Aumentamos a intensidade para o brilho ser bem visível.
        emissiveIntensity: 1.5
    });

    const texturedCube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    return texturedCube;

}