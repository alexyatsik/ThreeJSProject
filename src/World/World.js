import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";
import {Loop} from "./system/Loop";
import {createControls} from "./system/controls";
import {Resizer} from "./system/Resizer";

export class World {
    #scene
    #camera
    #renderer
    #loop
    #controls
    #pointer = {
        x: 0,
        y: 0
    }
    #canvas = new BaseElement('canvas');
    constructor(parent = document.body) {
        this.#canvas.appendTo(parent);
        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer(this.#canvas.DOMElement);

        this.#setupPointer();

        this.#loop = new Loop(
            this.#scene,
            this.#camera,
            this.#renderer,
            this.#pointer,
        );
        this.#controls = createControls(this.#camera, this.#renderer.domElement);
        new Resizer(this.#canvas.DOMElement.parentElement, this.#camera, this.#renderer);

        this.#loop.addUpdatable(
          this.#controls,
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

    #setupPointer() {
        addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.#pointer.x = (event.clientX - innerWidth) * 2 - 1;
            this.#pointer.y = -(event.clientY / innerHeight) * 2 + 1;
        });

        addEventListener('mouseup', () => {
           this.#pointer.down = false;
        });

        this.#canvas.event('mousedown', ({clientX, clientY}) => {
            this.#pointer.down = true;
        });

        addEventListener('touchmove', (event) => {
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
        }, {passive: false});

        addEventListener('touchend', () => {
            this.#pointer.down = false;
        });
    }
}