import {Globe} from "./Globe";
import {Atmosphere} from "./Atmosphere";
import {Group} from "three";
import gsap from "gsap";

export class Earth {
    #globe
    #atmosphere
    #earthGroup
    #mouse
    constructor(radius) {
        this.#globe = new Globe(radius);
        this.#atmosphere = new Atmosphere(radius);

        this.#earthGroup = new Group();
        this.#earthGroup.add(
            this.#globe.mesh,
            this.#atmosphere.mesh
        );

        this.#mouse = {x: 0, y: 0};
        addEventListener('mousemove', (event) => {
            this.#mouse.x = (event.clientX / innerWidth) * 2 - 1;
            this.#mouse.y = -(event.clientY / innerHeight) * 2 + 1;
        });
    }

    get group() {
        return this.#earthGroup;
    }

    tick(delta) {
        gsap.to(this.#earthGroup.rotation, {
            x: -this.#mouse.y * 10 * delta,
            y: this.#mouse.x * 10 * delta,
            duration: 2
        });
    }
}