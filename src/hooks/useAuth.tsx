import { redirect } from "react-router";
import { msalInstance } from "@/app/providers/AppProviders";

export const authLoader = async () => {
  console.log("[AuthLoader] Checking authentication status...");
  const activeAccount = msalInstance.getActiveAccount();
  console.log("[AuthLoader] Active Account:", activeAccount);

  if (!activeAccount) {
    const accounts = msalInstance.getAllAccounts();
    console.log("[AuthLoader] No active account. Accounts in cache:", accounts);
    if (accounts.length > 0) {
      console.log(
        "[AuthLoader] Setting active account from cache:",
        accounts[0].username,
      );
      msalInstance.setActiveAccount(accounts[0]);
    } else {
      console.warn(
        "[AuthLoader] No active account and no accounts in cache. Redirecting to /signin",
      );
      throw redirect("/signin");
    }
  }

  try {
    const activeAccount = msalInstance.getActiveAccount();
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account: activeAccount!,
      scopes: ["User.Read"],
    });
    console.log("[AuthLoader] Token acquired successfully");
    return tokenResponse.accessToken;
  } catch (error) {
    console.error("[AuthLoader] Silent token acquisition failed:", error);
    throw redirect("/signin");
  }
};
