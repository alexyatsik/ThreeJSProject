import {AdditiveBlending, BackSide, Mesh, ShaderMaterial, SphereGeometry} from "three";
import atmosphereVertexShader from "../../../assets/shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../../../assets/shaders/atmosphereFragment.glsl";

export function createAtmosphere() {
    const geometry = new SphereGeometry(5, 50, 50);
    const material = new ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: AdditiveBlending,
        side: BackSide
    });
    const atmosphere = new Mesh(geometry, material);
    atmosphere.scale.set(1.1, 1.1, 1.1);

    return atmosphere;
}