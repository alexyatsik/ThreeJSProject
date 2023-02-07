import {Clock, Raycaster} from "three";

export class Loop {
  #scene
  #camera
  #renderer
  #raycaster
  #updatables
  #clock
  #pointer
  #tooltip
  constructor(scene, camera, renderer, pointer, tooltip) {
    this.#scene = scene;
    this.#camera = camera;
    this.#renderer = renderer;
    this.#raycaster = new Raycaster();
    this.#pointer = pointer;
    this.#tooltip = tooltip;
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

      for(const child of countriesPoints.children) {
        child.material.opacity = child.material.basicOpacity;
      }
      this.#tooltip.addClass('hidden');

      for ( let i = 0; i < intersects.length; i ++ ) {
        intersects[i].object.material.opacity = 1;
        this.#tooltip.updateContent(intersects[i]);
        this.#tooltip.updatePosition(this.#pointer.AbsX, this.#pointer.AbsY);
        this.#tooltip.removeClass('hidden');
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

  get raycaster() {
    return this.#raycaster;
  }
}