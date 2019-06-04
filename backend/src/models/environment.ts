export default class Environment {

    constructor(
        public name:string,
        public identifier: string,
        public features: string[],
        public description: string,
        public _id?: string,
        public __v?: string,
    ){}
}