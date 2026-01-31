import axios from "axios";
import { API_BASE_URL, APP_ENV, APP_NAME } from "@/shared/config/const";

/**
 * Axios instance for making API requests.
 * 
 * @example
 * import { api } from "@/shared/config/api";
 * 
 * api.get("/users").then((response) => {
 *     console.log(response.data);
 * });
 */
export const api = axios.create({
    baseURL: APP_ENV === "production" ? API_BASE_URL : "/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-Client-Version": "1.0.0",
        "X-Client-Type": "web",
        "X-Client-Source": APP_ENV,
        "X-Client-Name": APP_NAME,
    },
    timeout: 10000,
    withCredentials: true,
});



