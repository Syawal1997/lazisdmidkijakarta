import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import Komponen
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Halaman
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Zakat from './pages/Zis';
import Program from './pages/Program';
import Layanan from './pages/Layanan';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Area Konten Utama */}
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
              {/* Beranda */}
              <Route path="/" element={<Beranda />} />

              {/* Group Profil */}
              <Route path="/tentang-kami" element={<Profil subPage="tentang" />} />
              <Route path="/visi-misi" element={<Profil subPage="visimisi" />} />
              <Route path="/susunan-pengurus" element={<Profil subPage="pengurus" />} />

              {/* Group Zakat */}
              <Route path="/zakat" element={<Zakat type="zakat" />} />
              <Route path="/kalkulator-zakat" element={<Zakat type="kalkulator" />} />
              <Route path="/edukasi" element={<Zakat type="edukasi" />} />
              <Route path="/infaq" element={<Zakat type="infaq" />} />

              {/* Group Program */}
              <Route path="/program" element={<Program kategori="donasi" />} />
              <Route path="/program/pendidikan" element={<Program kategori="pendidikan" />} />
              <Route path="/program/kesehatan" element={<Program kategori="kesehatan" />} />
              <Route path="/program/ekonomi" element={<Program kategori="ekonomi" />} />
              <Route path="/program/kemanusiaan" element={<Program kategori="kemanusiaan" />} />
              <Route path="/program/lingkungan" element={<Program kategori="lingkungan" />} />

              {/* Group Layanan */}
              <Route path="/kantor-layanan" element={<Layanan subPage="kantor" />} />
              <Route path="/konsultasi" element={<Layanan subPage="konsultasi" />} />
              <Route path="/info-rekening" element={<Layanan subPage="rekening" />} />
              <Route path="/annual-report" element={<Layanan subPage="laporan" />} />

              {/* Halaman Standalone */}
              <Route path="/penerima-manfaat" element={<div className="container py-5 mt-5"><h2>Halaman Penerima Manfaat</h2></div>} />
              <Route path="/berita" element={<div className="container py-5 mt-5"><h2>Halaman Berita Terkini</h2></div>} />

              {/* Fallback */}
              <Route path="*" element={<Beranda />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default App;