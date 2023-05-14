import { ITransport } from "../interfaces/Transport";

export class Transport implements ITransport{
    flightCarrier: string;
    flightNumber: string;

    constructor(flightCarrier: string, flightNumber: string) {
        this.flightCarrier = flightCarrier;
        this.flightNumber = flightNumber;

    }
}
