import { IFlight } from "../interfaces/Flight";
import { Transport } from "./Transport";

export class Flight implements IFlight {
    origin: string;
    destination: string;
    price: number;
    transport: Transport;

    constructor(origin: string, destination: string, price: number,transport: Transport) {
        this.origin = origin;
        this.destination = destination;
        this.price = price;
        this.transport = transport;
    }
}
