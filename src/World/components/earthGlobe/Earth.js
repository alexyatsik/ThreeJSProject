import {Globe} from "./Globe";
import {Atmosphere} from "./Atmosphere";
import {Group} from "three";
import gsap from "gsap";
import {Point} from "./Point";

export class Earth {
    #globe
    #atmosphere
    #earthGroup = new Group();
    #radius
    #points = new Group();
    constructor(radius) {
        this.#radius = radius;
        this.#globe = new Globe(this.#radius);
        this.#atmosphere = new Atmosphere(this.#radius);
        this.#points.name = "Countries points";
        this.#earthGroup.name = "Earth Group";
        this.#earthGroup.add(
            this.#globe.mesh,
            this.#atmosphere.mesh
        );

        this.#addCountriesPointsToTheGroup();
    }

    get group() {
        return this.#earthGroup;
    }

    tick(delta) {
        // gsap.to(this.#earthGroup.rotation, {
        //     x: -this.#mouse.y * 100 * delta,
        //     y: this.#mouse.x * 200 * delta,
        //     duration: 2
        // });
        this.#earthGroup.rotation.y += 0.2 * delta;
    }

    #addCountriesPointsToTheGroup() {
        const pointOptions = {
            radius: this.#radius,
            lookAtPoint: this.#globe.mesh.position
        }

        this.#points.add(
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
            // India
            new Point(20.5937, 78.9629, pointOptions).mesh,
            // Argentina
            new Point(-38.4161, -63.6167, pointOptions).mesh,
        );

        this.#earthGroup.add(this.#points);
    }
}