import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-4">
            <h4 className="fw-bold text-success mb-4 d-flex align-items-center gap-2">
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                <span className="text-white small">L</span>
              </div>
              Lazis DMI DKI
            </h4>
            <p className="text-white-50 small pe-lg-4 lh-lg">
              Lembaga Amil Zakat Dewan Masjid Indonesia Provinsi DKI Jakarta. 
              Berkhidmat untuk mengoptimalkan potensi ZISWAF demi kesejahteraan umat dan kemajuan masjid melalui program-program yang berkelanjutan.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="bg-white bg-opacity-10 text-white-50 p-2 rounded-circle hover-success transition-fast d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 text-white-50 p-2 rounded-circle hover-success transition-fast d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 text-white-50 p-2 rounded-circle hover-success transition-fast d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-white bg-opacity-10 text-white-50 p-2 rounded-circle hover-success transition-fast d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-4 text-white">Layanan Utama</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/zakat" className="text-white-50 text-decoration-none hover-success transition-fast">Zakat</Link></li>
              <li className="mb-2"><Link to="/infaq" className="text-white-50 text-decoration-none hover-success transition-fast">Infaq & Shodaqoh</Link></li>
              <li className="mb-2"><Link to="/kalkulator-zakat" className="text-white-50 text-decoration-none hover-success transition-fast">Kalkulator Zakat</Link></li>
              <li className="mb-2"><Link to="/konsultasi" className="text-white-50 text-decoration-none hover-success transition-fast">Konsultasi</Link></li>
              <li className="mb-2"><Link to="/info-rekening" className="text-white-50 text-decoration-none hover-success transition-fast">Info Rekening</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4">
            <h6 className="fw-bold mb-4 text-white">Program Kami</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/program/pendidikan" className="text-white-50 text-decoration-none hover-success transition-fast">Pendidikan</Link></li>
              <li className="mb-2"><Link to="/program/kesehatan" className="text-white-50 text-decoration-none hover-success transition-fast">Kesehatan</Link></li>
              <li className="mb-2"><Link to="/program/ekonomi" className="text-white-50 text-decoration-none hover-success transition-fast">Ekonomi</Link></li>
              <li className="mb-2"><Link to="/program/kemanusiaan" className="text-white-50 text-decoration-none hover-success transition-fast">Kemanusiaan</Link></li>
              <li className="mb-2"><Link to="/program/lingkungan" className="text-white-50 text-decoration-none hover-success transition-fast">Lingkungan</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h6 className="fw-bold mb-4 text-white">Kontak Kami</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-3 d-flex gap-3">
                <span className="text-success"><i className="fas fa-map-marker-alt"></i></span>
                <span>Gedung Graha Mental Spiritual Lt. 4, Jl. KH. Mas Mansyur No. 71, Tanah Abang, Jakarta Pusat</span>
              </li>
              <li className="mb-3 d-flex gap-3 align-items-center">
                <span className="text-success"><i className="fas fa-phone-alt"></i></span>
                <span>(021) 1234 5678</span>
              </li>
              <li className="mb-3 d-flex gap-3 align-items-center">
                <span className="text-success"><i className="fas fa-envelope"></i></span>
                <span>info@lazisdmidki.id</span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="opacity-10 mb-4" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white-50 small">&copy; 2026 Lazis DMI DKI Jakarta. Amanah & Profesional.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0 small">
              <li className="list-inline-item me-3"><Link to="/tentang-kami" className="text-white-50 text-decoration-none hover-success">Tentang Kami</Link></li>
              <li className="list-inline-item"><Link to="/kantor-layanan" className="text-white-50 text-decoration-none hover-success">Lokasi</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;