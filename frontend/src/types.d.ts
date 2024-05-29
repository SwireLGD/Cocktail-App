export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string | null;
    token: string;
    role: string;
}

export interface RegisterMutation {
    email: string;
    displayName: string;
    password: string;
    avatar: string | null;
}

export interface RegisterResponse {
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}