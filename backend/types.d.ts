export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID?: string;
    avatar?: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface CocktailMutation {
    title: string;
    image: string | null;
    recipe: string;
    isPublished: boolean;
    user: ObjectId;
    ingredients: Ingredient[];
}
  
interface Ingredient {
    name: string;
    amount: string;
}