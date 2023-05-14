import { IJourney } from "../interfaces/Journey";
import { Flight } from "./Flight";

export class Journey implements IJourney{
    origin: string;
    destination: string;
    price: number;
    flights: Flight[];

    constructor(origin: string, destination: string, price: number,flights: Flight[]) {
        this.flights = flights;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }
}
