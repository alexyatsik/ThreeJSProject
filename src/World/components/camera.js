import {PerspectiveCamera} from "three";

export function createCamera() {
  const camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(10, 10, 10);

  return camera;
}