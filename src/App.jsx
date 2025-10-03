import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

{/* dashboard */}
import Dashboard from "./page/dashboard/dashboard"

{/* layout */}
import Layout from "./components/layout"

{/* herosection */}
import HeroSection from "./page/herosection/herosection"

{/* layanan */}
import Layanan from "./page/layanan/layanan"
import Penjualan from "./page/layanan/penjualan"
import Galeri from "./page/layanan/galeri"

{/* produk */}
import ProdukKategori from "./page/produk/kategori"
import Produk from "./page/produk/produk"

{/* mitra */}
import MitraKategori from "./page/mitra/kategori"
import Mitra from "./page/mitra/mitra"

{/* berita */}
import BeritaKategori from "./page/berita/kategori"
import Berita from "./page/berita/berita"

{/* testimoni */}
import Testimoni from "./page/testimoni/testimoni"

{/* cabang */}
import Cabang from "./page/cabang/cabang"

{/* pengaturan */}
import Profil from "./page/pengaturan/profil"
import FilosofiLogo from "./page/pengaturan/filosofilogo"
import VisiMisi from "./page/pengaturan/visimisi"
import SyaratKetentuan from "./page/pengaturan/syaratketentuan"
import Faq from "./page/pengaturan/faq";
import Jabatan from "./page/pengaturan/jabatan"
import Struktur from "./page/pengaturan/struktur";
import Prosedur from "./page/pengaturan/prosedur"

{/* kontak */}
import MediaSosial from "./page/kontak/mediasosial"

{/* alumni */}
import Angkatan from "./page/alumni/angkatan"
import GaleriAlumni from "./page/alumni/galerialumni"

{/* lowongan */}
import Lowongan from "./page/lowongan/lowongan"
import AlurKerja from "./page/lowongan/alurkerja"

{/* notfound */}
import NotFound from "./page/notfound";


const App = () => {
  return (
    <Router>
          <Routes>
            {/* dashboard */}
            <Route path="/" element={<Layout> <Dashboard /> </Layout>} />

            {/* herosection */}
            <Route path="/hero-section" element={<Layout> <HeroSection /> </Layout>} />

            {/* layanan */}
            <Route path="/layanan" element={<Layout> <Layanan /> </Layout>} />
            <Route path="/penjualan" element={<Layout> <Penjualan /> </Layout>} />
            <Route path="/galeri" element={<Layout> <Galeri /> </Layout>} />

            {/* produk */}
            <Route path="/produk-kategori" element={<Layout> <ProdukKategori /> </Layout>} />
            <Route path="/produk" element={<Layout> <Produk /> </Layout>} />

            {/* mitra */}
            <Route path="/mitra-kategori" element={<Layout> <MitraKategori /> </Layout>} />
            <Route path="/mitra" element={<Layout> <Mitra /> </Layout>} />

            {/* berita */}
            <Route path="/berita-kategori" element={<Layout> <BeritaKategori /> </Layout>} />
            <Route path="/berita" element={<Layout> <Berita /> </Layout>} />

            {/* testimoni */}
            <Route path="/testimoni" element={<Layout> <Testimoni /> </Layout>} />

            {/* cabang */}
            <Route path="/cabang" element={<Layout> <Cabang /> </Layout>} />
            
            {/* pengaturan */}
            <Route path="/pengaturan-profil" element={<Layout> <Profil /> </Layout>} />
            <Route path="/pengaturan-filosofilogo" element={<Layout> <FilosofiLogo /> </Layout>} />
            <Route path="/pengaturan-visimisi" element={<Layout> <VisiMisi /> </Layout>} />
            <Route path="/pengaturan-syaratketentuan" element={<Layout> <SyaratKetentuan /> </Layout>} />
            <Route path="/pengaturan-faq" element={<Layout> <Faq /> </Layout>} />
            <Route path="/pengaturan-jabatan" element={<Layout> <Jabatan /> </Layout>} />
            <Route path="/pengaturan-struktur" element={<Layout> <Struktur /> </Layout>} />
            <Route path="/pengaturan-prosedur" element={<Layout> <Prosedur /> </Layout>} />

            {/* kontak */}
            <Route path="/mediasosial" element={<Layout> <MediaSosial /> </Layout>} />

            {/* alumni */}
            <Route path="/angkatan" element={<Layout> <Angkatan /> </Layout>} />
            <Route path="/galerialumni" element={<Layout> <GaleriAlumni /> </Layout>} />

            {/* lowongan */}
            <Route path="/lowongan" element={<Layout> <Lowongan /> </Layout>} />
            <Route path="/lowongan-alurkerja" element={<Layout> <AlurKerja /> </Layout>} />
            
            {/* notfound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
  );
};

export default App;