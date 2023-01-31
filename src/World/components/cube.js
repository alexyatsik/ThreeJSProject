import {BoxGeometry, Mesh, MeshStandardMaterial} from "three";
import {degToRad} from "three/src/math/MathUtils";

export function createCube(size, color) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshStandardMaterial({
    color: color
  });
  const cube = new Mesh(geometry, material);
  const radians = degToRad(30);

  cube.tick = (delta) => {
    cube.rotation.x = radians * delta;
    cube.rotation.y = radians * delta;
    cube.rotation.z = radians * delta;
  }

  return cube;
}