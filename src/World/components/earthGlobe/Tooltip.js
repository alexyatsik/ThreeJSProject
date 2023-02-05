import {BaseElement} from "../../../utils/BaseElement";

export class Tooltip extends BaseElement {
    #countryNameElement
    constructor() {
        super();

        this
            .addClass('hidden')
            .appendTo(document.body);
        this.DOMElement.id = 'tooltip';

        this.#addContent();
    }

    updateContent(object) {
        this.#countryNameElement.innerHtml(object.object.tooltipData?.countryName);
    }

    updatePosition(x, y) {
        this
            .addStyle('bottom', `${y}px`)
            .addStyle('right', `${x}px`);
    }

    #addContent() {
        this.#countryNameElement = new BaseElement('h4')
            .addClass('tooltip__country-name')
            .appendTo(this.DOMElement);


        const countryDataWrapper = new BaseElement()
            .addClass('tooltip__country-data')
            .appendTo(this.DOMElement);

        const countryPopulation = new BaseElement()
            .addClass('tooltip__country-population')
            .appendTo(countryDataWrapper);

    }
}