import React from 'react';
import { 
    Users, 
    ShoppingBag, 
    Package, 
    FileText, 
    TrendingUp,
    TrendingDown,
    Layers,
    BarChart3
} from 'lucide-react';

const Dashboard = () => {
  // data untuk chart
    const salesData = [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 45 },
        { month: 'Mar', value: 75 },
        { month: 'Apr', value: 55 },
        { month: 'May', value: 85 },
        { month: 'Jun', value: 60 },
        { month: 'Jul', value: 80 },
        { month: 'Aug', value: 90 },
        { month: 'Sep', value: 70 },
        { month: 'Oct', value: 85 },
        { month: 'Nov', value: 75 },
        { month: 'Dec', value: 65 }
    ];

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, bgColor }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
                <div className="flex items-center mt-2">
                {trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trendValue}
                </span>
                </div>
            )}
            </div>
            <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
            </div>
        </div>
        </div>
    );

    const ChartBar = ({ month, value, maxValue }) => (
        <div className="flex flex-col items-center space-y-2">
        <div className="w-8 bg-gray-100 rounded-t-sm relative" style={{ height: '120px' }}>
            <div 
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-sm absolute bottom-0 w-full transition-all duration-500 hover:from-slate-700 hover:to-slate-800"
            style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
            {value}
            </div>
        </div>
        <span className="text-xs text-gray-600 font-medium">{month}</span>
        </div>
    );

    const maxValue = Math.max(...salesData.map(d => d.value));

    return (
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-start justify-between">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello, Irfan Daffa'</h1>
                    <p className="text-slate-200 text-base md:text-lg mb-4">Selamat datang kembali! Ayo mulai dari akhir kali.</p>
                    <button className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base">
                    View Profile
                    </button>
                </div>
                <div className="hidden lg:flex items-center justify-center ml-10 mt-4">
                    <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                    <img 
                        src="/images/logo/mobilelogo.png" 
                        alt="Logo" 
                        className="h-30 w-30 object-contain opacity-80" 
                    />
                    </div>
                </div>
                </div>
            </div>
            {/* Background belakang*/}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
                title="Layanan" 
                value="8" 
                icon={Users}
                color="text-orange-600"
                bgColor="bg-orange-50"
            />
            <StatCard 
                title="Mitra" 
                value="15" 
                icon={ShoppingBag}
                color="text-green-600"
                bgColor="bg-green-50"
            />
            <StatCard 
                title="Produk" 
                value="6" 
                icon={Package}
                color="text-red-600"
                bgColor="bg-red-50"
            />
            <StatCard 
                title="Berita" 
                value="8" 
                icon={FileText}
                color="text-blue-600"
                bgColor="bg-blue-50"
            />
            </div>

            {/* Sales Overview Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sales Overview</h2>
                <p className="text-gray-600">Ringkasan penjualan bulanan</p>
                </div>
                <div className="flex items-center space-x-2">
                <select
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 
                            shadow-sm hover:border-slate-500 hover:shadow-md 
                            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500
                            transition-all duration-200 cursor-pointer"
                >
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Tahun Ini</option>
                </select>

                </div>
            </div>

            {/* Chart */}
            <div className="relative">
                <div className="flex items-end justify-between space-x-2 px-4">
                {salesData.map((data, index) => (
                    <ChartBar 
                    key={index}
                    month={data.month}
                    value={data.value}
                    maxValue={maxValue}
                    />
                ))}
                </div>
                
                {/* Chart grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[100, 80, 60, 40, 20, 0].map((value) => (
                    <div key={value} className="border-t border-gray-100" />
                ))}
                </div>
            </div>

            {/* Chart legend */}
            <div className="flex items-center justify-center mt-6 space-x-8">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-800 rounded-full" />
                    <span className="text-sm text-gray-600">Sales Volume</span>
                </div>
                <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Monthly Data</span>
                </div>
            </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                    <Layers className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Kelola Layanan</h3>
                    <p className="text-sm text-gray-600">Tambah atau edit daftar layanan</p>
                </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                    <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Katalog Produk</h3>
                    <p className="text-sm text-gray-600">Perbarui informasi produk</p>
                </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                    <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Laporan</h3>
                    <p className="text-sm text-gray-600">Lihat analitik secara detail</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;