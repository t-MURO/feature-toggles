import RequestOptions from "./RequestOptions";


export default class FeatureRequest {
    constructor(
        public environmentId: string,
        public options?: RequestOptions
    ){}
}