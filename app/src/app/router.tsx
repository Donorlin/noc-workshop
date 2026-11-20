import { createBrowserRouter } from "react-router";
import { features } from "@/features";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [...features.flatMap((feature) => feature.routes), { path: "*", element: <NotFoundPage /> }],
  },
]);
