import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard</div>,
          },
        ],
      },
    ],
  },
]);
