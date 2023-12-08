import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/HomePage";
import { LogIn } from "./pages/LoginPage";
import { SignUp } from "./pages/SignupPage";
import { Inventory } from "./pages/InventoryPage";
import { SingleItem } from "./pages/SingleItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },  
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/inventory/all_items",
        element: <Inventory />,
      },
      {
        path: "/inventory/:id/", //dynamic param
        element: <SingleItem />,
      },
    ],
  },
]);

export default router;