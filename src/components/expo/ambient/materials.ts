import { Program, type OGLRenderingContext } from "ogl";

const vertex = /* glsl */ `
  precision highp float;
  attribute vec3 position;
  attribute vec3 normal;
  uniform mat3 normalMatrix;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uFresnel;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(vec3(-0.35, 0.75, 0.8));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float fresnel = pow(1.0 - abs(normal.z), 2.4) * uFresnel;
    vec3 lit = uColor * (0.22 + diffuse * 0.72) + vec3(1.0) * fresnel * 0.46;
    float alpha = uOpacity * (0.5 + fresnel * 0.5);
    gl_FragColor = vec4(lit, alpha);
  }
`;

function rgb(hex: string): Float32Array {
  const value = hex.replace("#", "");
  return new Float32Array([
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ]);
}

export function createAmbientMaterial(gl: OGLRenderingContext, color: string, opacity: number, fresnel = 1) {
  return new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uColor: { value: rgb(color) },
      uOpacity: { value: opacity },
      uFresnel: { value: fresnel },
    },
    transparent: true,
    depthWrite: false,
    cullFace: false,
  });
}
