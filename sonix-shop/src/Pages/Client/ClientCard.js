import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ClientSideBar from "./Components/ClientSideBar.js";

import Footer from "../../Components/FooterComponent";
import WelcomeBanner from "../../Components/WelcomeBanner";

function ClientCard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
            <h3>Card</h3>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default ClientCard;
