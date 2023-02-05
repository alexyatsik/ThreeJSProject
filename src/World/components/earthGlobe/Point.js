import {BoxGeometry, Matrix4, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import {degToRad} from "three/src/math/MathUtils";
import {gsap} from 'gsap';

export class Point {
    #point
    #radius
    #lookAtPoint
    #latitude
    #longitude
    #tooltipData
    constructor(latitude, longitude, options, tooltipData) {
        if (latitude === undefined || longitude === undefined || options.radius === undefined)
            throw new Error('Latitude, longitude or radius is not set');

        this.#radius = options.radius;
        this.#lookAtPoint = options?.lookAtPoint || null;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#tooltipData = tooltipData;

        this.#build();
        this.#applyAnimation();
    }

    get mesh() {
        return this.#point;
    }

    #build() {
        const scale = this.#tooltipData.countryPopulation / 1000000000;
        const boxGeometryParams = {
            x: Math.max(0.2 * scale, 0.1),
            y: Math.max(0.2 * scale, 0.1),
            z: Math.max(0.8 * scale, 0.1)
        }
        const geometry = new BoxGeometry(
            boxGeometryParams.x,
            boxGeometryParams.y,
            boxGeometryParams.z
        );

        const materialBasicOpacity = 0.4;
        const material = new MeshBasicMaterial({
            color: '#3bf7ff',
            transparent: true,
            opacity: materialBasicOpacity
        });
        material.basicOpacity = materialBasicOpacity;

        this.#point = new Mesh(geometry, material);

        const x = this.#radius * Math.cos(degToRad(this.#latitude)) * Math.sin(degToRad(this.#longitude));
        const y = this.#radius * Math.sin(degToRad(this.#latitude));
        const z = this.#radius * Math.cos(degToRad(this.#latitude)) * Math.cos(degToRad(this.#longitude));
        this.#point.position.set(x, y, z);

        if (this.#lookAtPoint)
            this.#point.lookAt(this.#lookAtPoint);

        this.#point.geometry.applyMatrix4(
            new Matrix4().makeTranslation(0, 0, -boxGeometryParams.z/2)
        );

        this.#point.tooltipData = this.#tooltipData;
    }

    #applyAnimation() {
        gsap.to(this.#point.scale, {
            z: 1.4,
            duration: 2,
            yoyo: true,
            repeat: -1,
            delay: Math.random(),
            ease: 'linear'
        });
    }
}