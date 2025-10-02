import React, { useState } from 'react';
import { Upload, Edit2, Trash2, X } from 'lucide-react';

const Struktur = () => {
    const [strukturOrganisasi, setStrukturOrganisasi] = useState(null);
    const [strukturUsaha, setStrukturUsaha] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteType, setDeleteType] = useState('');

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Hanya file gambar yang diperbolehkan');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = {
                    url: reader.result,
                    name: file.name,
                    size: file.size
                };
                
                if (type === 'organisasi') {
                    setStrukturOrganisasi(imageData);
                } else {
                    setStrukturUsaha(imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClick = (type) => {
        setDeleteType(type);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (deleteType === 'organisasi') {
            setStrukturOrganisasi(null);
        } else {
            setStrukturUsaha(null);
        }
        setShowDeleteModal(false);
        setDeleteType('');
    };

    const StrukturCard = ({ title, subtitle, data, type }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                    </div>
                    {data && (
                        <div className="flex gap-2">
                            <label className="cursor-pointer p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                <Edit2 className="h-5 w-5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, type)}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={() => handleDeleteClick(type)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                {data ? (
                    <div className="space-y-4">
                        <div className="relative group">
                            <img 
                                src={data.url} 
                                alt={title}
                                className="w-full h-auto rounded-lg border-2 border-gray-200 shadow-md"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm bg-slate-50 rounded-lg p-3">
                            <span className="text-gray-700 font-medium">{data.name}</span>
                            <span className="text-gray-500">{(data.size / 1024).toFixed(2)} KB</span>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-slate-400 transition-colors duration-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Belum ada gambar
                        </h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            Upload gambar {title.toLowerCase()} untuk ditampilkan di landing page
                        </p>
                        <label className="inline-flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200 cursor-pointer">
                            <Upload className="h-5 w-5" />
                            Upload Gambar
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, type)}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Struktur</h1>
                        <p className="text-slate-200 text-base md:text-lg">
                            Upload dan kelola gambar struktur organisasi dan struktur usaha yang ditampilkan di landing page
                        </p>
                    </div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <StrukturCard 
                        title="Struktur Organisasi"
                        subtitle="Gambar yang ditampilkan di halaman Struktur Organisasi"
                        data={strukturOrganisasi}
                        type="organisasi"
                    />
                    
                    <StrukturCard 
                        title="Struktur Usaha"
                        subtitle="Gambar yang ditampilkan di halaman Struktur Usaha"
                        data={strukturUsaha}
                        type="usaha"
                    />
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Konfirmasi Hapus</h2>
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <Trash2 className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Hapus Gambar?
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Apakah Anda yakin ingin menghapus gambar struktur {deleteType === 'organisasi' ? 'organisasi' : 'usaha'} ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Struktur;