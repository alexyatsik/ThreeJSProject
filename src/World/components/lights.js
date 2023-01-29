import {DirectionalLight, HemisphereLight} from "three";

export function createLights() {
  const directionalLight = new DirectionalLight(
    'white',
    2
  );
  directionalLight.position.set(10,10,10);

  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    3
  );

  return {
    directionalLight,
    ambientLight
  };
}