export default class Environment {

    constructor(
        public name:string,
        public identifier: string,
        public toggles: string[],
        public description: string,
        public _id?: string,
        public __v?: string,
    ){}
}