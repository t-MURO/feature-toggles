import FeatureToggle from '../domain/FeatureToggle';
import { getModelForClass } from "@typegoose/typegoose";

const FeatureModel = getModelForClass(FeatureToggle);
export default FeatureModel;