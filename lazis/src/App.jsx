/**
 * App.jsx
 * Komponen root yang mengatur routing (navigasi) dan layout utama aplikasi.
 * Menggunakan React Router untuk navigasi dan Framer Motion untuk transisi halaman.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import Komponen Navigasi dan Global
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';

// Import Halaman Utama
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Zakat from './pages/Zis';
import Program from './pages/Program';
import Layanan from './pages/Layanan';

/**
 * Konfigurasi animasi transisi halaman menggunakan Framer Motion
 */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  const location = useLocation();

  return (
    <>
      {/* Header / Navigasi Atas */}
      <Navbar />

      {/* Area Konten Utama dengan Transisi Animasi */}
      <main style={{ minHeight: '80vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              {/* Rute Beranda */}
              <Route path="/" element={<Beranda />} />

              {/* Rute Group Profil (Tentang Kami, Visi Misi, dll) */}
              <Route path="/tentang-kami" element={<Profil subPage="tentang" />} />
              <Route path="/visi-misi" element={<Profil subPage="visimisi" />} />
              <Route path="/susunan-pengurus" element={<Profil subPage="pengurus" />} />

              {/* Rute Group ZISWAF (Zakat, Infaq, Kalkulator) */}
              <Route path="/zakat" element={<Zakat type="zakat" />} />
              <Route path="/kalkulator-zakat" element={<Zakat type="kalkulator" />} />
              <Route path="/edukasi" element={<Zakat type="edukasi" />} />
              <Route path="/infaq" element={<Zakat type="infaq" />} />

              {/* Rute Group Program Pemberdayaan */}
              <Route path="/program" element={<Program kategori="donasi" />} />
              <Route path="/program/pendidikan" element={<Program kategori="pendidikan" />} />
              <Route path="/program/kesehatan" element={<Program kategori="kesehatan" />} />
              <Route path="/program/ekonomi" element={<Program kategori="ekonomi" />} />
              <Route path="/program/kemanusiaan" element={<Program kategori="kemanusiaan" />} />
              <Route path="/program/lingkungan" element={<Program kategori="lingkungan" />} />

              {/* Rute Group Layanan Muzakki & Mustahik */}
              <Route path="/kantor-layanan" element={<Layanan subPage="kantor" />} />
              <Route path="/konsultasi" element={<Layanan subPage="konsultasi" />} />
              <Route path="/info-rekening" element={<Layanan subPage="rekening" />} />
              <Route path="/annual-report" element={<Layanan subPage="laporan" />} />

              {/* Halaman Berita & Penerima Manfaat */}
              <Route path="/penerima-manfaat" element={<div className="container py-5 mt-5"><h2>Halaman Penerima Manfaat</h2></div>} />
              <Route path="/berita" element={<div className="container py-5 mt-5"><h2>Halaman Berita Terkini</h2></div>} />

              {/* Jalur Fallback (Jika rute tidak ditemukan, kembali ke Beranda) */}
              <Route path="*" element={<Beranda />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer dan Tombol WhatsApp Melayang */}
      <Footer />
      <FloatingWA />
    </>
  );
}

export default App;