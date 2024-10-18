export interface UserAuth {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserAuthCheck {
    email: string;
    password: string;
}