import * as THREE from 'three'

export function createLadybugAnimation() {
    let flyAngle = 0;
    const flyRadius = 5;
    const flyHeightAmplitude = 1;
    const flySpeed = 0.02;

    return function animateLadybug(ladybug: THREE.Group) {
        flyAngle += flySpeed;

        ladybug.position.x = flyRadius * Math.cos(flyAngle);
        ladybug.position.z = flyRadius * Math.sin(flyAngle);
        ladybug.position.y = 1 + Math.sin(flyAngle * 3) * flyHeightAmplitude;

        ladybug.rotation.y = -flyAngle;
    };
}