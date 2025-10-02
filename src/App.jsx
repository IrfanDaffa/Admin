import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./page/dashboard/dashboard"
import Layout from "./components/layout"
import HeroSection from "./page/herosection/herosection"
import Layanan from "./page/layanan/layanan"
import Penjualan from "./page/layanan/penjualan"
import Galeri from "./page/layanan/galeri"

import Profil from "./page/pengaturan/profil"
import FilosofiLogo from "./page/pengaturan/filosofilogo"
import VisiMisi from "./page/pengaturan/visimisi"
import SyaratKetentuan from "./page/pengaturan/syaratketentuan"
import Faq from "./page/pengaturan/faq";
import Jabatan from "./page/pengaturan/jabatan"
import Struktur from "./page/pengaturan/struktur";
import Prosedur from "./page/pengaturan/prosedur"

import Lowongan from "./page/lowongan/lowongan"
import AlurKerja from "./page/lowongan/alurkerja"


const App = () => {
  return (
    <Router>
          <Routes>
            
            <Route path="/" element={<Layout> <Dashboard /> </Layout>} />
            <Route path="/hero-section" element={<Layout> <HeroSection /> </Layout>} />
            <Route path="/layanan" element={<Layout> <Layanan /> </Layout>} />
            <Route path="/penjualan" element={<Layout> <Penjualan /> </Layout>} />
            <Route path="/galeri" element={<Layout> <Galeri /> </Layout>} />

            <Route path="/pengaturan-profil" element={<Layout> <Profil /> </Layout>} />
            <Route path="/pengaturan-filosofilogo" element={<Layout> <FilosofiLogo /> </Layout>} />
            <Route path="/pengaturan-visimisi" element={<Layout> <VisiMisi /> </Layout>} />
            <Route path="/pengaturan-syaratketentuan" element={<Layout> <SyaratKetentuan /> </Layout>} />
            <Route path="/pengaturan-faq" element={<Layout> <Faq /> </Layout>} />
            <Route path="/pengaturan-jabatan" element={<Layout> <Jabatan /> </Layout>} />
            <Route path="/pengaturan-struktur" element={<Layout> <Struktur /> </Layout>} />
            <Route path="/pengaturan-prosedur" element={<Layout> <Prosedur /> </Layout>} />

            <Route path="/lowongan" element={<Layout> <Lowongan /> </Layout>} />
            <Route path="/lowongan-alurkerja" element={<Layout> <AlurKerja /> </Layout>} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
    </Router>
  );
};

export default App;