import { api } from "@/shared/config/api";
import { AxiosError } from "axios";

type SignInValues = {
    email: string;
    password: string;
}

type SignInResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    }
}

export const signInService = async (values: SignInValues): Promise<SignInResponse> => {
    try {
        const response = await api.post("/auth/login", values);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data.message;
        }
        throw error;
    }
}
