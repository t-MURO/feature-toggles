import RequestOptions from "./RequestOptions";


export default class FeatureRequest {
    constructor(
        public identifier: string,
        public options?: RequestOptions
    ){}
}