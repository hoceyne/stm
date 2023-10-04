import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./index.css";
import Error404 from "./Errors/Error404";
import Error500 from "./Errors/Error500";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Auth/Login";
import Products from "./Pages/Management/Products";
import Orders from "./Pages/Management/Orders";
import PasswordRecover from "./Pages/Auth/PasswordRecover";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/forgot.password" exact element={<PasswordRecover />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/products" exact element={<Products />} />

            <Route path="/404" exact element={<Error404 />} />
            <Route path="/500" exact element={<Error500 />} />

            <Route path="/*"  element={<Error404 />} />
        </Routes>
    </BrowserRouter>
);
