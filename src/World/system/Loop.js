import {Clock} from "three";

export class Loop {
  #scene
  #camera
  #renderer
  #updatables
  #clock
  constructor(scene, camera, renderer) {
    this.#scene = scene;
    this.#camera = camera;
    this.#renderer = renderer;
    this.#updatables = [];
    this.#clock = new Clock();
  }

  start() {

  }

  stop() {

  }

  addUpdatable() {

  }

  #tick() {

  }
}