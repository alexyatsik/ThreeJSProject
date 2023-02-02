import {BaseElement} from "../utils/BaseElement";
import {createScene} from "./components/scene";
import {createCamera} from "./components/camera";
import {createRenderer} from "./system/renderer";
import {Loop} from "./system/Loop";
import {createControls} from "./system/controls";
import {Resizer} from "./system/Resizer";
import {createLights} from "./components/lights";
import {createEarthGlobe} from "./components/earthGlobe/earthGlobe";
import {createStars} from "./components/earthGlobe/stars";

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

        this.#loop.addUpdatable(
          // this.#controls,
        );
    }

    async init() {
        const earthGroup = createEarthGlobe();
        const stars = createStars();
        this.#scene.add(
            earthGroup.earthGlobeGroup,
            stars
        );
        this.#loop.addUpdatable(
            earthGroup.globe,
            earthGroup.earthGlobeGroup
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