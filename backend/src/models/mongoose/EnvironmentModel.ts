import { getModelForClass } from "@typegoose/typegoose";
import Environment from '../domain/Environment';

const EnvironmentModel = getModelForClass(Environment);

export default EnvironmentModel;