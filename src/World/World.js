import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";
import {Loop} from "./system/Loop";
import {createControls} from "./system/controls";
import {Resizer} from "./system/Resizer";
import {Stars} from "./components/earthGlobe/Stars";
import {Earth} from "./components/earthGlobe/Earth";

export class World {
    #scene
    #camera
    #renderer
    #loop
    #controls
    constructor(parent = document.body) {
        const canvas = new BaseElement('canvas')
            .appendTo(parent);
        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer(canvas.DOMElement);
        this.#loop = new Loop(this.#scene, this.#camera, this.#renderer);
        // this.#controls = createControls(this.#camera, this.#renderer.domElement);
        new Resizer(canvas.DOMElement.parentElement, this.#camera, this.#renderer);

        this.#loop.addUpdatable(
          // this.#controls,
        );
    }

    async init() {
        const earth = new Earth(5);
        const stars = new Stars();
        this.#scene.add(
            earth.group,
            stars.points
        );
        this.#loop.addUpdatable(
            earth
        );
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