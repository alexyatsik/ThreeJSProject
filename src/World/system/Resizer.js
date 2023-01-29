export class Resizer {
  constructor(container, camera, renderer) {
    this.#setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      this.#setSize(container, camera, renderer);
    });
  }

  #setSize(container, camera, renderer) {
    camera.aspect = container.innerWidth / container.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.innerWidth, container.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}