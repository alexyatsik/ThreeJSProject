import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";
import {Loop} from "./system/Loop";
import {createControls} from "./system/controls";
import {Resizer} from "./system/Resizer";
import {createLights} from "./components/lights";
import {createCube} from "./components/cube";
import {createSphere} from "./components/sphere";
import {TextureLoader} from "three";
import earth_uv_map from '../assets/maps/earth_uv_map.jpg';

export class World {
    #scene
    #camera
    #renderer
    #loop
    #controls
    constructor(parent) {
        if (!parent) {
            parent = new BaseElement()
                .appendTo(document.body)
                .DOMElement;
            parent.id = 'scene-container';
        }

        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer();
        parent.append(this.#renderer.domElement);
        this.#loop = new Loop(this.#scene, this.#camera, this.#renderer);
        // this.#controls = createControls(this.#camera, this.#renderer.domElement);
        new Resizer(parent, this.#camera, this.#renderer);

        // const lights = createLights();

        const map = new TextureLoader().load(earth_uv_map);
        const sphere = createSphere(
          5,
          50,
          50,
          map
        );

        this.#scene.add(
          sphere
        );
        this.#loop.addUpdatable(
          // this.#controls,
        );
    }

    async init() {

    }

    render() {
        this.#renderer.render(this.#scene, this.#camera);
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }
}