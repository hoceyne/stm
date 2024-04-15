import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ClientSideBar from "./Components/ClientSideBar.js";

import Footer from "../../Components/FooterComponent";
import WelcomeBanner from "../../Components/WelcomeBanner";

function ClientMainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Laptop",
      price: 1200.0,
      qte_total: 50,
      purchase_date: "2023-01-15",
    },
    {
      id: 2,
      title: "Smartphone",
      price: 699.99,
      qte_total: 100,
      purchase_date: "2023-02-08",
    },
    {
      id: 3,
      title: "Headphones",
      price: 99.95,
      qte_total: 200,
      purchase_date: "2023-03-20",
    },
    {
      id: 4,
      title: "Camera",
      price: 799.5,
      qte_total: 30,
      purchase_date: "2023-04-05",
    },
    {
      id: 5,
      title: "Smartwatch",
      price: 149.99,
      qte_total: 80,
      purchase_date: "2023-05-12",
    },
    {
      id: 6,
      title: "Laptop",
      price: 1200.0,
      qte_total: 50,
      purchase_date: "2023-01-15",
    },
    {
      id: 7,
      title: "Smartphone",
      price: 699.99,
      qte_total: 100,
      purchase_date: "2023-02-08",
    },
    {
      id: 8,
      title: "Headphones",
      price: 99.95,
      qte_total: 200,
      purchase_date: "2023-03-20",
    },
    {
      id: 9,
      title: "Camera",
      price: 799.5,
      qte_total: 30,
      purchase_date: "2023-04-05",
    },
    {
      id: 10,
      title: "Smartwatch",
      price: 149.99,
      qte_total: 80,
      purchase_date: "2023-05-12",
    },
    {
      id: 11,
      title: "Laptop",
      price: 1200.0,
      qte_total: 50,
      purchase_date: "2023-01-15",
    },
    {
      id: 12,
      title: "Smartphone",
      price: 699.99,
      qte_total: 100,
      purchase_date: "2023-02-08",
    },
    {
      id: 13,
      title: "Headphones",
      price: 99.95,
      qte_total: 200,
      purchase_date: "2023-03-20",
    },
    {
      id: 14,
      title: "Camera",
      price: 799.5,
      qte_total: 30,
      purchase_date: "2023-04-05",
    },
    {
      id: 15,
      title: "Smartwatch",
      price: 149.99,
      qte_total: 80,
      purchase_date: "2023-05-12",
    },
  ]);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ClientSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>
            <WelcomeBanner />
            {/* Products */}
            {products && (
              <div className="flex md:flex-col lg:flex-row  mt-3 w-full flex-wrap">
                {products.map((product, index) => (
                  <div key={index} className="w-48 h-64 shadow-lg shadow-indigo-50 m-4">
                    <div className="flex flex-col justify-center p-3">
                      <div className="flex overflow-hidden hover:cursor-pointer justify-center h-1/2">
                        <img
                          className="w-full rounded-md"
                          src={require("../../assets/images/sport.jpg")}
                          alt="Sport"
                        />
                      </div>
                      {/* Render additional product details if needed */}
                      <div>
                      <p className="text-black font-semibold text-lg mb-2">{product.title}</p>
                      </div>
                      <div>{product.price}</div>
                      {/* Add more product details as needed */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default ClientMainPage;
