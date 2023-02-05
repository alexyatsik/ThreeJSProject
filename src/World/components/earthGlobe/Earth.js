import {Globe} from "./Globe";
import {Atmosphere} from "./Atmosphere";
import {Group} from "three";
import gsap from "gsap";
import {Point} from "./Point";
import countriesData from '../../../assets/json/countries.json';

export class Earth {
    #globe
    #atmosphere
    #earthGroup = new Group();
    #radius
    #points = new Group();
    constructor(radius) {
        this.#radius = radius;
        this.#globe = new Globe(this.#radius);
        this.#atmosphere = new Atmosphere(this.#radius);
        this.#points.name = "Countries points";
        this.#earthGroup.name = "Earth Group";
        this.#earthGroup.add(
            this.#globe.mesh,
            this.#atmosphere.mesh
        );

        this.#addCountriesPointsToTheGroup();
    }

    get group() {
        return this.#earthGroup;
    }

    tick(delta) {
        // gsap.to(this.#earthGroup.rotation, {
        //     x: -this.#mouse.y * 100 * delta,
        //     y: this.#mouse.x * 200 * delta,
        //     duration: 2
        // });
        this.#earthGroup.rotation.y += 0.1 * delta;
    }

    #addCountriesPointsToTheGroup() {
        const pointOptions = {
            radius: this.#radius,
            lookAtPoint: this.#globe.mesh.position
        }

        countriesData.forEach((country) => {
            this.#points.add(
                new Point(
                    country.latlng[0],
                    country.latlng[1],
                    pointOptions,
                    {
                        countryName: country.name.common,
                        countryPopulation: country.population
                    })
                    .mesh
            )
        });

        // this.#points.add(
            // new Point(
            //     48.3794,
            //     31.1656,
            //     pointOptions,
            //     {
            //         countryName: 'Ukraine',
            //         countryPopulation: '43.79 million'
            //     })
            //     .mesh,
            // new Point(
            //     -14.2350,
            //     -51.9253,
            //     pointOptions,
            //     {
            //         countryName: 'Brazil',
            //         countryPopulation: '214.3 million'
            //     })
            //     .mesh,
            // new Point(
            //     37.0902,
            //     -95.7129,
            //     pointOptions,
            //     {
            //         countryName: 'USA',
            //         countryPopulation: '331.9 million'
            //     })
            //     .mesh,
            // new Point(
            //     35.8617,
            //     104.1954,
            //     pointOptions,
            //     {
            //         countryName: 'China',
            //         countryPopulation: '1.412 billion'
            //     })
            //     .mesh,
        // );

        this.#earthGroup.add(this.#points);
    }
}