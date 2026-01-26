import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
    ],
  },
]);
