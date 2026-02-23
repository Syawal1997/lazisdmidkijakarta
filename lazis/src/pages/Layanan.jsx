import { useState } from 'react';
import { Link } from 'react-router-dom';

const Layanan = ({ subPage }) => {
  const [activeTab, setActiveTab] = useState(subPage || 'kantor');

  // Map subPage prop to state if it changes
  if (subPage && subPage !== activeTab) {
      setActiveTab(subPage);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'kantor':
        return (
          <div className="animate-fade-in">
             <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                   <i className="bi bi-building fs-3"></i>
                </div>
                <div>
                   <h2 className="fw-bold mb-0">Kantor Layanan</h2>
                   <p className="text-muted mb-0">Kunjungi kantor kami untuk layanan langsung</p>
                </div>
             </div>
             
             <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="row g-0">
                   <div className="col-md-6">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.338872656363!2d106.845599314769!3d-6.219036995498068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f46408287e07%3A0x68551918451846b0!2sMasjid%20Raya%20DMI%20Provinsi%20DKI%20Jakarta!5e0!3m2!1sid!2sid!4v1679000000000!5m2!1sid!2sid" 
                        width="100%" 
                        height="100%" 
                        style={{border:0, minHeight: '300px'}} 
                        allowFullScreen="" 
                        loading="lazy"
                        title="Lokasi Kantor"
                      ></iframe>
                   </div>
                   <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                      <h5 className="fw-bold mb-3">Kantor Pusat</h5>
                      <p className="text-secondary mb-4">
                         Jl. Masjid Raya No. 1, RT.01/RW.01, Jati Pulo, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11430
                      </p>
                      
                      <h6 className="fw-bold mb-2">Jam Operasional</h6>
                      <ul className="list-unstyled text-secondary small mb-0">
                         <li className="mb-1 d-flex justify-content-between"><span>Senin - Jumat:</span> <span>08.00 - 16.00 WIB</span></li>
                         <li className="d-flex justify-content-between"><span>Sabtu - Minggu:</span> <span>Tutup</span></li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'konsultasi':
        return (
          <div className="animate-fade-in text-center py-4">
             <div className="bg-success bg-opacity-10 p-4 rounded-circle text-success d-inline-block mb-4">
                 <span style={{ fontSize: '3rem' }}>💬</span>
             </div>
             <h2 className="fw-bold mb-3">Konsultasi ZISWAF</h2>
             <p className="text-secondary mb-4 mw-600 mx-auto">
                Bingung menghitung zakat? Ingin berkonsultasi seputar hukum waris atau wakaf? 
                Tim asatidz kami siap membantu Anda.
             </p>
             <a href="https://wa.me/6282117460200" target="_blank" rel="noreferrer" className="btn btn-success btn-lg rounded-pill px-5 shadow-lg">
                Chat via WhatsApp
             </a>
          </div>
        );
      case 'rekening':
        return (
          <div className="animate-fade-in">
             <div className="text-center mb-5">
                <h2 className="fw-bold">Rekening Donasi</h2>
                <p className="text-secondary">Salurkan donasi terbaik Anda melalui rekening resmi kami</p>
             </div>
             
             <div className="row g-4 justify-content-center">
                {[
                   { bank: 'BSI', no: '700.1234.5678', name: 'Lazis DMI DKI Jakarta', color: '#00a39d' },
                   { bank: 'Bank Mandiri', no: '123.00.0456789.0', name: 'Lazis DMI DKI Jakarta', color: '#003d79' },
                   { bank: 'BCA', no: '001.234.5678', name: 'Lazis DMI DKI Jakarta', color: '#005ca9' }
                ].map((rek, i) => (
                   <div key={i} className="col-md-6 col-lg-4">
                      <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center hover-lift">
                         <h5 className="fw-bold mb-1" style={{ color: rek.color }}>{rek.bank}</h5>
                         <div className="my-3 py-2 bg-light rounded-3">
                            <h4 className="fw-bold mb-0 text-dark letter-spacing-1">{rek.no}</h4>
                         </div>
                         <p className="small text-secondary mb-0">a.n {rek.name}</p>
                         <button 
                            className="btn btn-sm btn-outline-secondary mt-3 rounded-pill"
                            onClick={() => navigator.clipboard.writeText(rek.no)}
                         >
                            Salin No. Rekening
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        );
      case 'laporan':
        return (
          <div className="animate-fade-in">
             <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold mb-0">Laporan Tahunan</h2>
                <div className="dropdown">
                   <button className="btn btn-outline-secondary dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
                      Tahun 2024
                   </button>
                </div>
             </div>
             
             <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-light">
                <div className="mb-3">
                   <i className="bi bi-file-earmark-pdf fs-1 text-danger"></i>
                </div>
                <h4 className="fw-bold">Annual Report 2024</h4>
                <p className="text-secondary">Laporan kinerja dan keuangan Lazis DMI DKI Jakarta Tahun 2024</p>
                <div>
                   <button className="btn btn-primary rounded-pill px-4">
                      <i className="bi bi-download me-2"></i> Download PDF
                   </button>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-5 mt-5">
      <div className="container py-4">
        <div className="row">
           <div className="col-lg-3 mb-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '100px' }}>
                 <div className="list-group list-group-flush">
                    {[
                       { id: 'kantor', label: 'Kantor Layanan', icon: '🏢' },
                       { id: 'konsultasi', label: 'Konsultasi', icon: '💬' },
                       { id: 'rekening', label: 'Info Rekening', icon: '💳' },
                       { id: 'laporan', label: 'Laporan', icon: '📊' }
                    ].map(item => (
                       <Link 
                          key={item.id} 
                          to={`/${item.id === 'laporan' ? 'annual-report' : item.id === 'rekening' ? 'info-rekening' : item.id === 'kantor' ? 'kantor-layanan' : item.id}`}
                          className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${activeTab === item.id ? 'bg-success text-white fw-bold' : 'text-secondary'}`}
                          onClick={() => setActiveTab(item.id)}
                       >
                          <span>{item.icon}</span> {item.label}
                       </Link>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="col-lg-9">
              {renderContent()}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Layanan;