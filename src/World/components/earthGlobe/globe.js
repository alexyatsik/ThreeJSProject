import {Mesh, ShaderMaterial, SphereGeometry, TextureLoader} from "three";
import {degToRad} from "three/src/math/MathUtils";
import vertexShader from "../../../assets/shaders/vertex.glsl";
import fragmentShader from "../../../assets/shaders/fragment.glsl";
import earth_uv_map from "../../../assets/maps/earth_uv_map.jpg";

export function createGlobe() {
    const geometry = new SphereGeometry(5, 50, 50);
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new TextureLoader().load(earth_uv_map)
            }
        }
    });
    const radians = degToRad(5);
    const globe = new Mesh(geometry, material);
    globe.tick = (delta) => {
        globe.rotation.y += radians * delta;
    }

    return globe;
}