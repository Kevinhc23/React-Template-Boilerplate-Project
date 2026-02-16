import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "@/shared/config/auth";
import { useCallback } from "react";

/**
 * Central MSAL authentication hook.
 *
 * All components should use this hook instead of calling `useMsal()`,
 * `useIsAuthenticated()`, or importing `msalInstance` directly.
 *
 * If you need to change scopes, redirect URIs, or any auth behavior,
 * modify this single file.
 */
export const useMsalAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const activeAccount = instance.getActiveAccount() ?? accounts[0] ?? null;

  /**
   * Trigger a login redirect with preconfigured scopes.
   */
  const login = useCallback(async () => {
    await instance.loginRedirect({
      scopes: loginRequest.scopes,
      redirectUri: window.location.origin,
      prompt: "select_account",
    });
  }, [instance]);

  /**
   * Trigger a logout redirect.
   */
  const logout = useCallback(async () => {
    await instance.logoutRedirect();
  }, [instance]);

  /**
   * Acquire an access token silently using the active account.
   * Returns the access token string.
   */
  const getAccessToken = useCallback(
    async (scopes: string[] = loginRequest.scopes): Promise<string> => {
      const account = instance.getActiveAccount() ?? accounts[0];
      if (!account) {
        throw new Error("No active account found. User must sign in first.");
      }

      const response = await instance.acquireTokenSilent({
        scopes,
        account,
      });

      return response.accessToken;
    },
    [instance, accounts],
  );

  /**
   * Set the first available account as active if none is set.
   */
  const ensureActiveAccount = useCallback(() => {
    if (!instance.getActiveAccount() && accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [instance, accounts]);

  return {
    /** The underlying MSAL PublicClientApplication instance (escape hatch). */
    instance,
    /** All signed-in accounts. */
    accounts,
    /** The currently active account, or the first available, or null. */
    activeAccount,
    /** Whether any MSAL operation is in progress (login, logout, token, etc.). */
    inProgress,
    /** Whether the user is currently authenticated. */
    isAuthenticated,
    /** Trigger a login redirect. */
    login,
    /** Trigger a logout redirect. */
    logout,
    /** Acquire an access token silently. */
    getAccessToken,
    /** Ensure an active account is set. */
    ensureActiveAccount,
  };
};
