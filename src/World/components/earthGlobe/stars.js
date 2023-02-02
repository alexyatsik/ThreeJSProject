import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial} from "three";

export function createStars() {
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starsVertices.push(x, y, z);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute(
        'position',
        new Float32BufferAttribute(starsVertices, 3)
    );
    const material = new PointsMaterial({
        color: 0xffffff
    });

    return new Points(geometry, material);
}