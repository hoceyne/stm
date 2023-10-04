import React, { useState } from "react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Products from "./Management/Products";
import Clients from "./Management/Clients";
import Orders from "./Management/Orders";
import Footer from "../Components/FooterComponent";
import WelcomeBanner from "../Components/WelcomeBanner";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />


                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>
                        <WelcomeBanner/>
                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                            {/* Tables */}
                            <Orders />
                            <Products />
                            <Clients />
                        </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Dashboard;
