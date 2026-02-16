import { type Configuration, type CacheOptions, LogLevel } from "@azure/msal-browser";
import { APP_CLIENT_ID, APP_NAME, APP_VERSION, APP_TENANT_ID } from "@/shared/config/const";

export const msalConfig: Configuration = {
    auth: {
        clientId: APP_CLIENT_ID,
        authority: "https://login.microsoftonline.com/" + APP_TENANT_ID,
        redirectUri: window.location.origin + "/dashboard",
        postLogoutRedirectUri: `${window.location.origin}/signin`,

    },
    cache: {
        cacheLocation: "sessionStorage",
        cacheRetentionDays: 1,
    } satisfies CacheOptions,
    system: {
        allowRedirectInIframe: false,
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error("[MSAL]", message);
                        return;
                    case LogLevel.Info:
                        console.info("[MSAL]", message);
                        return;
                    case LogLevel.Verbose:
                        console.debug("[MSAL]", message);
                        return;
                    case LogLevel.Warning:
                        console.warn("[MSAL]", message);
                        return;
                    default:
                        console.log("[MSAL]", message);
                        return;
                }
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Verbose,
        },
    },
    telemetry: {
        application: {
            appName: APP_NAME,
            appVersion: APP_VERSION,
        },
    },
};

export const loginRequest = {
    scopes: ["User.Read", "User.ReadWrite", "User.ReadBasic.All"],
};
