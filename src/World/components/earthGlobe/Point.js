import {BoxGeometry, Matrix4, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import {degToRad} from "three/src/math/MathUtils";

export class Point {
    #point
    constructor(latitude, longitude, options) {
        const {radius, lookAtPoint} = options;
        if (latitude === undefined || longitude === undefined || radius === undefined)
            throw new Error('Latitude, longitude or radius is not set');

        const x = radius * Math.cos(degToRad(latitude)) * Math.sin(degToRad(longitude));
        const y = radius * Math.sin(degToRad(latitude));
        const z = radius * Math.cos(degToRad(latitude)) * Math.cos(degToRad(longitude));

        const boxGeometryParams = {
            x: 0.1,
            y: 0.1,
            z: 0.8
        }
        const geometry = new BoxGeometry(boxGeometryParams.x, boxGeometryParams.y, boxGeometryParams.z);
        const material = new MeshBasicMaterial({
            color: '#ff0000'
        });
        this.#point = new Mesh(geometry, material);
        this.#point.position.set(x, y, z);
        this.#point.lookAt(lookAtPoint);
        this.#point.geometry.applyMatrix4(
            new Matrix4().makeTranslation(0, 0, -boxGeometryParams.z/2)
        );
    }

    get mesh() {
        return this.#point;
    }
}