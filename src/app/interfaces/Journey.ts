import { Flight } from "../models/Flight";

export interface IJourney {
    origin: string;
    destination: string;
    price: number;
    flights: Flight[];
}