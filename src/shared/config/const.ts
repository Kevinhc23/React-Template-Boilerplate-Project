const {
    VITE_API_BASE_URL,
    VITE_APP_CLIENT_ID,
    VITE_APP_NAME,
    VITE_APP_ENV,
    VITE_APP_URL,
    VITE_APP_VERSION,
    VITE_APP_TENANT_ID
} = import.meta.env

if (
    !VITE_API_BASE_URL ||
    !VITE_APP_CLIENT_ID ||
    !VITE_APP_NAME ||
    !VITE_APP_ENV ||
    !VITE_APP_URL ||
    !VITE_APP_VERSION ||
    !VITE_APP_TENANT_ID
) {
    throw new Error("Missing environment variables")
}

export const API_BASE_URL: string = VITE_API_BASE_URL
export const APP_CLIENT_ID: string = VITE_APP_CLIENT_ID
export const APP_NAME: string = VITE_APP_NAME
export const APP_ENV: string = VITE_APP_ENV
export const APP_URL: string = VITE_APP_URL
export const APP_VERSION: string = VITE_APP_VERSION
export const APP_TENANT_ID: string = VITE_APP_TENANT_ID

