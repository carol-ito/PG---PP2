import * as THREE from 'three'

const bodyMaterial = new THREE.RawShaderMaterial({
  vertexShader: `
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;
    varying vec2 vUv;

    void main() {
      vec2 grid = fract(vUv * 6.0);
      float dist = distance(grid, vec2(0.5));
      float circle = step(dist, 0.2);

      vec3 red = vec3(1.0, 0.0, 0.0);
      vec3 black = vec3(0.0);
      vec3 color = mix(red, black, circle);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
})

const headMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })

export function createLadybugBody() {
  const geometry = new THREE.BoxGeometry(1, 0.5, 1)
  const body = new THREE.Mesh(geometry, bodyMaterial)
  body.position.y = 0.25
  return body
}

export function createLadybugHead() {
  const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
  const head = new THREE.Mesh(geometry, headMaterial)
  head.position.set(0, 0.1, 0.7)
  return head
}
