import React, { useState, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Globe, X, Image } from 'lucide-react';

const MediaSosial = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        tautan: '',
        logo: '',
    });

    const itemsPerPage = 8;
    const [mediaData, setMediaData] = useState([]);

    const filteredData = mediaData.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tautan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (item) => {
        setModalMode('edit');
        setSelectedItem(item);
        setFormData({
        nama: item.nama,
        tautan: item.tautan,
        logo: item.logo,
        });
        setShowModal(true);
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleViewDetail = (item) => {
        setSelectedItem(item);
        setShowDetailModal(true);
    };

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
        }));
    }, []);

    const handleSubmit = () => {
        if (!formData.nama.trim()) {
        alert('Silakan masukkan nama platform');
        return;
        }
        if (!formData.tautan.trim()) {
        alert('Silakan masukkan tautan media sosial');
        return;
        }
        if (!formData.logo) {
    alert('Silakan upload logo');
    return;
    }


        if (modalMode === 'create') {
        const newItem = {
            id: Date.now(),
            ...formData
        };
        setMediaData(prev => [...prev, newItem]);
        } else {
        setMediaData(prev => prev.map(item =>
            item.id === selectedItem.id ? { ...item, ...formData } : item
        ));
        }

        setShowModal(false);
        setFormData({ nama: '', tautan: '', logo: '' });
    };

    const handleCreate = () => {
        setFormData({ nama: '', tautan: '', logo: '' });
        setModalMode('create');
        setShowModal(true);
    };

    const closeModal = () => {
        if (formData.logo.startsWith("blob:")) {
            URL.revokeObjectURL(formData.logo);
        }
        setShowModal(false);
        setFormData({ nama: '', tautan: '', logo: '' });
    };


    const handleDelete = () => {
        setMediaData(prev => prev.filter(item => item.id !== selectedItem.id));
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // cek tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        alert('Format file tidak didukung.');
        return;
    }

    // buat blob url untuk preview
    const imageURL = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, logo: imageURL }));
    };


    const MediaCard = ({ data }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="p-5">
            <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800 flex-1">{data.nama}</h3>
            </div>

            <div className="mb-3">
            <img 
                src={data.logo} 
                alt={data.nama} 
                className="w-50 h-50 object-contain mb-3 rounded-lg border border-gray-200"
            />
            <p className="text-sm text-cyan-600 break-words">{data.tautan}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <button
                onClick={() => handleViewDetail(data)}
                className="flex-1 bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors duration-200 flex items-center justify-center gap-2"
            >
                <Eye className="h-4 w-4" />
                Detail
            </button>
            <button
                onClick={() => handleEdit(data)}
                className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            >
                <Edit2 className="h-4 w-4" />
            </button>
            <button
                onClick={() => handleDeleteClick(data)}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
                <Trash2 className="h-4 w-4" />
            </button>
            </div>
        </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-start justify-between">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Kelola Media Sosial</h1>
                    <p className="text-slate-200 text-base md:text-lg mb-4">Tambah, edit, atau hapus tautan media sosial perusahaan</p>
                    <button
                    onClick={handleCreate}
                    className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                    >
                    <Plus className="h-5 w-5" />
                    Tambah Media Sosial
                    </button>
                </div>
                </div>
            </div>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
            </div>

            {/* Search */}
            <div className="mb-6">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="text"
                placeholder="Cari media sosial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 shadow-sm transition-all duration-200"
                />
            </div>
            </div>

            {/* Card List */}
            {currentData.length > 0 ? (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentData.map((item) => (
                    <MediaCard key={item.id} data={item} />
                ))}
                </div>
            </>
            ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum ada media sosial
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Mulai dengan menambahkan tautan media sosial resmi
                </p>
                <button
                onClick={handleCreate}
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                <Plus className="w-5 h-5" />
                Tambah Media Sosial
                </button>
            </div>
            )}
        </div>

        {/* Modal Create/Edit */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                    {modalMode === 'create' ? 'Tambah Media Sosial Baru' : 'Edit Media Sosial'}
                </h2>
                <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    <X className="h-6 w-6 text-gray-500" />
                </button>
                </div>
                <div className="p-6">
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Platform</label>
                    <input
                        type="text"
                        value={formData.nama}
                        onChange={(e) => handleInputChange('nama', e.target.value)}
                        placeholder="Contoh: Instagram"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tautan Media Sosial</label>
                    <input
                        type="text"
                        value={formData.tautan}
                        onChange={(e) => handleInputChange('tautan', e.target.value)}
                        placeholder="Contoh: https://instagram.com/username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo / Foto</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />

                            {formData.logo && (
                            <img
                                src={formData.logo}
                                alt="Preview"
                                className="mt-3 w-20 h-20 object-contain rounded-lg border"
                            />
                        )}
                    </div>
                    <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium"
                    >
                        {modalMode === 'create' ? 'Tambah' : 'Simpan'}
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Modal Hapus */}
        {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Hapus Media Sosial?</h3>
                    <p className="text-sm text-gray-500 mb-6 break-words">
                    Apakah Anda yakin ingin menghapus {selectedItem?.nama}? Tindakan ini tidak dapat dibatalkan.
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

        {/* Modal Detail */}
        {showDetailModal && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Detail Media Sosial</h2>
                <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    <X className="h-6 w-6 text-gray-500" />
                </button>
                </div>
                <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                    <img
                        src={selectedItem.logo}
                        alt={selectedItem.nama}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                    />
                    <h3 className="text-2xl font-bold text-gray-900">{selectedItem.nama}</h3>
                    </div>
                    <div>
                    <p className="text-gray-600">
                        <span className="font-semibold">Tautan: </span>
                        <a href={selectedItem.tautan} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedItem.tautan}
                        </a>
                    </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                    <button
                        onClick={() => {
                        setShowDetailModal(false);
                        handleEdit(selectedItem);
                        }}
                        className="flex-1 px-6 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                    >
                        <Edit2 className="h-4 w-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => {
                        setShowDetailModal(false);
                        handleDeleteClick(selectedItem);
                        }}
                        className="flex-1 px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
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

export default MediaSosial;
