import { redirect } from "react-router";
import { msalInstance } from "@/app/providers/AppProviders";

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
    const activeAccount = msalInstance.getActiveAccount();
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account: activeAccount!,
      scopes: ["User.Read"],
    });
    return tokenResponse.accessToken;
  } catch (error) {
    throw redirect("/signin");
  }
};
