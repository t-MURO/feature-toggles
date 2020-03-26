import Feature from '../domain/Feature';
import { getModelForClass } from "@typegoose/typegoose";

const FeatureModel = getModelForClass(Feature);
export default FeatureModel;