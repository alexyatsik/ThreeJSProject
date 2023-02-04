import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial} from "three";

export class Stars {
    #points
    #vertices = []
    constructor() {
        this.#createVertices();

        const geometry = new BufferGeometry();
        geometry.setAttribute(
            'position',
            new Float32BufferAttribute(this.#vertices, 3)
        );

        const material = new PointsMaterial({
            color: 0xffffff
        });

        this.#points = new Points(geometry, material);
    }

    get points() {
        return this.#points;
    }

    #createVertices() {
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 2000;
            this.#vertices.push(x, y, z);
        }
    }
}