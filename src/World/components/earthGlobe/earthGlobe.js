import {createGlobe} from "./globe";
import {createAtmosphere} from "./atmosphere";
import {Group} from "three";
import gsap from "gsap";

export function createEarthGlobe() {
    const mouse = {x: 0, y: 0};
    const globe = createGlobe();
    const atmosphere = createAtmosphere();
    const earthGlobeGroup = new Group();
    earthGlobeGroup.add(globe, atmosphere);
    earthGlobeGroup.tick = (delta) => {
        gsap.to(earthGlobeGroup.rotation, {
            x: -mouse.y * 10 * delta,
            y: mouse.x * 10 * delta,
            duration: 2
        });
    }

    addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    });

    return {
        earthGlobeGroup,
        globe
    };
}