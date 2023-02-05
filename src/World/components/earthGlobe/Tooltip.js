import {BaseElement} from "../../../utils/BaseElement";

export class Tooltip extends BaseElement {
    #countryNameElement
    #countryPopulationValue
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
        this.#countryPopulationValue.innerHtml(
            new Intl.NumberFormat().format(object.object.tooltipData?.countryPopulation)
        );
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

        const populationWrapper = new BaseElement()
            .addClass('tooltip__data-item')
            .appendTo(countryDataWrapper.DOMElement);

        new BaseElement('span')
            .addClass('tooltip__data-title')
            .innerHtml('Population: ')
            .appendTo(populationWrapper.DOMElement);
        this.#countryPopulationValue = new BaseElement('span')
            .addClass('tooltip__data-value')
            .innerHtml('DATA_VALUE')
            .appendTo(populationWrapper.DOMElement)
    }
}