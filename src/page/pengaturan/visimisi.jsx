import React, { useState } from 'react';
import { Save, Edit2, X, Target, Lightbulb, Plus, Trash2 } from 'lucide-react';

const VisiMisi = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [visiMisiData, setVisiMisiData] = useState({
        visi: 'Menjadi perusahaan teknologi terdepan di Indonesia yang memberikan solusi inovatif dan berkualitas tinggi untuk mendukung transformasi digital bisnis.',
        misi: [
            'Mengembangkan produk dan layanan teknologi yang inovatif dan berkualitas tinggi',
            'Memberikan solusi IT yang tepat guna sesuai kebutuhan klien',
            'Membangun tim profesional yang kompeten dan berdedikasi tinggi',
            'Menjalin kemitraan strategis dengan berbagai pihak untuk pertumbuhan bersama',
            'Berkontribusi positif terhadap perkembangan industri teknologi di Indonesia'
        ]
    });

    const [tempData, setTempData] = useState({ 
        visi: visiMisiData.visi,
        misi: [...visiMisiData.misi]
    });

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMisiChange = (index, value) => {
        const newMisi = [...tempData.misi];
        newMisi[index] = value;
        setTempData(prev => ({
            ...prev,
            misi: newMisi
        }));
    };

    const handleAddMisi = () => {
        setTempData(prev => ({
            ...prev,
            misi: [...prev.misi, '']
        }));
    };

    const handleDeleteMisi = (index) => {
        if (tempData.misi.length <= 1) {
            alert('Minimal harus ada 1 poin misi');
            return;
        }
        const newMisi = tempData.misi.filter((_, i) => i !== index);
        setTempData(prev => ({
            ...prev,
            misi: newMisi
        }));
    };

    const handleEdit = () => {
        setTempData({ 
            visi: visiMisiData.visi,
            misi: [...visiMisiData.misi]
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTempData({ 
            visi: visiMisiData.visi,
            misi: [...visiMisiData.misi]
        });
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!tempData.visi.trim()) {
            alert('Silakan masukkan visi perusahaan');
            return;
        }

        const emptyMisi = tempData.misi.some(m => !m.trim());
        if (emptyMisi) {
            alert('Silakan lengkapi semua poin misi atau hapus yang kosong');
            return;
        }

        if (tempData.misi.length === 0) {
            alert('Minimal harus ada 1 poin misi');
            return;
        }

        setVisiMisiData({ 
            visi: tempData.visi,
            misi: [...tempData.misi]
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Visi & Misi Perusahaan</h1>
                                <p className="text-slate-200 text-base md:text-lg mb-4">
                                    Kelola visi dan misi perusahaan yang akan ditampilkan di landing page
                                </p>
                                {!isEditing && (
                                    <button 
                                        onClick={handleEdit}
                                        className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2"
                                    >
                                        <Edit2 className="h-5 w-5" />
                                        Edit Visi & Misi
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-slate-600 bg-opacity-5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-slate-600 bg-opacity-5 rounded-full" />
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Visi Perusahaan</h3>
                        </div>
                        
                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visi <span className="text-red-500">*</span>
                            </label> */}
                            {isEditing ? (
                                <textarea
                                    value={tempData.visi}
                                    onChange={(e) => handleInputChange('visi', e.target.value)}
                                    rows={6}
                                    placeholder="Tuliskan visi perusahaan Anda..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                                />
                            ) : (
                                <div className="px-4 py-3 bg-gray-50 rounded-lg min-h-[144px]">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                        {visiMisiData.visi}
                                    </p>
                                </div>
                            )}
                            {isEditing && (
                                <p className="mt-2 text-xs text-gray-500">
                                    Visi adalah gambaran masa depan yang ingin dicapai perusahaan
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Lightbulb className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Misi Perusahaan</h3>
                            </div>
                            {isEditing && (
                                <button
                                    onClick={handleAddMisi}
                                    className="bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
                                    title="Tambah Misi"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-3">
                            {(isEditing ? tempData.misi : visiMisiData.misi).map((item, index) => (
                                <div key={index}>
                                    {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Misi <span className="text-red-500">*</span>
                                    </label> */}
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <textarea
                                                value={item}
                                                onChange={(e) => handleMisiChange(index, e.target.value)}
                                                rows={2}
                                                placeholder="Tuliskan misi perusahaan..."
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                                            />
                                            <button
                                                onClick={() => handleDeleteMisi(index)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 h-fit"
                                                title="Hapus Misi"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                                {index + 1}. {item}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Misi adalah langkah-langkah konkret untuk mencapai visi
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisiMisi;