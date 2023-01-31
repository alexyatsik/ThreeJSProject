import {PerspectiveCamera} from "three";

export function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.set(10, 10, 10);
  camera.position.z = 15;

  return camera;
}