import { Outlet } from "react-router";
import { AppProviders } from "@/app/providers/appProviders";

export const RootLayout = () => {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
};
