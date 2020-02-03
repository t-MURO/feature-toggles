import { RequestOptions } from "https";

export default class FeaturesRequest {
    constructor(
        public environmentId: string,
        public options?: RequestOptions 
    ){}
}