import {Globe} from "./Globe";
import {Atmosphere} from "./Atmosphere";
import {Group} from "three";
import gsap from "gsap";
import {Point} from "./Point";

export class Earth {
    #globe
    #atmosphere
    #earthGroup
    #mouse
    #radius
    constructor(radius) {
        this.#radius = radius;
        this.#globe = new Globe(this.#radius);
        this.#atmosphere = new Atmosphere(this.#radius);

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

        this.#addCountriesPointsToTheGroup();
    }

    get group() {
        return this.#earthGroup;
    }

    tick(delta) {
        gsap.to(this.#earthGroup.rotation, {
            x: -this.#mouse.y * 100 * delta,
            y: this.#mouse.x * 200 * delta,
            duration: 2
        });
    }

    #addCountriesPointsToTheGroup() {
        const pointOptions = {
            radius: this.#radius,
            lookAtPoint: this.#globe.mesh.position
        }

        this.#earthGroup.add(
            // Ukraine
            new Point(48.3794, 31.1656, pointOptions).mesh,
            // Italy
            new Point(41.8719, 12.5674, pointOptions).mesh,
            // Brazil
            new Point(-14.2350, -51.9253, pointOptions).mesh,
            // USA
            new Point(37.0902, -95.7129, pointOptions).mesh,
            // China
            new Point(35.8617, 104.1954, pointOptions).mesh,
            // Japan
            new Point(36.2048, 138.2529, pointOptions).mesh,
            // UK
            new Point(55.3781, -3.4360, pointOptions).mesh,
            // Canada
            new Point(56.1304, -106.3468, pointOptions).mesh,
            // UAE
            new Point(23.4241, 53.8478, pointOptions).mesh,
            // Israel
            new Point(31.0461, 34.8516, pointOptions).mesh,
            // India
            new Point(20.5937, 78.9629, pointOptions).mesh,
            // Argentina
            new Point(-38.4161, -63.6167, pointOptions).mesh,
            // Zimbabwe
            new Point(-19.0154, 29.1549, pointOptions).mesh,
            // Congo
            new Point(-4.0383, 21.7587, pointOptions).mesh,
        )
    }
}