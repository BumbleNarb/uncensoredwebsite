import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPage } from "./pages/AdminPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "category/:categoryName",
        Component: CategoryPage,
      },
      {
        path: "checkout",
        Component: CheckoutPage,
      },
      {
        path: "admin",
        Component: AdminPage,
      },
    ],
  },
]);