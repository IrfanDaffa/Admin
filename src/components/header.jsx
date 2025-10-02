import React, { useState } from 'react';

import { 
    Settings, 
    Bell, 
    Search, 
    ChevronDown,
    User,
    LogOut,
    Menu
} from 'lucide-react';

// Header Component
const Header = ({ userName = "Irfan Daffa'", onToggleSidebar, isSidebarOpen }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, message: "Pesan baru dari client", time: "5 menit lalu", unread: true },
        { id: 2, message: "Update sistem berhasil", time: "1 jam lalu", unread: true },
        { id: 3, message: "Backup data selesai", time: "2 jam lalu", unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className={`p-2 bg-white flex items-center justify-between px-6 border-b border-gray-200 fixed top-0 right-0 z-40 transition-all duration-300 ${
        isSidebarOpen ? 'left-64' : 'left-16'
        }`}>
        {/* Left Section - Toggle Button */}
        <button
            className="p-1 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={onToggleSidebar}
        >
            <Menu className="w-5 h-5" />
        </button>

        {/* Right Section - Search, Notifications & Profile */}
        <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
                text-gray-400 group-hover:text-slate-600 transition-colors duration-200" />
            
            <input
                type="text"
                placeholder="Search..."
                className="w-80 pl-10 pr-4 py-2 bg-gray-50 
                border border-gray-600 rounded-lg text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent
                hover:border-slate-700 
                transition-all duration-300 ease-in-out"
            />
            </div>

           {/* Notifications */}
            <div className="relative">
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-all duration-300"
            >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center shadow-md">
                    {unreadCount}
                </span>
                )}
            </button>

            {/* Wrapper untuk animasi */}
            <div
                className={`absolute right-0 mt-3 w-80 z-50 transition-all duration-300 origin-top-right ${
                showNotifications
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
            >
                <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-900">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                    Notifikasi
                    </h3>
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 transition-all duration-200 cursor-pointer ${
                        notification.unread
                            ? "bg-white text-gray-900 hover:bg-gray-100"
                            : "hover:bg-slate-100"
                        }`}
                    >
                        <p className="text-sm mb-1 flex items-center gap-2">
                        {notification.unread && (
                            <span className="w-2 h-2 bg-slate-800 rounded-full inline-block"></span>
                        )}
                        {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100 bg-slate-50">
                    <button className="w-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                    Lihat semua notifikasi →
                    </button>
                </div>
                </div>
            </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
            <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                {/* Foto Profil */}
                <img
                    src="/images/profil.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                />

                {/* Nama User */}
                <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{userName}</p>
                </div>

                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>


            {/* Dropdown dengan animasi */}
            <div
                className={`absolute right-0 mt-2 w-56 z-50 transition-all duration-300 origin-top-right ${
                showProfileDropdown
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
            >
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-gray-100">
                    <p className="font-medium text-white">{userName}</p>
                    <p className="text-sm text-gray-200">admin@hummatech.com</p>
                </div>
                <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User className="w-4 h-4" />
                    Profile Saya
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4" />
                    Pengaturan
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Keluar
                    </button>
                </div>
                </div>
            </div>
            </div>

        </div>

        {(showProfileDropdown || showNotifications) && (
            <div
            className="fixed inset-0 z-30"
            onClick={() => {
                setShowProfileDropdown(false);
                setShowNotifications(false);
            }}
            />
        )}
        </header>
    );
};

export default Header;