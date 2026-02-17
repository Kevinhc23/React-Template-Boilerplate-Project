import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SignInPage from "@/pages/signin/page";
import { lazy } from "react";

const ProfilePage = lazy(() => import("@/pages/profile/page"));
const HomePage = lazy(() => import("@/pages/home/page"));
const NotFoundPage = lazy(() => import("@/pages/not-found/page"));
const ProjectsPage = lazy(() => import("@/pages/projects/page"));

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
            element: <ProjectsPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
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
