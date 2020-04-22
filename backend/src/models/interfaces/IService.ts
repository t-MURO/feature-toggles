export default interface IService<T> {

    findOne(id: string):Promise<T|Error>;

    findAll(): Promise<T[]|Error>;

    create(resource: T|T[]): Promise<T|T[]|Error>;

    update(resource: T): Promise<T|Error>;

    delete(id: any): Promise<any>;
}