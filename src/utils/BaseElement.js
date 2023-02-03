'use strict';

import {kebabToCamelCase} from "./utils";

export class BaseElement {
    #baseElement = null;

    constructor(tag = 'div') {
        this.#baseElement = document.createElement(tag);
    }

    addClass(...value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!value)
            throw new Error('Value is incorrect');

        this.#baseElement.classList.add(...value);

        return this;
    }

    removeClass(...value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!value)
            throw new Error('Value is incorrect');

        this.#baseElement.classList.remove(...value);

        return this;
    }

    toggleClass(className) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!className)
            throw new Error('ClassName is incorrect');

        this.#baseElement.classList.toggle(className);

        return this;
    }

    addAttribute(name, value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!name)
            throw new Error('An incorrect attribute name');
        if (value === undefined || value === '') {
            console.log(value);
            throw new Error('An incorrect value');
        }

        this.#baseElement.setAttribute(name, value);

        return this;
    }

    deleteAttribute(name) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!name)
            throw new Error('An incorrect attribute name');

        this.#baseElement.removeAttribute(name);

        return this;
    }

    addStyle(style, value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!style)
            throw new Error('An incorrect style name');
        if (value === undefined || value === '')
            throw new Error('An incorrect value');

        this.#baseElement.style[kebabToCamelCase(style)] = value;

        return this;
    }

    removeStyle(style) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!style)
            throw new Error('An incorrect style name');

        this.#baseElement.style.removeProperty(style);

        return this;
    }

    event(eventType, listenerFunction, options = {}) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!listenerFunction)
            throw new Error('An incorrect event listener function');

        this.#baseElement.addEventListener(eventType, listenerFunction, options);

        return this;
    }

    innerHtml(value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');

        this.#baseElement.innerHTML = value;

        return this;
    }

    addInnerHtml(value) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (value === undefined)
            throw new Error('An incorrect value');

        this.#baseElement.innerHTML += value;

        return this;
    }

    appendTo(parentElement, position = null) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!parentElement)
            throw new Error('A parent element is wrong or not set');

        if (!position && parentElement) {
            parentElement.append(this.#baseElement);
        } else if (position && parentElement) {
            parentElement.insertAdjacentElement(position, this.#baseElement);
        }

        return this;
    }

    appendElement(domElement) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!domElement)
            throw new Error('A child element is wrong or not set');

        this.#baseElement.append(domElement);

        return this;
    }

    prependElement(domElement) {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');
        if (!domElement)
            throw new Error('A child element is wrong or not set');

        this.#baseElement.prepend(domElement);

        return this;
    }

    remove() {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');

        this.#baseElement.remove();
        this.#baseElement = null;
    }

    get DOMElement() {
        if (!this.#baseElement)
            throw new Error('The BaseElement is absent');

        return this.#baseElement;
    }
}