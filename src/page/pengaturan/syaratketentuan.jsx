import React, { useState, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, FileText, X, ChevronDown } from 'lucide-react';

const SyaratKetentuan = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        halaman: 'Semua Halaman'
    });

    const itemsPerPage = 9;
    const [syaratData, setSyaratData] = useState([]);

    const halamanOptions = [
        'Semua Halaman',
        'Profil',
        'Layanan',
        'Lowongan',
        'Produk',
        'Mitra',
        'Blog',
        'Kontak'
    ];

    const filteredData = syaratData.filter(item =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.konten.toLowerCase().includes(searchQuery.toLowerCase())
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
            judul: item.judul,
            konten: item.konten,
            halaman: item.halaman
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
        if (!formData.judul.trim()) {
            alert('Silakan masukkan judul syarat & ketentuan');
            return;
        }

        if (!formData.konten.trim()) {
            alert('Silakan masukkan konten syarat & ketentuan');
            return;
        }
        
        if (modalMode === 'create') {
            const newItem = {
                id: Date.now(),
                ...formData
            };
            setSyaratData(prev => [...prev, newItem]);
        } else {
            setSyaratData(prev => prev.map(item => 
                item.id === selectedItem.id ? { ...item, ...formData } : item
            ));
        }

        setShowModal(false);
        setFormData({ judul: '', konten: '', halaman: 'Semua Halaman' });
    };

    const handleCreate = () => {
        setFormData({ judul: '', konten: '', halaman: 'Semua Halaman' });
        setModalMode('create');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ judul: '', konten: '', halaman: 'Semua Halaman' });
    };

    const handleDelete = () => {
        setSyaratData(prev => prev.filter(item => item.id !== selectedItem.id));
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const SyaratCard = ({ data }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
            <div className="relative pl-8 pb-8">
                {/* Timeline line */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-400 to-slate-200"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-3">
                    <div className="w-5 h-5 rounded-full bg-slate-500 border-4 border-white shadow-md"></div>
                </div>

                {/* Card content */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Header with badge */}
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-3 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-slate-700">
                                    Ditampilkan di: <span className="text-slate-900">{data.halaman}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => handleViewDetail(data)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                    title="Lihat Detail"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                    onClick={() => handleEdit(data)}
                                    className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
                                    title="Edit"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(data)}
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                    title="Hapus"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content body */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight break-words">
                                    {data.judul}
                                </h3>
                                <div className="prose prose-sm max-w-none">
                                    <p className={`text-gray-700 leading-relaxed break-words whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''}`}>
                                        {data.konten}
                                    </p>
                                </div>
                                {data.konten.length > 150 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="mt-3 text-sm font-semibold text-slate-600 hover:text-slate-700 inline-flex items-center gap-2 group"
                                    >
                                        <span>{isExpanded ? 'Tampilkan lebih sedikit' : 'Baca selengkapnya'}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Kelola Syarat & Ketentuan</h1>
                                <p className="text-slate-200 text-base md:text-lg mb-4">
                                    Tambah, edit, atau hapus syarat & ketentuan yang ditampilkan di landing page
                                </p>
                                <button 
                                    onClick={handleCreate}
                                    className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                                >
                                    <Plus className="h-5 w-5" />
                                    Tambah Syarat & Ketentuan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
                </div>

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari syarat & ketentuan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 shadow-sm transition-all duration-200"
                        />
                    </div>
                </div>

                {currentData.length > 0 ? (
                    <>
                        <div className="max-w-4xl">
                            {currentData.map((item) => (
                                <SyaratCard key={item.id} data={item} />
                            ))}
                        </div>

                        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-sm text-gray-600 font-medium">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        currentPage === 1
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                            currentPage === index + 1
                                                ? 'bg-slate-700 text-white shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        currentPage === totalPages
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada syarat & ketentuan
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Mulai dengan menambahkan syarat & ketentuan untuk ditampilkan di landing page
                        </p>
                        <button
                            onClick={handleCreate}
                            className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Syarat & Ketentuan
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {modalMode === 'create' ? 'Tambah Syarat & Ketentuan' : 'Edit Syarat & Ketentuan'}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul Syarat & Ketentuan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.judul}
                                        onChange={(e) => handleInputChange('judul', e.target.value)}
                                        placeholder="Contoh: Ketentuan Layanan Umum"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Konten <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.konten}
                                        onChange={(e) => handleInputChange('konten', e.target.value)}
                                        rows={8}
                                        placeholder="Tuliskan syarat dan ketentuan secara lengkap..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tampilkan di Halaman <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.halaman}
                                            onChange={(e) => handleInputChange('halaman', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 appearance-none bg-white"
                                        >
                                            {halamanOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Pilih halaman spesifik atau "Semua Halaman" untuk menampilkan di semua halaman
                                    </p>
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
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Hapus Syarat & Ketentuan?
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 break-words">
                                    Apakah Anda yakin ingin menghapus syarat & ketentuan ini? Tindakan ini tidak dapat dibatalkan.
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

            {showDetailModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Detail Syarat & Ketentuan</h2>
                            <button 
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="bg-slate-100 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-5 w-5 text-slate-700" />
                                        <h4 className="text-sm font-semibold text-slate-900">Judul</h4>
                                    </div>
                                    <p className="text-gray-900 font-medium break-words whitespace-pre-wrap">
                                        {selectedItem.judul}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-slate-700 rounded"></div>
                                        Konten
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap pl-3">
                                        {selectedItem.konten}
                                    </p>
                                </div>

                                <div className="bg-slate-100 rounded-lg p-4">
                                    <p className="text-xs font-medium text-slate-900 mb-1">Ditampilkan di:</p>
                                    <span className="inline-block px-3 py-1 bg-slate-700 text-white text-sm rounded-md font-medium">
                                        {selectedItem.halaman}
                                    </span>
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

export default SyaratKetentuan;