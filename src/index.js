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
    const contentWrapper = new BaseElement()
        .addClass('content-wrapper')
        .appendTo(root.DOMElement);
    const canvasWrapper = new BaseElement()
        .addClass('canvas-wrapper')
        .appendTo(root.DOMElement);

    const world = new World(canvasWrapper.DOMElement);
    await world.init();
    world.start();

    createUI(contentWrapper.DOMElement);
}

function createUI(rootElement) {
    const maxWidthWrapper = new BaseElement()
        .addClass('content__max-width-wrapper')
        .appendTo(rootElement)
        .DOMElement;

    const titleText = 'Challenging the standard of space exploration';
    new BaseElement('h1')
        .addClass('content__title-text')
        .innerHtml(titleText)
        .appendTo(maxWidthWrapper);

    const contentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales ligula sit amet semper consectetur.';
    new BaseElement('p')
        .addClass('content__text')
        .innerHtml(contentText)
        .appendTo(maxWidthWrapper);

    const button = new BaseElement('a')
        .addClass('button', 'content__button')
        .innerHtml('Learn More')
        .appendTo(maxWidthWrapper);
    button.DOMElement.href = '';
}