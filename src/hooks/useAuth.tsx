import { redirect } from "react-router";
import { msalInstance } from "@/lib/msalInstance";
import { loginRequest } from "@/shared/config/auth";

/**
 * React Router loader that ensures the user is authenticated.
 *
 * Uses the singleton msalInstance because loaders run outside React's
 * component tree (we can't use hooks here).
 */
export const authLoader = async () => {
  const activeAccount = msalInstance.getActiveAccount();

  if (!activeAccount) {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    } else {
      throw redirect("/signin");
    }
  }

  try {
    const account = msalInstance.getActiveAccount();
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account: account!,
      scopes: loginRequest.scopes,
    });
    return tokenResponse.accessToken;
  } catch (error) {
    throw redirect("/signin");
  }
};
