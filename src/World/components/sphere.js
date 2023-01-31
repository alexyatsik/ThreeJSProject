import {Mesh, SphereGeometry, ShaderMaterial, TextureLoader} from "three";
import vertexShader from '../../assets/shaders/vertex.glsl';
import fragmentShader from '../../assets/shaders/fragment.glsl';
import earth_uv_map from '../../assets/maps/earth_uv_map.jpg';

export function createSphere(radius, widthSegments, heightSegments) {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new TextureLoader().load(earth_uv_map)
      }
    }
  })

  const sphere = new Mesh(geometry, material);

  return sphere;
}