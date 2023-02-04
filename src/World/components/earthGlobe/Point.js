import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";

export class Point {
    constructor() {
        const x = radius * Math.cos(latitude) * Math.sin(longitude);
        const y = radius * Math.sin(latitude);
        const z = radius * Math.cos(latitude) * Math.cos(longitude);

        const geometry = new SphereGeometry(1, 50, 50);
        const material = new MeshBasicMaterial({
            color: '#ff0000'
        });
        const point = new Mesh(geometry, material);
        point.position.set(x, y, z);

        // 48.3794° N, 31.1656° E - Ukraine
    }
}