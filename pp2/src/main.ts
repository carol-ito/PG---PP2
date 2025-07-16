import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { blocoGrama } from './objetos/objeto_pedro.js';

// 1. CENA E RENDERIZADOR
const cena = new THREE.Scene();
const render = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')!
});
render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 1. CRIANDO O CHÃO COM O BLOCO DE GRAMA   
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
        // 1. Clone o bloco base
        const novoBloco = blocoBase.clone();

        // 2. Calcule a posição de cada bloco na grade
        // Subtraímos (gridSize * blockSize) / 2 para centralizar a grade na origem (0,0)
        novoBloco.position.set(
            i * tamBloco - (grid * tamBloco) / 2, // Posição X
            0,                                          // Posição Y (altura do chão)
            j * tamBloco - (grid * tamBloco) / 2  // Posição Z
        );

        // 3. Adicione o novo bloco clonado ao grupo do chão
        chao.add(novoBloco);
    }
}

// 4. Adicione o grupo inteiro (com todos os blocos) à cena de uma só vez
cena.add(chao);


// 3. LUZES
const luzamb = new THREE.AmbientLight(0xffffff, 0.7);
cena.add(luzamb);
const dirluz = new THREE.DirectionalLight(0xffffff, 1.5);
dirluz.position.set(5, 5, 5);
cena.add(dirluz);

// 4. CÂMERAS (Requisito: pelo menos duas)
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

// 5. LOOP DE ANIMAÇÃO
const animate = () => {
    controls.update(); // Atualiza os controles de órbita
    render.render(cena, activeCamera); // Renderiza com a câmera ativa
    window.requestAnimationFrame(animate);
};

animate();

// Redimensionamento da janela
window.addEventListener('resize', () => {
    cam1.aspect = window.innerWidth / window.innerHeight;
    cam1.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});