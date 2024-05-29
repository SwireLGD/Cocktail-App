import { Schema, Types, model } from "mongoose";
import User from "./User";

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
});

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
    title: {
        type: String,
        required: true,
    },
    image: String || null,
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    ingredients: [IngredientSchema],
});

const Cocktail = model('Cocktail', CocktailSchema);

export default Cocktail;