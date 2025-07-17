import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createLadybugBody, createLadybugHead } from './objetos/objetodacarol.js';
import { createLadybugAnimation } from './objetos/ladybugAnimation.js';
import { blocoGrama } from './objetos/objeto_pedro.js';
import { glowstone } from './objetos/glowstone.js';
import { criarPacman } from './objetos/pacman.ts'; // objetorenan

// ==================================================
// CRIANDO A CENA E O RENDERIZADOR
// ==================================================
const cena = new THREE.Scene();
const render = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')!
});
render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ==================================================
// CRIANDO O CHÃO COM O BLOCO DE GRAMA   
// ==================================================
const chao = new THREE.Group();

// Tamanho da grada
const grid = 10;

//Tamanho do bloco
const tamBloco = 1.5; 

// Crie o primeiro bloco que servirá de modelo para os clones
const blocoBase = blocoGrama();

// Loop duplo para criar a grade
for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
        const novoBloco = blocoBase.clone();

        // Posição de cada bloco na grade (chão)
        novoBloco.position.set(
            i * tamBloco - (grid * tamBloco) / 2, // X
            0,                                    // Y 
            j * tamBloco - (grid * tamBloco) / 2  // Z
        );
        
        //Adiciona o novo bloco ao grupo do chão
        chao.add(novoBloco);
    }
}

cena.add(chao);

// =================================================
// CRIAÇÃO DO PAC-MAN E MAPA DE AMBIENTE (METAL)
// =================================================

// textura onde o reflexo será salvo
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256); // 256 é a resolução da textura
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget); // camera auxiliar para capturar a textura de ambiente
const meuPacman = criarPacman(cubeRenderTarget.texture);

// Com a separação dos grupos, fica mais fácil animar a direção que o pacman 'olha' 
const pacmanGroup = new THREE.Group();
pacmanGroup.add(meuPacman);
pacmanGroup.position.set(5, 0.7, 5); 
cena.add(pacmanGroup);


// =================================================
// CRIAÇÃO DO OBJETO LUMINOSO GLOWSTONE
// =================================================
const glowstoneCube = glowstone();

// Posiciona o glowstone no centro da cena 
// (x, y, z) = (0, 1.5, 0)
glowstoneCube.position.set(-0.75, 1.5, -0.75); 
cena.add(glowstoneCube);

// Luz pontual dentro do cubo
const cubeLight = new THREE.PointLight(0xffaa00, 5, 1000); // cor e intensidade
cubeLight.position.set(0, 0, 0); // centralizada no cubo
glowstoneCube.add(cubeLight); // a luz se move junto com o cubo

// =================================================
// ADICIONANDO LUZ AMBIENTE
// =================================================
const luzamb = new THREE.AmbientLight(0xffffff, 0);
cena.add(luzamb);
const dirluz = new THREE.DirectionalLight(0xffffff, 0.05);
dirluz.position.set(5, 5, 5);
cena.add(dirluz);

// =================================================
// CRIAÇÃO DAS CÂMERAS
// =================================================
const cam1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
cam1.position.set(4, 5, 8);
cena.add(cam1);

const aspectRatio = window.innerWidth / window.innerHeight;
// Zoom da câmera ortográfica
const frustumSize = 25; 

const cam2 = new THREE.OrthographicCamera(
    frustumSize * aspectRatio / -2, // esq
    frustumSize * aspectRatio / 2,  // dir
    frustumSize / 2,                // topo
    frustumSize / -2,               // baixo
    0.1,                            // prox
    100                             // dist
);
cam2.position.set(0, 20, 0);
cam2.lookAt(0, 0, 0);

let activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera = cam1; // Câmera inicial

// Controles de órbita para a câmera principal
const controls = new OrbitControls(cam1, render.domElement);
controls.enableDamping = true;

// Lógica para trocar de câmera
window.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        activeCamera = activeCamera === cam1 ? cam2 : cam1;
        console.log('Câmera trocada!');
    }
});

// =================================================
// CRIAÇÃO DA JOANINHA
// =================================================
const body = createLadybugBody();
const head = createLadybugHead();

const ladybug = new THREE.Group();
ladybug.add(body);
ladybug.add(head);
cena.add(ladybug);

// cria a função de animação da joaninha
const animateLadybug = createLadybugAnimation();

// Constantes para o movimento do Pac-Manconst PACMAN_SPEED = 2.0; // Unidades por segundo
const PACMAN_SPEED = 10.0;
const MIN_FOLLOW_DISTANCE = 1.5; // Distância mínima que o Pac-Man tentará manter da joaninha

const clock = new THREE.Clock();

// =================================================
// LOOP DE ANIMAÇÃO
// =================================================
const animate = () => {

    // o movimento deve ser o mesmo em qualquer computador/taxa de frames
    const deltaTime = clock.getDelta();
    const elapsedTime = clock.getElapsedTime(); // Tempo total para a boca

    controls.update();

    animateLadybug(ladybug);

    // --- ATUALIZAÇÃO DO REFLEXO EM TEMPO REAL ---
    if (meuPacman) {
        meuPacman.visible = false; // não refletir nele mesmo
        
        cubeCamera.position.copy(pacmanGroup.position);
        cubeCamera.update(render, cena);

        meuPacman.visible = true;
    }

    // --- MOVIMENTAÇÃO DO PACMAN ---
    const pacmanPosition = pacmanGroup.position;
    const ladybugPosition = ladybug.position;
    const distance = pacmanPosition.distanceTo(ladybugPosition);

    // só se move se estiver mais longe que a distância mínima
    if (distance > MIN_FOLLOW_DISTANCE) {
        // Calcula o vetor de direção (de Pac-Man para a joaninha)
        const direction = new THREE.Vector3().subVectors(ladybugPosition, pacmanPosition).normalize();

        // Move o Pac-Man nessa direção, baseado na velocidade e no tempo
        pacmanGroup.position.add(direction.multiplyScalar(PACMAN_SPEED * deltaTime));
    }

    // Faz o Pac-Man sempre "olhar" para a joaninha
    pacmanGroup.lookAt(ladybugPosition);

    // --- ANIMAÇÃO DA BOCA --- 
    const aberturaMinima = 0;
    const aberturaMaxima = Math.PI * 0.25; // aumentado um pouco para ser mais visível
    const velocidadeBoca = 10;
    
    const oscilacao = Math.sin(elapsedTime * velocidadeBoca);
    const alpha = (oscilacao + 1) / 2;
    const anguloAbertura = aberturaMinima + alpha * (aberturaMaxima - aberturaMinima);
    
     if (meuPacman.userData.boca) {
         // efeito deve ser como uma "dobradiça"
         meuPacman.userData.boca.superior.rotation.x = -anguloAbertura;
         meuPacman.userData.boca.inferior.rotation.x = anguloAbertura;
     }

    render.render(cena, activeCamera); // Renderiza com a câmera ativa
    window.requestAnimationFrame(animate);
};

animate();

// =================================================
// REDIMENSIONAMENTO DA TELA
// =================================================
window.addEventListener('resize', () => {
    cam1.aspect = window.innerWidth / window.innerHeight;
    cam1.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

