import { Mesh, Torus, type OGLRenderingContext } from "ogl";

import { createAmbientMaterial } from "./materials";

export function createFloatingRing(gl: OGLRenderingContext, color: string, opacity: number) {
  const geometry = new Torus(gl, { radius: 1.36, tube: 0.018, radialSegments: 8, tubularSegments: 96 });
  const program = createAmbientMaterial(gl, color, opacity, 1.2);
  return new Mesh(gl, { geometry, program });
}
