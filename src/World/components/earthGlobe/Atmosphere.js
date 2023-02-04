import {AdditiveBlending, BackSide, Mesh, ShaderMaterial, SphereGeometry} from "three";
import atmosphereVertexShader from "../../../assets/shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../../../assets/shaders/atmosphereFragment.glsl";

export class Atmosphere {
    #atmosphere
    constructor(radius) {
        const geometry = new SphereGeometry(radius, 50, 50);
        const material = new ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: AdditiveBlending,
            side: BackSide
        });
        this.#atmosphere = new Mesh(geometry, material);
        this.#atmosphere.scale.set(1.1, 1.1, 1.1);
    }

    get mesh() {
        return this.#atmosphere;
    }
}