import { Mesh, Sphere, type OGLRenderingContext } from "ogl";

import { createAmbientMaterial } from "./materials";

export function createGlassOrb(gl: OGLRenderingContext) {
  const geometry = new Sphere(gl, { radius: 0.62, widthSegments: 24, heightSegments: 14 });
  const program = createAmbientMaterial(gl, "#DCE8FF", 0.16, 1.45);
  return new Mesh(gl, { geometry, program });
}
