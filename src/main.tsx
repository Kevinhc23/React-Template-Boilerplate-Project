import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "@/app/router";
import "@/index.css";
import { msalInstance } from "@/lib/msalInstance";

async function bootstrap() {
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();

  if (response?.account) {
    msalInstance.setActiveAccount(response.account);
  } else {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }

  const root = createRoot(document.getElementById("root")!);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

bootstrap();
