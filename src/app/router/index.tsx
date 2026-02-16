import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SignInPage from "@/pages/signin/page";
import { lazy } from "react";

const ProfilePage = lazy(() => import("@/pages/profile/page"));
const HomePage = lazy(() => import("@/pages/home/page"));
const NotFoundPage = lazy(() => import("@/pages/not-found/page"));

/**
 * The router configuration for the application.
 * It defines the routes and their corresponding components.
 */
const router = createBrowserRouter([
  {
    // Root layout for all routes
    element: <RootLayout />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        // Dashboard layout for authenticated users
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "projects",
            element: <div>Projects</div>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
