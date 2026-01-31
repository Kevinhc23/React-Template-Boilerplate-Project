import axios from "axios";
import { API_BASE_URL, APP_ENV, APP_NAME } from "@/shared/config/const";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-Client-Version": "1.0.0",
        "X-Client-Type": "web",
        "X-Client-Source": APP_ENV,
        "X-Client-Name": APP_NAME,
    },
});
