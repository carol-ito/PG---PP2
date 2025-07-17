import * as THREE from 'three';

export function blocoGrama() {
    //Instância para carregar as texturas
    const textura = new THREE.TextureLoader();

    const topTextura = textura.load('/grass_top.png');
    const sideTextura = textura.load('/grass_side.png');
    const bottomTextura = textura.load('/grass_bottom.png');

    // Adicionando um filtro na textura
    topTextura.magFilter = THREE.NearestFilter;
    sideTextura.magFilter = THREE.NearestFilter;
    bottomTextura.magFilter = THREE.NearestFilter;

    const materiais = [
        new THREE.MeshStandardMaterial({ map: sideTextura }),    // direita
        new THREE.MeshStandardMaterial({ map: sideTextura }),    // esquerda
        new THREE.MeshStandardMaterial({ map: topTextura }),     // topo
        new THREE.MeshStandardMaterial({ map: bottomTextura }),  // embaixo
        new THREE.MeshStandardMaterial({ map: sideTextura }),    // frente
        new THREE.MeshStandardMaterial({ map: sideTextura }),    // trás
    ];

    // Tamanho do bloco
    const forma = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    // Combinando o bloco de grama com as texturas
    const cube = new THREE.Mesh(forma, materiais);

    return cube;
}