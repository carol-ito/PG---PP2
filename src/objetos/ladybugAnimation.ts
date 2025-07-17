import * as THREE from 'three'

export function createLadybugAnimation() {
    let angulo = 0;
    const raio = 5;
    const amplitude = 1;
    const vel = 0.02;

    const alturaMin = 1.5;      

    return function animateLadybug(ladybug: THREE.Group) {
        angulo += vel;

        ladybug.position.x = raio * Math.cos(angulo);
        ladybug.position.z = raio * Math.sin(angulo);

        const oscilacao = (Math.sin(angulo * 3) + 1) / 2;
        ladybug.position.y = alturaMin + oscilacao * amplitude;
        
        ladybug.rotation.y = -angulo;
    };
}