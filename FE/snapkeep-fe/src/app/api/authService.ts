import api from "../lib/api";

export interface Login {
    email: string;
    password: string;
};
export interface Register {
    name: string;
    email: string;
    password: string;
};

export const loginService = (user: Login) => {
    return api.post("/auth/login", user);
}
export const registerService = (user: Register) => {
    return api.post("/auth/register", user);

}