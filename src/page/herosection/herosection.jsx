import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Image, Eye, Monitor, Smartphone } from 'lucide-react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('background');
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    page: 'Home',
    title: '',
  });
  const [preview, setPreview] = useState('');

  // Handle delete card
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus card ini?')) {
      setCards(prev => prev.filter(card => card.id !== id));
    }
  };

  // Handle edit card
  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ 
      image: card.image, 
      page: card.page || 'Home',
      title: card.title || ''
    });
    setPreview(card.image);
    setShowAddModal(true);
  };

  // Handle add new card
  const handleAdd = () => {
    setEditingCard(null);
    setFormData({ image: '', page: 'Home', title: '' });
    setPreview('');
    setShowAddModal(true);
  };

  // Handle file change with compression
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 10MB.');
      e.target.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.');
      e.target.value = '';
      return;
    }

    // Compress and convert image
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Resize if too large (max 1920px width)
        const maxWidth = 1920;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        
        console.log('Original size:', file.size);
        console.log('Compressed size:', compressedBase64.length);
        console.log('Base64 preview:', compressedBase64.substring(0, 100));
        
        setFormData(prev => ({ ...prev, image: compressedBase64 }));
        setPreview(compressedBase64);
      };
      
      img.onerror = () => {
        alert('Gagal memproses gambar. Silakan coba gambar lain.');
      };
      
      img.src = event.target.result;
    };
    
    reader.onerror = () => {
      alert('Gagal membaca file. Silakan coba lagi.');
    };
    
    reader.readAsDataURL(file);
  };

  // Handle save card
  const handleSave = () => {
    if (!formData.image) {
      alert("Silakan upload gambar terlebih dahulu");
      return;
    }

    if (!formData.title.trim()) {
      alert("Silakan masukkan judul");
      return;
    }

    if (activeTab === 'background' && !formData.page) {
      alert("Silakan pilih halaman");
      return;
    }

    console.log('=== SAVING CARD ===');
    console.log('Form data image length:', formData.image.length);
    console.log('Form data image preview:', formData.image.substring(0, 100));
    console.log('Title:', formData.title);
    console.log('Type:', activeTab);

    if (editingCard) {
      const updatedCard = { 
        id: editingCard.id,
        type: activeTab,
        image: formData.image,
        title: formData.title,
        ...(activeTab === 'background' && { page: formData.page })
      };
      console.log('Updated card:', updatedCard);
      setCards(prev =>
        prev.map(card =>
          card.id === editingCard.id ? updatedCard : card
        )
      );
    } else {
      const newCard = { 
        id: Date.now(), 
        type: activeTab,
        image: formData.image,
        title: formData.title,
        ...(activeTab === 'background' && { page: formData.page })
      };
      console.log('New card created:', newCard);
      console.log('New card image length:', newCard.image.length);
      setCards(prev => {
        const updated = [...prev, newCard];
        console.log('Updated cards array:', updated);
        return updated;
      });
    }
    
    setShowAddModal(false);
    setEditingCard(null);
    setFormData({ image: '', page: 'Home', title: '' });
    setPreview('');
  };

  const backgroundCards = cards.filter(card => card.type === 'background');
  const sliderCards = cards.filter(card => card.type === 'slider');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Hero Section Management</h1>
                <p className="text-slate-200 text-base md:text-lg mb-4">
                  Kelola background dan slider untuk hero section website dengan mudah dan profesional
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Monitor className="w-4 h-4" />
                    <span>{backgroundCards.length} Background</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Image className="w-4 h-4" />
                    <span>{sliderCards.length} Slider</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Images</p>
                <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Background Pages</p>
                <p className="text-2xl font-bold text-gray-900">{backgroundCards.length}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Monitor className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Slider Items</p>
                <p className="text-2xl font-bold text-gray-900">{sliderCards.length}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Smartphone className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-gray-100 gap-4">
            <div className="flex space-x-1 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('background')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'background'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Background
                <span className="ml-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {backgroundCards.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('slider')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'slider'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Slider
                <span className="ml-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {sliderCards.length}
                </span>
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Tambah {activeTab === 'background' ? 'Background' : 'Slider'}
            </button>
          </div>

          {/* Cards Grid */}
          <div className="p-6">
            {cards.filter(card => card.type === activeTab).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cards
                  .filter(card => card.type === activeTab)
                  .map((card) => {
                    console.log('Rendering card:', card.id, 'Image length:', card.image?.length, 'Title:', card.title);
                    return (
                      <div
                        key={card.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:border-slate-200 transition-all duration-300"
                      >
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {card.image ? (
                          <>
                            <img
                              src={card.image}
                              alt={card.title || "Card"}
                              className="w-full h-full object-cover"
                              style={{ display: 'block' }}
                              onLoad={(e) => {
                                console.log('✅ Image loaded successfully:', card.title);
                                e.target.style.opacity = '1';
                              }}
                              onError={(e) => {
                                console.error('❌ Image failed to load:', card.title);
                                console.error('Image data length:', card.image?.length);
                                console.error('Image data start:', card.image?.substring(0, 100));
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EFailed to load%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                            
                            {/* Scale effect container */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {/* Action Buttons */}
                              <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                  onClick={() => handleEdit(card)}
                                  className="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(card.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Preview button */}
                              <div className="absolute bottom-3 right-3">
                                <button className="bg-white bg-opacity-90 hover:bg-white text-slate-700 p-2 rounded-lg shadow-lg transition-all duration-200">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            card.type === 'background' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {card.type === 'background' ? card.page : 'Slider'}
                          </span>
                        </div>
                        {card.title && (
                          <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">
                            {card.title}
                          </h3>
                        )}
                        <p className="text-xs text-gray-500">
                          {card.type === 'background' ? `Page: ${card.page}` : 'Slider Image'}
                        </p>
                      </div>
                    </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Belum ada {activeTab === 'background' ? 'background' : 'slider'}
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Mulai dengan menambahkan {activeTab === 'background' ? 'background untuk halaman website' : 'gambar slider yang menarik'} 
                </p>
                <button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Tambah {activeTab === 'background' ? 'Background' : 'Slider'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {editingCard ? 'Edit' : 'Tambah'} {activeTab === 'background' ? 'Background' : 'Slider'}
                </h2>
                <p className="text-gray-600">
                  {editingCard ? 'Perbarui' : 'Buat'} {activeTab === 'background' ? 'background halaman' : 'slider'} baru
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Judul</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={`Masukkan judul ${activeTab === 'background' ? 'background' : 'slider'}`}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {activeTab === 'background' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tampilkan di Halaman</label>
                    <select
                      value={formData.page}
                      onChange={(e) => setFormData(prev => ({ ...prev, page: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    >
                      <option>Home</option>
                      <option>About</option>
                      <option>Services</option>
                      <option>Contact</option>
                      <option>Portfolio</option>
                      <option>Blog</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Gambar</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-slate-300 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        <span className="text-slate-600 font-medium">Klik untuk upload</span> atau drag & drop
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG, atau WEBP (maks. 10MB)</p>
                    </label> 
                  </div>
                  
                  {preview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCard(null);
                    setFormData({ image: '', page: 'Home', title: '' });
                    setPreview('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {editingCard ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;