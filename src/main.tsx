import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./routes/home";
import Watchlist from "./routes/watchlist";
import Favorite from "./routes/favorite";
import Detail from "./routes/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/movie/:id",
        element: <Detail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
