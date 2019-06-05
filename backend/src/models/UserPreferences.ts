import {prop, Typegoose} from "typegoose";

export default class UserPreferences extends Typegoose{
    @prop()
    darkMode?: boolean;
}