import React, { useState } from 'react';
import { Camera, Save, Edit2, X, Image as ImageIcon } from 'lucide-react';

const FilosofiLogo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [filosofiData, setFilosofiData] = useState({
        logo: './images/logo/mobilelogo.png',
        judul: 'Filosofi Logo Hummatech',
        deskripsi: 'Logo Hummatech menggambarkan inovasi dan teknologi yang terus berkembang. Bentuk geometris melambangkan presisi dan profesionalisme, sementara warna biru mencerminkan kepercayaan dan stabilitas. Setiap elemen dalam logo dirancang untuk merepresentasikan komitmen kami dalam memberikan solusi teknologi terbaik.'
    });

    const [tempData, setTempData] = useState({ ...filosofiData });

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEdit = () => {
        setTempData({ ...filosofiData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTempData({ ...filosofiData });
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!tempData.judul.trim()) {
            alert('Silakan masukkan judul filosofi logo');
            return;
        }
        if (!tempData.deskripsi.trim()) {
            alert('Silakan masukkan deskripsi filosofi logo');
            return;
        }
        if (!tempData.logo.trim()) {
            alert('Silakan upload logo');
            return;
        }

        setFilosofiData({ ...tempData });
        setIsEditing(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData(prev => ({
                    ...prev,
                    logo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Filosofi Logo</h1>
                                <p className="text-slate-200 text-base md:text-lg mb-4">
                                    Kelola filosofi logo yang akan ditampilkan di landing page
                                </p>
                                {!isEditing && (
                                    <button 
                                        onClick={handleEdit}
                                        className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                                    >
                                        <Edit2 className="h-5 w-5" />
                                        Edit Filosofi
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Logo Perusahaan</h3>
                            
                            <div className="relative group">
                                <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                    {(isEditing ? tempData.logo : filosofiData.logo) ? (
                                        <img
                                            src={isEditing ? tempData.logo : filosofiData.logo}
                                            alt="Logo"
                                            className="w-full h-full object-contain p-8"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">Belum ada logo</p>
                                        </div>
                                    )}
                                </div>
                                
                                {isEditing && (
                                    <label className="absolute bottom-4 right-4 bg-slate-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors duration-200 flex items-center gap-2 shadow-lg">
                                        <Camera className="h-4 w-4" />
                                        <span className="text-sm font-medium">Upload Logo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-800 font-medium mb-1">Tips:</p>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• Gunakan format PNG untuk logo dengan background transparan</li>
                                    <li>• Resolusi minimal 500x500 pixels</li>
                                    <li>• Ukuran file maksimal 2MB</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Detail Filosofi</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul Filosofi <span className="text-red-500">*</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempData.judul}
                                            onChange={(e) => handleInputChange('judul', e.target.value)}
                                            placeholder="Contoh: Filosofi Logo Hummatech"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                    ) : (
                                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700 font-medium">{filosofiData.judul}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi Filosofi <span className="text-red-500">*</span>
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={tempData.deskripsi}
                                            onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                                            rows={10}
                                            placeholder="Jelaskan makna dan filosofi dari logo perusahaan Anda..."
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                                        />
                                    ) : (
                                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg min-h-[240px]">
                                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                                {filosofiData.deskripsi}
                                            </p>
                                        </div>
                                    )}
                                    {isEditing && (
                                        <p className="mt-2 text-xs text-gray-500">
                                            Jelaskan makna dari bentuk, warna, dan elemen logo dengan detail
                                        </p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                        >
                                            <X className="h-4 w-4" />
                                            Batal
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 bg-slate-700 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Save className="h-4 w-4" />
                                            Simpan
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilosofiLogo;