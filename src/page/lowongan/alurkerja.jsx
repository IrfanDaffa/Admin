import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, ArrowLeft, Save } from 'lucide-react';

const AlurKerja = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [editingItem, setEditingItem] = useState(null);
  const itemsPerPage = 8;

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
  ]);

  const handleAddItem = (newItem) => {
    const newId = alurKerjaData.length ? Math.max(...alurKerjaData.map((i) => i.id)) + 1 : 1;
    setAlurKerjaData((prev) => [...prev, { id: newId, ...newItem }]);
    setCurrentView('list');
    setCurrentPage(1);
  };

  const handleUpdateItem = (updatedItem) => {
    setAlurKerjaData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setCurrentView('list');
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      setAlurKerjaData((prev) => prev.filter((item) => item.id !== id));
      const newTotalPages = Math.ceil((alurKerjaData.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setCurrentView('edit');
  };

  const totalPages = Math.ceil(alurKerjaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = alurKerjaData.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  if (currentView === 'add') {
    return <AlurKerjaAdd onSave={handleAddItem} onCancel={() => setCurrentView('list')} />;
  }

  if (currentView === 'edit' && editingItem) {
    return (
      <AlurKerjaEdit
        item={editingItem}
        onSave={handleUpdateItem}
        onCancel={() => {
          setCurrentView('list');
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Alur Kerja</h1>
                <p className="text-slate-200 text-base md:text-lg mb-4">
                  Kelola alur kerja untuk proses lowongan pekerjaan
                </p>
                <button
                  onClick={() => setCurrentView('add')}
                  className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Tambah
                </button>
              </div>
              <div className="hidden lg:flex items-center justify-center ml-10 mt-4">
                <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-12 w-12 text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
        </div>

        {alurKerjaData.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Alur Kerja</h3>
            <p className="text-gray-600 mb-6">Tambahkan alur kerja pertama Anda untuk memulai.</p>
            <button
              onClick={() => setCurrentView('add')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Tambah Alur Kerja
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentData.map((item) => (
                <AlurKerjaCard
                  key={item.id}
                  data={item}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* {totalPages > 1 && ( */}
              <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 font-medium">
                  Showing {startIndex + 1} to {Math.min(endIndex, alurKerjaData.length)} of{' '}
                  {alurKerjaData.length} entries
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
                          ? 'bg-blue-600 text-white shadow-sm'
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
            {/* )} */}
          </>
        )}
      </div>
    </div>
  );
};

const AlurKerjaCard = ({ data, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-blue-50 border-2 border-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-blue-600">{data.number}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{data.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(data)}
        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Edit2 className="h-4 w-4" />
        Edit
      </button>
      <button
        onClick={() => onDelete(data.id)}
        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Hapus
      </button>
    </div>
  </div>
);

const AlurKerjaAdd = ({ onSave, onCancel }) => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number && title && description) {
      onSave({ number, title, description });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back Button */}
        <div className="mb-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Kembali ke Daftar</span>
          </button>
          
          {/* Header dengan Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tambah Alur Kerja</h1>
              <p className="text-gray-600 mt-1">Tambahkan alur kerja baru untuk proses lowongan</p>
            </div>
          </div>
        </div>

        {/* Form Card dengan Shadow lebih dalam */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Informasi Alur Kerja</h2>
            <p className="text-sm text-gray-600 mt-1">Lengkapi formulir di bawah ini dengan informasi yang akurat</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Nomor Urut */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Urut <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Contoh: 01, 02, 03"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    maxLength={2}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">{number.length}/2</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Masukkan nomor urut (maksimal 2 digit)
                </p>
              </div>

              {/* Judul */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Alur Kerja <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Seleksi Administrasi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Berikan judul yang jelas dan deskriptif
                </p>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan detail alur kerja dengan lengkap..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Jelaskan tahapan alur kerja secara detail
                  </p>
                  <span className={`text-xs font-medium ${
                    description.length < 50 ? 'text-red-500' : 
                    description.length < 100 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {description.length} karakter
                  </span>
                </div>
              </div>

              {/* Preview Badge */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Preview</p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">{number || '00'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {title || 'Judul Alur Kerja'}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {description || 'Deskripsi akan tampil di sini...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-white hover:border-gray-400 transition-all duration-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!number || !title || !description}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  !number || !title || !description
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                <Save className="h-5 w-5" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlurKerjaEdit = ({ item, onSave, onCancel }) => {
  const [number, setNumber] = useState(item.number);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = () => {
    if (number && title && description) {
      onSave({ id: item.id, number, title, description });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back Button */}
        <div className="mb-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Kembali ke Daftar</span>
          </button>
          
          {/* Header dengan Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Edit2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Alur Kerja</h1>
              <p className="text-gray-600 mt-1">Perbarui informasi alur kerja #{item.number}</p>
            </div>
          </div>
        </div>

        {/* Form Card dengan Shadow lebih dalam */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Informasi Alur Kerja</h2>
            <p className="text-sm text-gray-600 mt-1">Lengkapi formulir di bawah ini dengan informasi yang akurat</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Nomor Urut */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Urut <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Contoh: 01, 02, 03"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    maxLength={2}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">{number.length}/2</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Masukkan nomor urut (maksimal 2 digit)
                </p>
              </div>

              {/* Judul */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Alur Kerja <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Seleksi Administrasi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Berikan judul yang jelas dan deskriptif
                </p>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan detail alur kerja dengan lengkap..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Jelaskan tahapan alur kerja secara detail
                  </p>
                  <span className={`text-xs font-medium ${
                    description.length < 50 ? 'text-red-500' : 
                    description.length < 100 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {description.length} karakter
                  </span>
                </div>
              </div>

              {/* Preview Badge */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Preview</p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">{number || '00'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {title || 'Judul Alur Kerja'}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {description || 'Deskripsi akan tampil di sini...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-white hover:border-gray-400 transition-all duration-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!number || !title || !description}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  !number || !title || !description
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                <Save className="h-5 w-5" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlurKerja;