import { Outlet } from "react-router";
import AppProviders from "@/app/providers/AppProviders";

/**
 * The root layout component that wraps the entire application.
 * It provides the necessary context and providers for the application.
 */
const RootLayout = () => {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
};

export default RootLayout;
