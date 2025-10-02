import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { 
    Home, Briefcase, Settings, List, Plus, Eye, Package, 
    Handshake, Newspaper, MessageCircle, MapPin, Phone, 
    GraduationCap, Building2, Network, ClipboardList, 
    Target, HelpCircle, Users, Image, Layers, ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed }) => {
    const [expandedMenus, setExpandedMenus] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Inject custom scrollbar styles
    useEffect(() => {
        const scrollbarStyles = `
            .sidebar-nav-scroll::-webkit-scrollbar {
                width: 6px;
            }
            .sidebar-nav-scroll::-webkit-scrollbar-track {
                background: #1e293b;
                border-radius: 3px;
            }
            .sidebar-nav-scroll::-webkit-scrollbar-thumb {
                background: #475569;
                border-radius: 3px;
            }
            .sidebar-nav-scroll::-webkit-scrollbar-thumb:hover {
                background: #64748b;
            }
            /* Firefox scrollbar */
            .sidebar-nav-scroll {
                scrollbar-width: thin;
                scrollbar-color: #475569 #1e293b;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = scrollbarStyles;
        document.head.appendChild(styleElement);
        
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/', hasSubmenu: false },
    { name: 'Hero Section', icon: Layers, path: '/hero-section', hasSubmenu: false },
    {
        name: 'Layanan', icon: Briefcase, path: '/layanan', hasSubmenu: true,
        submenu: [
            { name: 'Layanan', path: '/layanan', icon: List },
            { name: 'Penjualan', path: '/penjualan', icon: Plus },
            { name: 'Galeri', path: '/galeri', icon: Image }
        ]
    },
    { name: 'Produk', icon: Package, path: '/produk', hasSubmenu: false },
    {
        name: 'Mitra', icon: Handshake, path: '/mitra', hasSubmenu: true,
        submenu: [
            { name: 'Mitra', path: '/mitra', icon: List },
            { name: 'Kategori', path: '/mitra-kategori', icon: Layers },
        ]
    },
    {
        name: 'Berita', icon: Newspaper, path: '/berita', hasSubmenu: true,
        submenu: [
            { name: 'Berita', path: '/berita', icon: List },
            { name: 'Kategori', path: '/berita-kategori', icon: Layers },
        ]
    },
    { name: 'Testimoni', icon: MessageCircle, path: '/testimoni', hasSubmenu: false },
    { name: 'Cabang', icon: MapPin, path: '/cabang', hasSubmenu: false },
    {
        name: 'Pengaturan', icon: Settings, path: '/pengaturan', hasSubmenu: true,
        submenu: [
            { name: 'Profil', path: '/pengaturan-profil', icon: Building2 },
            { name: 'Filosofi Logo', path: '/pengaturan-filosofilogo', icon: Eye },
            { name: 'Visi & Misi', path: '/pengaturan-visimisi', icon: Target },
            { name: 'Syarat & Ketentuan', path: '/pengaturan-syaratketentuan', icon: ClipboardList },
            { name: 'FAQ', path: '/pengaturan-faq', icon: HelpCircle },
            { name: 'Jabatan', path: '/pengaturan-jabatan', icon: Users },
            { name: 'Struktur', path: '/pengaturan-struktur', icon: Network },
            { name: 'Prosedur', path: '/pengaturan-prosedur', icon: ClipboardList }
        ]
    },
    { name: 'Kontak', icon: Phone, path: '/kontak', hasSubmenu: false },
    {
        name: 'Alumni', icon: GraduationCap, path: '/alumni', hasSubmenu: true,
        submenu: [
            { name: 'Angkatan', path: '/angkatan', icon: List },
            { name: 'Galeri Alumni', path: '/galerialumni', icon: Image },
        ]
    },
    {
        name: 'Lowongan', icon: Briefcase, path: '/lowongan', hasSubmenu: true,
        submenu: [
            { name: 'Lowongan', path: '/lowongan', icon: List },
            { name: 'Alur Kerja', path: '/lowongan-alurkerja', icon: ClipboardList },
        ]
    },
];

    // Flatten submenu items for collapsed sidebar
    const flattenedItems = [];
    menuItems.forEach(item => {
        if (item.hasSubmenu) {
            item.submenu.forEach(submenuItem => {
                flattenedItems.push({
                    ...submenuItem,
                    parentName: item.name,
                    hasSubmenu: false
                });
            });
        } else {
            flattenedItems.push(item);
        }
    });

    const itemsToShow = isCollapsed ? flattenedItems : menuItems;

    const handleItemClick = (item) => {
        if (!isCollapsed && item.hasSubmenu) {
            setExpandedMenus(prev => ({
                ...prev,
                [item.name]: !prev[item.name]
            }));
        } else {
            navigate(item.path);
        }
    };

    const handleSubmenuClick = (submenuItem) => {
        navigate(submenuItem.path);
    };

    return (
        <div className={`h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Logo */}
            <div className={`p-4 border-b border-slate-700 flex-shrink-0 ${isCollapsed ? 'px-4' : ''}`}>
                <div className="flex items-center gap-3">
                    <img src="/images/logo/mobilelogo.png" alt="Logo Hummatech" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-xl font-bold">
                                <span className="text-cyan-400">Humma</span>
                                <span className="text-white">tech</span>
                            </h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-1 sidebar-nav-scroll">
                <ul className="space-y-1">
                    {itemsToShow.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.path;
                        const isExpanded = expandedMenus[item.name];

                        return (
                            <li key={item.name}>
                                {/* Main Menu Item */}
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-200 group relative ${
                                        isCollapsed ? 'px-4' : ''
                                    } ${
                                        isActive
                                            ? 'bg-slate-700 border-r-4 border-cyan-400 text-cyan-400'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <div className="flex items-center gap-3">
                                        <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`} />
                                        {!isCollapsed && (
                                            <span className={`font-medium ${isActive ? 'text-cyan-400' : 'text-slate-300 group-hover:text-white'}`}>
                                                {item.name}
                                            </span>
                                        )}
                                    </div>
                                    {!isCollapsed && item.hasSubmenu && (
                                        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                            <ChevronRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`} />
                                        </div>
                                    )}
                                </button>

                                {/* Submenu Items */}
                                {!isCollapsed && item.hasSubmenu && (
                                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul className="bg-slate-900 border-l-2 border-slate-600 ml-6">
                                            {item.submenu?.map((submenuItem) => {
                                                const SubmenuIcon = submenuItem.icon;
                                                const isSubmenuActive = location.pathname === submenuItem.path;

                                                return (
                                                    <li key={submenuItem.name}>
                                                        <button
                                                            onClick={() => handleSubmenuClick(submenuItem)}
                                                            className={`w-full flex items-center gap-3 px-6 py-2 text-left transition-all duration-200 group ${
                                                                isSubmenuActive
                                                                    ? 'bg-slate-800 border-r-4 border-cyan-400 text-cyan-400'
                                                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                                            }`}
                                                        >
                                                            <SubmenuIcon className={`w-4 h-4 ${isSubmenuActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'}`} />
                                                            <span className={`text-sm ${isSubmenuActive ? 'text-cyan-400 font-medium' : 'text-slate-400 group-hover:text-white'}`}>
                                                                {submenuItem.name}
                                                            </span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;