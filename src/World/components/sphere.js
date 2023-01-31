import {Mesh, MeshBasicMaterial, SphereGeometry, ShaderMaterial} from "three";
import vertexShader from '../../assets/shaders/vertex.glsl';

export function createSphere(radius, widthSegments, heightSegments, skin) {
  let mapType = 'color';
  if (typeof skin === "object")
    mapType = 'map';

  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new ShaderMaterial({
    // vertexShader: ,
    // fragmentShader:
  })

  const sphere = new Mesh(geometry, material);

  return sphere;
}