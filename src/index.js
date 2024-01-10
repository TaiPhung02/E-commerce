import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from "./Components/Layout/Layout";
import Login from "./Components/Home/Login";
import PrivateRouter from "./Components/Home/PrivateRouter";
import Home from "./Components/Home/Home";
import Categories from "./Components/Home/Categories";
import Cart from "./Components/Home/Cart";
import ProductDetail from "./Components/Home/ProductDetail";
import Checkout from "./Components/Home/CheckOut";
import AddPayment from "./Components/Home/AddPayment";
import AddAddress from "./Components/Home/AddAddress";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cartSlice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRouter>
                        <Home></Home>
                    </PrivateRouter>
                ),
            },
            {
                path: "/categories/:slug",
                element: (
                    <PrivateRouter>
                        <Categories></Categories>
                    </PrivateRouter>
                ),
            },
            {
                path: "/cart",
                element: (
                    <PrivateRouter>
                        <Cart></Cart>
                    </PrivateRouter>
                ),
            },
            {
                path: "/checkout",
                element: (
                    <PrivateRouter>
                        <Checkout></Checkout>
                    </PrivateRouter>
                ),
            },
            {
                path: "/payments",
                element: (
                    <PrivateRouter>
                        <AddPayment></AddPayment>
                    </PrivateRouter>
                ),
            },
            {
                path: "/addresses",
                element: (
                    <PrivateRouter>
                        <AddAddress></AddAddress>
                    </PrivateRouter>
                ),
            },
            {
                path: "/product/:slug",
                element: (
                    <PrivateRouter>
                        <ProductDetail></ProductDetail>
                    </PrivateRouter>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
]);

const store = configureStore({
    reducer: {
        allCart: cartReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>

            <ToastContainer />
        </Provider>
    </React.StrictMode>
);
