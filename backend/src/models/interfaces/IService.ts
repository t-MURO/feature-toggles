export default interface IService<T> {

    findOne(id: string):Promise<T|Error>;

    findAll(): Promise<T[]|Error>;

    create(resource: T): Promise<T|Error>;

    // createMany(resource: T[]): Promise<T[]|Error>;

    update(resource: T): Promise<T|Error>;

    delete(id: any): Promise<any>;
}