import { Attraction } from "./attraction.class";

export interface ResponseData {
    records: Attraction[],
    total: number
}
