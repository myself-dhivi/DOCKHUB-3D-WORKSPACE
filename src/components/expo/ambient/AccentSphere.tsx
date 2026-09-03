import { Mesh, Sphere, type OGLRenderingContext } from "ogl";

import { createAmbientMaterial } from "./materials";

export function createAccentSphere(gl: OGLRenderingContext) {
  const geometry = new Sphere(gl, { radius: 0.16, widthSegments: 18, heightSegments: 10 });
  const program = createAmbientMaterial(gl, "#F5BD1E", 0.82, 0.75);
  return new Mesh(gl, { geometry, program });
}
