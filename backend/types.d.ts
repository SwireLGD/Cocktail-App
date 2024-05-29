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