import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/shared/config/auth";

/**
 * Singleton MSAL PublicClientApplication instance.
 *
 * This is the ONLY place where the MSAL instance is created.
 * All other files should import from here when they need the raw instance
 * (e.g., for the MsalProvider or the bootstrap function in main.tsx).
 *
 * For component-level usage, prefer the `useMsalAuth` hook instead.
 */
export const msalInstance = new PublicClientApplication(msalConfig);
