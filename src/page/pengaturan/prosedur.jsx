import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ClipboardList } from 'lucide-react';

const Prosedur = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [prosedurData, setProsedurData] = useState([
    {
      id: 1,
      number: '01',
      title: 'Prosedur Pengajuan Cuti',
      description: 'Karyawan wajib mengajukan cuti minimal 3 hari sebelumnya melalui sistem HRIS. Persetujuan akan diproses oleh atasan langsung dan HR department.'
    },
    {
      id: 2,
      number: '02',
      title: 'Prosedur Absensi',
      description: 'Karyawan wajib melakukan absensi setiap hari kerja melalui fingerprint atau aplikasi mobile. Keterlambatan akan dicatat dalam sistem.'
    },
    {
      id: 3,
      number: '03',
      title: 'Prosedur Perizinan',
      description: 'Pengajuan izin harus dilakukan sebelum jam kerja dimulai dengan menyertakan alasan yang jelas dan bukti pendukung jika diperlukan.'
    },
    {
      id: 4,
      number: '04',
      title: 'Prosedur Pengadaan Barang',
      description: 'Setiap pengadaan barang harus melalui persetujuan manager departemen dan bagian procurement dengan melampirkan form permintaan barang.'
    },
    {
      id: 5,
      number: '05',
      title: 'Prosedur Klaim Reimburse',
      description: 'Klaim reimburse harus diajukan maksimal 14 hari setelah tanggal transaksi dengan melampirkan bukti pembayaran yang sah.'
    },
    {
      id: 6,
      number: '06',
      title: 'Prosedur Meeting Room',
      description: 'Pemesanan ruang meeting harus dilakukan minimal 1 hari sebelumnya melalui sistem booking online dengan mencantumkan agenda meeting.'
    },
    {
      id: 7,
      number: '07',
      title: 'Prosedur Lembur',
      description: 'Lembur harus mendapat persetujuan atasan dan dicatat dalam form lembur. Perhitungan upah lembur sesuai ketentuan yang berlaku.'
    },
    {
      id: 8,
      number: '08',
      title: 'Prosedur Kesehatan dan Keselamatan',
      description: 'Setiap karyawan wajib mengikuti protokol K3, menggunakan APD sesuai standar, dan melaporkan insiden kepada HSE department.'
    },
    {
      id: 9,
      number: '09',
      title: 'Prosedur Pelatihan Karyawan',
      description: 'Pengajuan pelatihan eksternal harus melalui persetujuan atasan dan HR dengan melampirkan detail program dan estimasi biaya.'
    },
    {
      id: 10,
      number: '10',
      title: 'Prosedur Komplain Internal',
      description: 'Komplain atau saran dapat disampaikan melalui kotak saran atau email khusus dengan menjaga kerahasiaan pelapor.'
    },
    {
      id: 11,
      number: '11',
      title: 'Prosedur Pemutusan Hubungan Kerja',
      description: 'PHK dilakukan sesuai aturan ketenagakerjaan dengan proses exit interview dan penyelesaian administrasi kepegawaian.'
    },
    {
      id: 12,
      number: '12',
      title: 'Prosedur Penilaian Kinerja',
      description: 'Penilaian kinerja dilakukan setiap 6 bulan sekali dengan melibatkan self assessment, penilaian atasan, dan feedback session.'
    },
    {
      id: 13,
      number: '13',
      title: 'Prosedur Mutasi Karyawan',
      description: 'Mutasi karyawan internal harus melalui persetujuan kedua departemen terkait dengan mempertimbangkan kebutuhan bisnis.'
    },
    {
      id: 14,
      number: '14',
      title: 'Prosedur Promosi Jabatan',
      description: 'Promosi jabatan dilakukan berdasarkan penilaian kinerja, kompetensi, dan ketersediaan posisi dengan proses seleksi internal.'
    },
    {
      id: 15,
      number: '15',
      title: 'Prosedur Pengelolaan Dokumen',
      description: 'Semua dokumen perusahaan harus disimpan sesuai klasifikasi dan retention policy dengan akses terbatas sesuai kewenangan.'
    },
    {
      id: 16,
      number: '16',
      title: 'Prosedur Keamanan Data',
      description: 'Karyawan wajib menjaga kerahasiaan data perusahaan, menggunakan password yang kuat, dan tidak membagikan akses ke pihak ketiga.'
    },
    {
      id: 17,
      number: '17',
      title: 'Prosedur Penggunaan Aset',
      description: 'Penggunaan aset perusahaan harus sesuai fungsi dan keperluan kerja. Peminjaman aset harus melalui persetujuan asset management.'
    },
    {
      id: 18,
      number: '18',
      title: 'Prosedur Evakuasi Darurat',
      description: 'Setiap karyawan wajib mengetahui jalur evakuasi, titik kumpul, dan prosedur tanggap darurat sesuai simulasi yang dilakukan.'
    },
    {
      id: 19,
      number: '19',
      title: 'Prosedur Kunjungan Tamu',
      description: 'Tamu wajib melapor ke resepsionis, mengisi buku tamu, dan didampingi oleh karyawan yang bertanggung jawab selama di area perusahaan.'
    },
    {
      id: 20,
      number: '20',
      title: 'Prosedur Laporan Insiden',
      description: 'Setiap insiden atau kecelakaan kerja harus dilaporkan segera kepada atasan dan HSE untuk investigasi dan tindakan korektif.'
    }
  ]);

  // Pagination
  const totalPages = Math.ceil(prosedurData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = prosedurData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus prosedur ini?')) {
      setProsedurData(prosedurData.filter(item => item.id !== id));
    }
  };

  const ProsedurCard = ({ data }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4 flex-1">
        {/* Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gray-50 border-2 border-slate-700 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-slate-700">{data.number}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{data.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <button className="flex-1 bg-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
          <Edit2 className="h-4 w-4" />
          Edit
        </button>
        <button 
          onClick={() => handleDelete(data.id)}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Hapus
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
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Prosedur Perusahaan</h1>
                <p className="text-slate-200 text-base md:text-lg mb-4">Kelola prosedur dan standar operasional perusahaan</p>
                <button className="bg-white text-slate-800 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Tambah Prosedur
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
            <ProsedurCard key={item.id} data={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, prosedurData.length)} of {prosedurData.length} entries
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
    </div>
  );
};

export default Prosedur;