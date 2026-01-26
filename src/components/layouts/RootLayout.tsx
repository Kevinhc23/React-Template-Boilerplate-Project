import { Outlet } from "react-router";
import { AppProviders } from "@/app/providers/AppProviders";

export const RootLayout = () => {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
};
