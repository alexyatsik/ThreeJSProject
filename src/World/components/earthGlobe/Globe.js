import {Mesh, ShaderMaterial, SphereGeometry, TextureLoader} from "three";
import vertexShader from "../../../assets/shaders/vertex.glsl";
import fragmentShader from "../../../assets/shaders/fragment.glsl";
import earth_uv_map from "../../../assets/maps/earth_uv_map.jpg";

export class Globe {
    #globe
    constructor(radius) {
        const geometry = new SphereGeometry(radius, 50, 50);
        const material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new TextureLoader().load(earth_uv_map)
                }
            }
        });
        this.#globe = new Mesh(geometry, material);
    }

    get mesh() {
        return this.#globe;
    }
}