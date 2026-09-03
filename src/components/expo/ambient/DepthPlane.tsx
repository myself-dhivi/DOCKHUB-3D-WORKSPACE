import { Mesh, Plane, type OGLRenderingContext } from "ogl";

import { createAmbientMaterial } from "./materials";

export function createDepthPlane(gl: OGLRenderingContext) {
  const geometry = new Plane(gl, { width: 2.8, height: 1.55 });
  const program = createAmbientMaterial(gl, "#184091", 0.055, 1.1);
  return new Mesh(gl, { geometry, program });
}
