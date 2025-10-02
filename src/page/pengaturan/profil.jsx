import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Building, User, Save, Edit2, X } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        nama: 'PT Humma Teknologi Indonesia',
        email: 'hummatech.id@gmail.com',
        noTelp: '085176777785',
        alamat: 'Perum Permata Regency 1, Blk. 10 No.28, Perun Gpa, Ngijo, Karangploso, Malang, Jawa Timur, Indonesia',
        headline: 'PT Humma Teknologi Indonesia',
        subheadline: 'Perusahaan terbaik se jawa timur',
        tentang: 'Hummatech adalah perusahaan IT solution terbaik se jawa timur',
        foto: './images/logo/mobilelogo.png'
    });

    const [tempData, setTempData] = useState({ ...profileData });

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEdit = () => {
        setTempData({ ...profileData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTempData({ ...profileData });
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!tempData.nama.trim()) {
            alert('Silakan masukkan nama perusahaan');
            return;
        }
        if (!tempData.email.trim()) {
            alert('Silakan masukkan email');
            return;
        }
        if (!tempData.noTelp.trim()) {
            alert('Silakan masukkan nomor telepon');
            return;
        }

        setProfileData({ ...tempData });
        setIsEditing(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData(prev => ({
                    ...prev,
                    foto: reader.result
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
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Profil Perusahaan</h1>
                        <p className="text-slate-200 text-base md:text-lg">Kelola informasi profil perusahaan Anda</p>
                    </div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={isEditing ? tempData.foto : profileData.foto}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-slate-100"
                                    />
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-slate-700 text-white p-2 rounded-full cursor-pointer hover:bg-slate-800 transition-colors duration-200">
                                            <Camera className="h-4 w-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">
                                    {profileData.nama}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {profileData.email}
                                </p>
                                
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Edit Profil
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                        >
                                            <X className="h-4 w-4" />
                                            Batal
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Save className="h-4 w-4" />
                                            Simpan
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-3 text-slate-600" />
                                    <span className="break-all">{profileData.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-4 w-4 mr-3 text-slate-600" />
                                    <span>{profileData.noTelp}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-3 text-slate-600 flex-shrink-0" />
                                    <span>{profileData.alamat}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Perusahaan</h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Perusahaan
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.nama}
                                                onChange={(e) => handleInputChange('nama', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                                                <Building className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="text-gray-700">{profileData.nama}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={tempData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="text-gray-700 break-all">{profileData.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. Telepon
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.noTelp}
                                                onChange={(e) => handleInputChange('noTelp', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="text-gray-700">{profileData.noTelp}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.alamat}
                                                onChange={(e) => handleInputChange('alamat', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700">{profileData.alamat}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Headline <span className="text-red-500 text-xs">*Wajib Diisi</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempData.headline}
                                            onChange={(e) => handleInputChange('headline', e.target.value)}
                                            placeholder="PT Humma Teknologi Indonesia"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                    ) : (
                                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{profileData.headline}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subheadline <span className="text-red-500 text-xs">*Wajib Diisi</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempData.subheadline}
                                            onChange={(e) => handleInputChange('subheadline', e.target.value)}
                                            placeholder="Perusahaan terbaik se jawa timur"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                    ) : (
                                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{profileData.subheadline}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tentang <span className="text-red-500 text-xs">*Wajib Diisi</span>
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={tempData.tentang}
                                            onChange={(e) => handleInputChange('tentang', e.target.value)}
                                            rows={4}
                                            placeholder="Hummatech adalah perusahaan IT solution terbaik se jawa timur"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                    ) : (
                                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 whitespace-pre-wrap">{profileData.tentang}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;