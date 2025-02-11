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
import BooksByCategory from "../pages/BooksByCategory";
import BookDetails from "../pages/BookDetails";
import BorrowedBooks from "../pages/BorrowedBooks";
import About from "../pages/About";

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
                element:<PrivateRoute adminOnly={true}><AddBook/></PrivateRoute>
            },
            {
                path: "/all-books",
                element:<AllBooks/>
            },
            {
                path: "/about",
                element:<About/>
            },
            {
                path: 'update-book/:bookId',
                element: <PrivateRoute><UpdateBook/></PrivateRoute>,
            },
            {
                path: '/borrowed-books',
                element: <PrivateRoute><BorrowedBooks/></PrivateRoute>,
            },
            {
                path: 'categories/:category',
                element: <BooksByCategory/>,
            },
            {
                path: 'books/:id',
                element: <BookDetails/>,
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