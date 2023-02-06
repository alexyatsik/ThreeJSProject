import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";
import {Loop} from "./system/Loop";
import {createControls} from "./system/controls";
import {Resizer} from "./system/Resizer";
import {Stars} from "./components/earthGlobe/Stars";
import {Earth} from "./components/earthGlobe/Earth";
import {Tooltip} from "./components/earthGlobe/Tooltip";

export class World {
    #scene
    #camera
    #renderer
    #loop
    #controls
    #earth
    #pointer = {
        x: 0,
        y: 0,
        down: false,
        prevX: 0,
        prevY: 0
    }
    #canvas = new BaseElement('canvas');
    constructor(parent = document.body) {
        this.#canvas.appendTo(parent);
        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer(this.#canvas.DOMElement);

        const tooltip = new Tooltip();

        this.#setupPointer();

        this.#loop = new Loop(
            this.#scene,
            this.#camera,
            this.#renderer,
            this.#pointer,
            tooltip
        );
        // this.#controls = createControls(this.#camera, this.#renderer.domElement);
        new Resizer(this.#canvas.DOMElement.parentElement, this.#camera, this.#renderer);

        this.#loop.addUpdatable(
          // this.#controls,
        );
    }

    async init() {
        this.#earth = new Earth(5);
        const stars = new Stars();
        this.#scene.add(
            this.#earth.group,
            stars.points
        );
        // this.#loop.addUpdatable(
        //     this.#earth
        // );
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
        const divider = innerWidth / this.#canvas.DOMElement.parentElement.getBoundingClientRect().width;
        addEventListener('mousemove', (event) => {
            this.#pointer.x = ((event.clientX - innerWidth / divider) / (innerWidth / divider)) * 2 - 1;
            this.#pointer.AbsX = (innerWidth - event.clientX);
            this.#pointer.y = -(event.clientY / innerHeight) * 2 + 1;
            this.#pointer.AbsY = (innerHeight - event.clientY);



            if (this.#pointer.down) {
                const deltaX = event.clientX - this.#pointer.prevX;
                const deltaY = event.clientY - this.#pointer.prevY;
                this.#earth.group.rotation.y += deltaX * 0.005;
                this.#earth.group.rotation.x += deltaY * 0.005;
                this.#pointer.prevX = event.clientX;
                this.#pointer.prevY = event.clientY;
            }
        });
        addEventListener('mouseup', () => {
           this.#pointer.down = false;


        });
        this.#canvas.event('mousedown', ({clientX, clientY}) => {
            this.#pointer.down = true;
            this.#pointer.prevX = clientX;
            this.#pointer.prevY = clientY;
        });
    }
}