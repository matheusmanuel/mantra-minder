import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import NewMantra from "../components/NewMantra";
import UpdateMantra from "../components/UpdateMantra";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/new",
        element: <NewMantra />
    },
    {
        path: "/update",
        element: <UpdateMantra />
    }
])

export default routes;