import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import {degToRad} from "three/src/math/MathUtils";

export class Point {
    #point
    constructor(latitude, longitude, radius) {
        if (!latitude || !longitude || !radius)
            throw new Error('Latitude or Longitude is not set');

        const x = radius * Math.cos(degToRad(latitude)) * Math.sin(degToRad(longitude));
        const y = radius * Math.sin(degToRad(latitude));
        const z = radius * Math.cos(degToRad(latitude)) * Math.cos(degToRad(longitude));

        const geometry = new SphereGeometry(0.1, 50, 50);
        const material = new MeshBasicMaterial({
            color: '#ff0000'
        });
        this.#point = new Mesh(geometry, material);
        this.#point.position.set(x, y, z);
    }

    get mesh() {
        return this.#point;
    }
}