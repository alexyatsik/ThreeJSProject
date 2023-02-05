import {BoxGeometry, Matrix4, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import {degToRad} from "three/src/math/MathUtils";
import {gsap} from 'gsap';

export class Point {
    #point
    #boxGeometryParams = {
        x: 0.1,
        y: 0.1,
        z: 0.8
    }
    #radius
    #lookAtPoint
    #latitude
    #longitude
    constructor(latitude, longitude, options) {
        if (latitude === undefined || longitude === undefined || options.radius === undefined)
            throw new Error('Latitude, longitude or radius is not set');

        this.#radius = options.radius;
        this.#lookAtPoint = options?.lookAtPoint || null;
        this.#latitude = latitude;
        this.#longitude = longitude;

        this.#build();
        this.#applyAnimation();
    }

    get mesh() {
        return this.#point;
    }

    #build() {
        const x = this.#radius * Math.cos(degToRad(this.#latitude)) * Math.sin(degToRad(this.#longitude));
        const y = this.#radius * Math.sin(degToRad(this.#latitude));
        const z = this.#radius * Math.cos(degToRad(this.#latitude)) * Math.cos(degToRad(this.#longitude));

        const geometry = new BoxGeometry(
            this.#boxGeometryParams.x,
            this.#boxGeometryParams.y,
            this.#boxGeometryParams.z
        );
        const material = new MeshBasicMaterial({
            color: '#3bf7ff'
        });

        this.#point = new Mesh(geometry, material);
        this.#point.position.set(x, y, z);
        if (this.#lookAtPoint)
            this.#point.lookAt(this.#lookAtPoint);
        this.#point.geometry.applyMatrix4(
            new Matrix4().makeTranslation(0, 0, -this.#boxGeometryParams.z/2)
        );
    }

    #applyAnimation() {
        gsap.to(this.#point.scale, {
            z: 0,
            duration: 2,
            yoyo: true,
            repeat: -1,
            delay: Math.random(),
            ease: 'linear'
        });
    }
}