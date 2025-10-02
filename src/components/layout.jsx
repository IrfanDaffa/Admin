import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation(); // ambil path aktif

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-50"> 
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full z-40">
            <Sidebar 
            isCollapsed={!isSidebarOpen}
            activePath={location.pathname} // kirim path aktif
            />
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
            <Header 
            onToggleSidebar={toggleSidebar} 
            isSidebarOpen={isSidebarOpen}
            />
            <main className="pl-6 pr-1 pt-6 mt-10 -ml-5">
            {children}
            </main>
        </div>
        </div>
    );
};

export default Layout;
