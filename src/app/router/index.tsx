import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SignInPage from "@/pages/signin/page";
import ProfilePage from "@/pages/profile/page";

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
            element: (
              <div className="">
                <h1>Dashboard</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </div>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
