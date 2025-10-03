import React, { useState, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Briefcase, X, Phone, DollarSign } from 'lucide-react';

const Lowongan = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        posisi: '',
        deskripsi: '',
        kualifikasi: '',
        gaji: '',
        kontak: '',
        status: 'Tersedia'
    });

    const itemsPerPage = 8;
    const [lowonganData, setLowonganData] = useState([]);

    const filteredData = lowonganData.filter(item =>
        item.posisi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
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
            posisi: item.posisi,
            deskripsi: item.deskripsi,
            kualifikasi: item.kualifikasi,
            gaji: item.gaji,
            kontak: item.kontak,
            status: item.status
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
        if (!formData.posisi.trim()) {
            alert('Silakan masukkan posisi');
            return;
        }

        if (!formData.deskripsi.trim()) {
            alert('Silakan masukkan deskripsi pekerjaan');
            return;
        }

        if (!formData.kualifikasi.trim()) {
            alert('Silakan masukkan kualifikasi');
            return;
        }

        if (!formData.gaji.trim()) {
            alert('Silakan masukkan gaji');
            return;
        }

        if (!formData.kontak.trim()) {
            alert('Silakan masukkan nomor kontak');
            return;
        }
        
        if (modalMode === 'create') {
            const newItem = {
                id: Date.now(),
                ...formData
            };
            setLowonganData(prev => [...prev, newItem]);
        } else {
            setLowonganData(prev => prev.map(item => 
                item.id === selectedItem.id ? { ...item, ...formData } : item
            ));
        }

        setShowModal(false);
        setFormData({ posisi: '', deskripsi: '', kualifikasi: '', gaji: '', kontak: '', status: 'Tersedia' });
    };

    const handleCreate = () => {
        setFormData({ posisi: '', deskripsi: '', kualifikasi: '', gaji: '', kontak: '', status: 'Tersedia' });
        setModalMode('create');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ posisi: '', deskripsi: '', kualifikasi: '', gaji: '', kontak: '', status: 'Tersedia' });
    };

    const handleDelete = () => {
        setLowonganData(prev => prev.filter(item => item.id !== selectedItem.id));
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const LowonganCard = ({ data }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 flex-1">{data.posisi}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        data.status === 'Tersedia' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {data.status}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {data.deskripsi}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-slate-500" />
                        <span className="font-medium">{data.gaji}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-slate-500" />
                        <span>{data.kontak}</span>
                    </div>
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
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Kelola Lowongan Kerja</h1>
                                <p className="text-slate-200 text-base md:text-lg mb-4">Tambah, edit, atau hapus lowongan pekerjaan yang tersedia</p>
                                <button 
                                    onClick={handleCreate}
                                    className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                                >
                                    <Plus className="h-5 w-5" />
                                    Tambah Lowongan
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
                            placeholder="Cari lowongan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 shadow-sm transition-all duration-200"
                        />
                    </div>
                </div>

                {currentData.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {currentData.map((item) => (
                                <LowonganCard key={item.id} data={item} />
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
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada lowongan
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Mulai dengan menambahkan lowongan pekerjaan yang tersedia
                        </p>
                        <button
                            onClick={handleCreate}
                            className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Lowongan
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {modalMode === 'create' ? 'Tambah Lowongan Baru' : 'Edit Lowongan'}
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
                                        Posisi
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.posisi}
                                        onChange={(e) => handleInputChange('posisi', e.target.value)}
                                        placeholder="Contoh: Frontend Developer"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi Pekerjaan
                                    </label>
                                    <textarea
                                        value={formData.deskripsi}
                                        onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                                        rows={4}
                                        placeholder="Jelaskan tugas dan tanggung jawab posisi ini"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kualifikasi
                                    </label>
                                    <textarea
                                        value={formData.kualifikasi}
                                        onChange={(e) => handleInputChange('kualifikasi', e.target.value)}
                                        rows={4}
                                        placeholder="Jelaskan persyaratan dan kualifikasi yang dibutuhkan"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gaji
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.gaji}
                                        onChange={(e) => handleInputChange('gaji', e.target.value)}
                                        placeholder="Contoh: Rp 5.000.000 - Rp 7.000.000"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Kontak Perusahaan
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.kontak}
                                        onChange={(e) => handleInputChange('kontak', e.target.value)}
                                        placeholder="Contoh: 0812-3456-7890"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Lowongan
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    >
                                        <option value="Tersedia">Tersedia</option>
                                        <option value="Ditutup">Ditutup</option>
                                    </select>
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
                                    Hapus Lowongan?
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 break-words">
                                    Apakah Anda yakin ingin menghapus lowongan {selectedItem?.posisi}? Tindakan ini tidak dapat dibatalkan.
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
                            <h2 className="text-2xl font-bold text-gray-900">Detail Lowongan</h2>
                            <button 
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 break-words">
                                            {selectedItem.posisi}
                                        </h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedItem.status === 'Tersedia' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {selectedItem.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center text-gray-700">
                                        <DollarSign className="h-5 w-5 mr-3 text-slate-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Gaji</p>
                                            <p className="font-semibold">{selectedItem.gaji}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Phone className="h-5 w-5 mr-3 text-slate-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Kontak</p>
                                            <p className="font-semibold">{selectedItem.kontak}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h4>
                                    <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
                                        {selectedItem.deskripsi}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Kualifikasi</h4>
                                    <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
                                        {selectedItem.kualifikasi}
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

export default Lowongan;