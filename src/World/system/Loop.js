import {Clock, Raycaster} from "three";

export class Loop {
  #scene
  #camera
  #renderer
  #raycaster
  #updatables
  #clock
  #pointer
  constructor(scene, camera, renderer, pointer) {
    this.#scene = scene;
    this.#camera = camera;
    this.#renderer = renderer;
    this.#raycaster = new Raycaster();
    this.#pointer = pointer;
    this.#updatables = [];
    this.#clock = new Clock();
  }

  start() {
    this.#renderer.setAnimationLoop(()=> {
      this.#tick();

      this.#raycaster.setFromCamera( this.#pointer, this.#camera );

      const earthGroup = this.#scene.children.find(child => child.name === 'Earth Group');
      const countriesPoints = earthGroup.children.find(child => child.name === 'Countries points');
      const intersects = this.#raycaster.intersectObjects( countriesPoints.children );
      for ( let i = 0; i < intersects.length; i ++ ) {
        console.log('raycast pew pew')
      }

      this.#renderer.render(this.#scene, this.#camera);
    });
  }

  stop() {
    this.#renderer.setAnimationLoop(null);
  }

  addUpdatable(...updatables) {
    this.#updatables.push(...updatables);
  }

  #tick() {
    const delta = this.#clock.getDelta();
    for(const object of this.#updatables) {
      object.tick(delta);
    }
  }
}