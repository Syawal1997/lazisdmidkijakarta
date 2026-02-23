import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Tentang Kami */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-success">Lazis DMI DKI Jakarta</h5>
            <p className="text-secondary small">
              Lembaga Amil Zakat yang dikelola oleh Dewan Masjid Indonesia Provinsi DKI Jakarta. 
              Menebar kebaikan dan memberdayakan umat melalui dana ZISWAF yang dikelola secara amanah dan profesional.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white hover-success"><i className="bi bi-facebook"></i> FB</a>
              <a href="#" className="text-white hover-success"><i className="bi bi-instagram"></i> IG</a>
              <a href="#" className="text-white hover-success"><i className="bi bi-youtube"></i> YT</a>
            </div>
          </div>

          {/* Program */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Program Kami</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/program/pendidikan" className="text-decoration-none text-secondary hover-white">Pendidikan</Link></li>
              <li><Link to="/program/kesehatan" className="text-decoration-none text-secondary hover-white">Kesehatan</Link></li>
              <li><Link to="/program/ekonomi" className="text-decoration-none text-secondary hover-white">Ekonomi Umat</Link></li>
              <li><Link to="/program/kemanusiaan" className="text-decoration-none text-secondary hover-white">Kemanusiaan</Link></li>
            </ul>
          </div>

          {/* Tautan Cepat */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Tautan</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/tentang-kami" className="text-decoration-none text-secondary hover-white">Tentang Kami</Link></li>
              <li><Link to="/kalkulator-zakat" className="text-decoration-none text-secondary hover-white">Kalkulator Zakat</Link></li>
              <li><Link to="/info-rekening" className="text-decoration-none text-secondary hover-white">Info Rekening</Link></li>
              <li><Link to="/berita" className="text-decoration-none text-secondary hover-white">Berita Terkini</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3">Hubungi Kami</h6>
            <ul className="list-unstyled small text-secondary d-flex flex-column gap-2">
              <li className="d-flex gap-2">
                <span>📍</span>
                <span>Jl. Masjid Raya No. 1, Jakarta</span>
              </li>
              <li className="d-flex gap-2">
                <span>📞</span>
                <span>(021) 1234-5678</span>
              </li>
              <li className="d-flex gap-2">
                <span>📱</span>
                <span>+62 821-1746-0200 (WA)</span>
              </li>
              <li className="d-flex gap-2">
                <span>✉️</span>
                <span>info@lazisdmidki.id</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center small text-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} Lazis DMI DKI Jakarta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;