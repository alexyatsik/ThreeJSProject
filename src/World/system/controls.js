import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.target.y = 1;
  controls.enableDumping = true;
  controls.tick = () => {
    controls.update();
  }

  return controls;
}