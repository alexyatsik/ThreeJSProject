import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";

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
        this.#camera;
        this.#renderer;
        this.#loop;
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