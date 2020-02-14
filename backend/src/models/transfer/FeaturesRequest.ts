import RequestOptions from "./RequestOptions";


export default class FeaturesRequest {
    constructor(
        public environmentId: string,
        public options?: RequestOptions
    ){}
}