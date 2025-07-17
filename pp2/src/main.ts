import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createLadybugBody, createLadybugHead } from './objects/objetodacarol';
import { createLadybugAnimation } from './objects/ladybugAnimation';

// 1. CENA E RENDERIZADOR
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')!
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. AMBIENTE NEUTRO (CHÃO)
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotaciona para ficar deitado
scene.add(ground);

// 3. LUZES
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 4. CÂMERAS (Requisito: pelo menos duas)
const mainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
mainCamera.position.set(4, 5, 8);
scene.add(mainCamera);

const topDownCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 100);
topDownCamera.position.set(0, 10, 0);
topDownCamera.lookAt(0, 0, 0);

let activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera = mainCamera; // Câmera inicial

// Controles de órbita para a câmera principal
const controls = new OrbitControls(mainCamera, renderer.domElement);
controls.enableDamping = true;

// Lógica para trocar de câmera
window.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        activeCamera = activeCamera === mainCamera ? topDownCamera : mainCamera;
        console.log('Câmera trocada!');
    }
});

// criação da joaninha
const body = createLadybugBody();
const head = createLadybugHead();



const ladybug = new THREE.Group();
ladybug.add(body);
ladybug.add(head);
scene.add(ladybug);

// cria a função de animação da joaninha
const animateLadybug = createLadybugAnimation();

// 5. LOOP DE ANIMAÇÃO
const animate = () => {
    controls.update(); // Atualiza os controles de órbita

    animateLadybug(ladybug); // atualiza a animação da joaninha

    renderer.render(scene, activeCamera); // Renderiza com a câmera ativa
    window.requestAnimationFrame(animate);
};

animate();

// Redimensionamento da janela
window.addEventListener('resize', () => {
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

