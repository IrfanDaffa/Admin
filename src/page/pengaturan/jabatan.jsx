import React, { useState, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Briefcase, X } from 'lucide-react';

const Jabatan = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        namaJabatan: ''
    });

    const itemsPerPage = 10;
    const [jabatanData, setJabatanData] = useState([]);

    const filteredData = jabatanData.filter(item =>
        item.namaJabatan.toLowerCase().includes(searchQuery.toLowerCase())
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
            namaJabatan: item.namaJabatan
        });
        setShowModal(true);
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleSubmit = () => {
        if (!formData.namaJabatan.trim()) {
            alert('Silakan masukkan nama jabatan');
            return;
        }
        
        if (modalMode === 'create') {
            const newItem = {
                id: Date.now(),
                ...formData
            };
            setJabatanData(prev => [...prev, newItem]);
        } else {
            setJabatanData(prev => prev.map(item => 
                item.id === selectedItem.id ? { ...item, ...formData } : item
            ));
        }

        setShowModal(false);
        setFormData({ namaJabatan: '' });
    };

    const handleCreate = () => {
        setFormData({ namaJabatan: '' });
        setModalMode('create');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ namaJabatan: '' });
    };

    const handleDelete = () => {
        setJabatanData(prev => prev.filter(item => item.id !== selectedItem.id));
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Kelola Jabatan</h1>
                                <p className="text-slate-200 text-base md:text-lg mb-4">
                                    Tambah, edit, atau hapus jabatan dalam organisasi
                                </p>
                                <button 
                                    onClick={handleCreate}
                                    className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                                >
                                    <Plus className="h-5 w-5" />
                                    Tambah Jabatan
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
                            placeholder="Cari jabatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 shadow-sm transition-all duration-200"
                        />
                    </div>
                </div>

                {currentData.length > 0 ? (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">
                                                No
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                                Nama Jabatan
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider w-40">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {currentData.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                                    {startIndex + index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                    {item.namaJabatan}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteClick(item)}
                                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                            Belum ada jabatan
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Mulai dengan menambahkan jabatan untuk organisasi Anda
                        </p>
                        <button
                            onClick={handleCreate}
                            className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Jabatan
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {modalMode === 'create' ? 'Tambah Jabatan' : 'Edit Jabatan'}
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
                                        Nama Jabatan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.namaJabatan}
                                        onChange={(e) => handleInputChange('namaJabatan', e.target.value)}
                                        placeholder="Contoh: Manager HRD"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
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
                                    Hapus Jabatan?
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 break-words">
                                    Apakah Anda yakin ingin menghapus jabatan "{selectedItem?.namaJabatan}"? Tindakan ini tidak dapat dibatalkan.
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

export default Jabatan;