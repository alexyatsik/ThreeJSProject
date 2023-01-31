import {Mesh, SphereGeometry, ShaderMaterial} from "three";
import vertexShader from '../../assets/shaders/vertex.glsl';
import fragmentShader from '../../assets/shaders/fragment.glsl';

export function createSphere(radius, widthSegments, heightSegments) {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader
  })

  const sphere = new Mesh(geometry, material);

  return sphere;
}