// MainLayout
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    return (
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
          <Navbar isSidebarOpen={isSidebarOpen} />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  export default MainLayout;