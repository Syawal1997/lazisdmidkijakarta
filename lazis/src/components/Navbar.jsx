import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Menggunakan API Bootstrap native (jika terdeteksi secara manual atau melalui class)
      // Cara paling aman tanpa dependensi tambahan adalah menggunakan data-bs-toggle manual
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }, [location]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'shadow-md bg-white/95' : 'bg-white/90'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          {/* <img src="/logo.png" alt="Lazis DMI" height="40" /> */}
          <span className="fw-bold text-success">Lazis DMI DKI</span>
        </Link>
        
        <button 
          className="navbar-toggler border-0 shadow-none p-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-1 align-items-center">

            {/* Profil Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profil
              </a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/tentang-kami">Tentang Kami</NavLink></li>
                <li><NavLink className="dropdown-item" to="/visi-misi">Visi &amp; Misi</NavLink></li>
                <li><NavLink className="dropdown-item" to="/susunan-pengurus">Susunan Pengurus</NavLink></li>
              </ul>
            </li>

            {/* Zakat Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Zakat & Infaq
              </a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/zakat">Bayar Zakat</NavLink></li>
                <li><NavLink className="dropdown-item" to="/kalkulator-zakat">🧮 Kalkulator Zakat</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" to="/infaq">Infaq &amp; Shodaqoh</NavLink></li>
                <li><NavLink className="dropdown-item" to="/edukasi">Edukasi Zakat</NavLink></li>
              </ul>
            </li>

            {/* Program Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Program
              </a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/program">Semua Program</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" to="/program/pendidikan">🎓 Pendidikan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/kesehatan">🏥 Kesehatan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/ekonomi">💼 Ekonomi</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/kemanusiaan">🤝 Kemanusiaan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/lingkungan">🌱 Lingkungan</NavLink></li>
              </ul>
            </li>

            {/* Layanan Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Layanan
              </a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/kantor-layanan">Kantor Layanan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/konsultasi">Konsultasi ZIS</NavLink></li>
                <li><NavLink className="dropdown-item" to="/info-rekening">Info Rekening</NavLink></li>
                <li><NavLink className="dropdown-item" to="/annual-report">Laporan Tahunan</NavLink></li>
              </ul>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/berita">Berita</NavLink></li>
          </ul>
          
          <div className="d-flex ms-lg-4 gap-3 mt-3 mt-lg-0 align-items-center">
            <Link className="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold" to="/program">
              Donasi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;