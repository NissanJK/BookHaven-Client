import {
    createBrowserRouter,
} from "react-router-dom";
import Error from "../pages/Error";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import UpdateBook from "../pages/UpdateBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/add-book",
                element:<PrivateRoute><AddBook/></PrivateRoute>
            },
            {
                path: "/all-books",
                element:<PrivateRoute><AllBooks/></PrivateRoute>
            },
            {
                path: 'update-book/:bookId',
                element: <PrivateRoute><UpdateBook/></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />
            },
        ]
    },
]);

export default router;