import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/HomePage";
import { Inventory } from "./pages/InventoryPage";
import { SingleItem } from "./pages/SingleItemPage";
import { CreateItem } from "./pages/CreateItemPage";

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
        path: "/inventory/all_items",
        element: <Inventory />,
      },
      {
        path: "/inventory/:id/", //dynamic param
        element: <SingleItem />,
      },
      {
        path: "/inventory/create",
        element: <CreateItem />
      }
    ],
  },
]);

export default router;