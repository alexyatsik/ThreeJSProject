import {WebGLRenderer} from "three";

export function createRenderer(scene, camera) {
  const renderer = new WebGLRenderer(scene, camera);

  return renderer;
}