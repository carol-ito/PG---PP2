import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createLadybugBody, createLadybugHead } from './objetos/objetodacarol.js';
import { createLadybugAnimation } from './objetos/ladybugAnimation.js';
import { blocoGrama } from './objetos/objeto_pedro.js';
import { glowstone } from './objetos/glowstone.js';

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

const cam2 = new THREE.OrthographicCamera(-20, 20, 20, -20, 2, 200);
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

// =================================================
// LOOP DE ANIMAÇÃO
// =================================================
const animate = () => {
    controls.update(); // Atualiza os controles de órbita

    animateLadybug(ladybug); // atualiza a animação da joaninha

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

