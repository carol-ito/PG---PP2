import * as THREE from 'three';

export function blocoGrama() {
    // 1. Crie uma instância do TextureLoader para carregar as imagens
    const textureLoader = new THREE.TextureLoader();

    // 2. Carregue cada uma das suas texturas da pasta /public/
    // Use os nomes exatos dos arquivos que você salvou.
    const topTexture = textureLoader.load('/grass_top.png');
    const sideTexture = textureLoader.load('/grass_side.png');
    const bottomTexture = textureLoader.load('/grass_bottom.png');

    // 3. Configure o filtro para manter o visual "pixelado"
    // Esta é a parte essencial para o estilo Minecraft.
    // Sem isso, as texturas ficariam borradas.
    topTexture.magFilter = THREE.NearestFilter;
    sideTexture.magFilter = THREE.NearestFilter;
    bottomTexture.magFilter = THREE.NearestFilter;

    // 4. Crie um array de materiais, um para cada face do cubo
    // A ordem é importante: [direita, esquerda, topo, fundo, frente, trás]
    const materials = [
        new THREE.MeshStandardMaterial({ map: sideTexture }),    // Face direita
        new THREE.MeshStandardMaterial({ map: sideTexture }),    // Face esquerda
        new THREE.MeshStandardMaterial({ map: topTexture }),     // Face de cima (topo)
        new THREE.MeshStandardMaterial({ map: bottomTexture }),  // Face de baixo (fundo)
        new THREE.MeshStandardMaterial({ map: sideTexture }),    // Face da frente
        new THREE.MeshStandardMaterial({ map: sideTexture }),    // Face de trás
    ];

    // 5. Crie a geometria do cubo (um esqueleto de cubo)
    // Você pode alterar os valores para mudar o tamanho do cubo.
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    // 6. Crie o Mesh, que combina a geometria com os materiais (a "pele")
    const cube = new THREE.Mesh(geometry, materials);

    // 7. Retorne o objeto cubo pronto para ser usado na cena
    return cube;
}