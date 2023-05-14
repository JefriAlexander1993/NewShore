import { Flight } from "../models/Flight";

export interface ITransport {
    flightCarrier: string;
    flightNumber: string;
}