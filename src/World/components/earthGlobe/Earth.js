import {Globe} from "./Globe";
import {Atmosphere} from "./Atmosphere";
import {Group} from "three";
import gsap from "gsap";
import {Point} from "./Point";
import {degToRad} from "three/src/math/MathUtils";

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

        this.#earthGroup.add(new Point(48.3794, 31.1656, radius).mesh); // Ukraine
        this.#earthGroup.add(new Point(41.8719, 12.5674, radius).mesh); // Italy
    }

    get group() {
        return this.#earthGroup;
    }

    tick(delta) {
        gsap.to(this.#earthGroup.rotation, {
            x: -this.#mouse.y * 20 * delta,
            y: this.#mouse.x * 20 * delta,
            duration: 2
        });

        // this.#earthGroup.rotation.y += degToRad(5) * delta;
    }
}