import React, { useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Briefcase, X, Eye } from 'lucide-react';

const AlurKerja = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    description: ''
  });

  const [alurKerjaData, setAlurKerjaData] = useState([
    {
      id: 1,
      number: '01',
      title: 'Seleksi Administrasi',
      description: 'Pemeriksaan kelengkapan dokumen dan kualifikasi dasar pelamar sesuai dengan persyaratan yang telah ditentukan.',
    },
    {
      id: 2,
      number: '02',
      title: 'Tes Kemampuan',
      description: 'Evaluasi kemampuan teknis dan pengetahuan yang relevan dengan posisi yang dilamar melalui tes tertulis.',
    },
    {
      id: 3,
      number: '03',
      title: 'Wawancara HR',
      description: 'Sesi wawancara dengan tim HR untuk mengevaluasi kepribadian, motivasi, dan kesesuaian dengan budaya perusahaan.',
    },
    {
      id: 4,
      number: '04',
      title: 'Tes Psikologi',
      description: 'Penilaian psikologis untuk mengukur karakteristik kepribadian, kemampuan kognitif, dan potensi kandidat.',
    },
    {
      id: 5,
      number: '05',
      title: 'Wawancara User',
      description: 'Interview dengan calon atasan langsung dan tim untuk menilai kompetensi teknis dan kemampuan kerja sama.',
    },
    {
      id: 6,
      number: '06',
      title: 'Medical Check Up',
      description: 'Pemeriksaan kesehatan menyeluruh untuk memastikan kandidat dalam kondisi sehat dan layak bekerja.',
    },
    {
      id: 7,
      number: '07',
      title: 'Offering Letter',
      description: 'Pemberian surat penawaran kerja kepada kandidat yang lolos seluruh tahapan seleksi.',
    },
    {
      id: 8,
      number: '08',
      title: 'Onboarding',
      description: 'Proses orientasi dan pengenalan karyawan baru terhadap perusahaan, tim, dan tanggung jawab pekerjaan.',
    },
  ]);

  // Pagination
  const totalPages = Math.ceil(alurKerjaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = alurKerjaData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setSelectedItem(alurKerjaData.find(item => item.id === id));
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAlurKerjaData(alurKerjaData.filter(item => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData({
      number: item.number,
      title: item.title,
      description: item.description
    });
    setShowModal(true);
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleCreate = () => {
    setFormData({ number: '', title: '', description: '' });
    setModalMode('create');
    setShowModal(true);
  };

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = () => {
    if (!formData.number.trim()) {
      alert('Silakan masukkan nomor alur kerja');
      return;
    }

    if (!formData.title.trim()) {
      alert('Silakan masukkan judul alur kerja');
      return;
    }

    if (!formData.description.trim()) {
      alert('Silakan masukkan deskripsi alur kerja');
      return;
    }
    
    if (modalMode === 'create') {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      setAlurKerjaData(prev => [...prev, newItem]);
    } else {
      setAlurKerjaData(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, ...formData } : item
      ));
    }

    setShowModal(false);
    setFormData({ number: '', title: '', description: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ number: '', title: '', description: '' });
  };

  const AlurKerjaCard = ({ data }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex items-start gap-3 mb-4 flex-1">
        {/* Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-50 border-2 border-slate-700 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-slate-700">{data.number}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{data.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-5">
            {data.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-auto">
        <button 
          onClick={() => handleViewDetail(data)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button 
          onClick={() => handleEdit(data)}
          className="bg-cyan-400 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-cyan-500 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
        <button 
          onClick={() => handleDelete(data.id)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Alur Kerja</h1>
                <p className="text-slate-200 text-base md:text-lg mb-4">
                  Kelola alur kerja untuk proses lowongan pekerjaan
                </p>
                <button 
                  onClick={handleCreate}
                  className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Tambah Alur Kerja
                </button>
              </div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentData.map((item) => (
            <AlurKerjaCard key={item.id} data={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, alurKerjaData.length)} of {alurKerjaData.length} entries
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
      </div>

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'create' ? 'Tambah Alur Kerja' : 'Edit Alur Kerja'}
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
                    Nomor Urut <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="Contoh: 01"
                    maxLength={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Alur Kerja <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Contoh: Seleksi Administrasi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={8}
                    placeholder="Tuliskan deskripsi alur kerja secara lengkap..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
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

      {/* Modal Delete */}
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
                  Hapus Alur Kerja?
                </h3>
                <p className="text-sm text-gray-500 mb-6 break-words">
                  Apakah Anda yakin ingin menghapus alur kerja ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
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
              <h2 className="text-2xl font-bold text-gray-900">Detail Alur Kerja</h2>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{selectedItem.number}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">Nomor Urut</h4>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-slate-700" />
                    <h4 className="text-sm font-semibold text-slate-900">Judul</h4>
                  </div>
                  <p className="text-gray-900 font-medium break-words whitespace-pre-wrap">
                    {selectedItem.title}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-1 h-5 bg-slate-600 rounded"></div>
                    Deskripsi
                  </h4>
                  <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap pl-3">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedItem);
                    }}
                    className="flex-1 px-6 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleDelete(selectedItem.id);
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

export default AlurKerja;