import './styles/main.css';
import {World} from "./World/World";

async function main() {
    const world = new World();
    await world.init();
    world.start();
}

main().catch((err) => {
    console.error(err);
});