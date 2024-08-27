import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./routes/home";
import Watchlist from "./routes/watchlist";
import Favorite from "./routes/favorite";
import Detail from "./routes/detail";
import Search from "./routes/search";
import { WatchlistProvider } from "./context/LocalStorageContext";

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
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
  </StrictMode>
);
