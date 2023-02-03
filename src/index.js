import './styles/main.css';
import {World} from "./World/World";
import {BaseElement} from "./utils/BaseElement";

main().catch((err) => {
    console.error(err);
});

async function main() {
    const root = new BaseElement()
        .addClass('root')
        .appendTo(document.body);
    new BaseElement()
        .addClass('content-wrapper')
        .innerHtml('Lorem ipsum')
        .appendTo(root.DOMElement);
    const canvasWrapper = new BaseElement()
        .addClass('canvas-wrapper')
        .appendTo(root.DOMElement);

    const world = new World(canvasWrapper.DOMElement);
    await world.init();
    world.start();

    createUI();
}

function createUI() {

}