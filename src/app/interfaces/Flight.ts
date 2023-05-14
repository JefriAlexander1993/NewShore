import { Transport } from "../models/Transport";

export interface IFlight {
    transport: Transport;
    origin: string;
    destination: string;
    price: number;
}