import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";

export class World {
    #scene
    #camera
    #renderer
    constructor(parent) {
        if (!parent) {
            parent = new BaseElement()
                .appendTo(document.body)
                .DOMElement;
            parent.DOMElement.id = 'scene-container';
        }

        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer(this.#scene, this.#camera);
        this.#loop = new Loop(this.#scene, this.#camera, this.#renderer);
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