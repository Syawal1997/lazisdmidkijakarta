import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'shadow-sm py-2' : 'py-3'}`} 
         style={{ backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <span className="text-white small">L</span>
          </div>
          <span className="text-success">Lazis DMI DKI</span>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-2 align-items-center">

            {/* Profil Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Profil</a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/tentang-kami">Tentang Kami</NavLink></li>
                <li><NavLink className="dropdown-item" to="/visi-misi">Visi &amp; Misi</NavLink></li>
                <li><NavLink className="dropdown-item" to="/susunan-pengurus">Susunan Pengurus</NavLink></li>
              </ul>
            </li>

            {/* Zakat Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Zakat</a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/zakat">Zakat</NavLink></li>
                <li><NavLink className="dropdown-item" to="/kalkulator-zakat">🧮 Kalkulator Zakat</NavLink></li>
                <li><hr className="dropdown-divider opacity-10" /></li>
                <li><NavLink className="dropdown-item" to="/infaq">Infaq &amp; Shodaqoh</NavLink></li>
                <li><NavLink className="dropdown-item" to="/edukasi">Edukasi</NavLink></li>
              </ul>
            </li>

            {/* Program Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Program</a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/program">Semua Program</NavLink></li>
                <li><hr className="dropdown-divider opacity-10" /></li>
                <li><NavLink className="dropdown-item" to="/program/pendidikan">Pendidikan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/kesehatan">Kesehatan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/ekonomi">Ekonomi</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/kemanusiaan">Kemanusiaan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/program/lingkungan">Lingkungan</NavLink></li>
              </ul>
            </li>

            {/* Layanan Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Layanan</a>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><NavLink className="dropdown-item" to="/kantor-layanan">Kantor Layanan</NavLink></li>
                <li><NavLink className="dropdown-item" to="/konsultasi">Konsultasi</NavLink></li>
                <li><NavLink className="dropdown-item" to="/info-rekening">Info Rekening</NavLink></li>
                <li><NavLink className="dropdown-item" to="/annual-report">Annual Report</NavLink></li>
              </ul>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/berita">Berita</NavLink></li>
          </ul>
          <div className="ms-lg-4 mt-3 mt-lg-0">
            <Link className="btn btn-success rounded-pill px-4 py-2 shadow-sm fw-bold" to="/program">Donasi</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;