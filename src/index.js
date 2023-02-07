import './styles/main.css';
import {World} from "./World/World";

main().catch((err) => {
    console.error(err);
});

async function main() {
    const world = new World();
    await world.init();
    world.start();
}