import { createBrowserRouter } from "react-router";
import { AdminPage } from "./pages/AdminPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { TemporaryPage } from "./pages/temporary/TemporaryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TemporaryPage,
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
]);
