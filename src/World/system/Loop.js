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
    this.#renderer.requestAnimationFrame(()=> {
      this.#tick();

      this.#renderer.render(this.#scene, this.#camera);
    });
  }

  stop() {
    this.#renderer.requestAnimationFrame(null);
  }

  addUpdatable(...updatables) {
    this.#updatables.push(...updatables);
  }

  #tick() {
    const delta = this.#clock.getDelta();
    for(const object in this.#updatables) {
      object.tick(delta);
    }
  }
}