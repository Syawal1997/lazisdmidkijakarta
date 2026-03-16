/**
 * Layanan.jsx
 * Halaman yang menampilkan informasi operasional kantor, konsultasi WA,
 * informasi rekening donasi, dan laporan tahunan.
 */
import React, { useState } from 'react';

const Layanan = ({ subPage }) => {
  // State untuk memberikan feedback visual saat nomor rekening disalin
  const [copied, setCopied] = useState('');

  /**
   * Fungsi untuk menyalin teks (nomor rekening) ke clipboard user.
   */
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000); // Reset status setelah 2 detik
  };

  return (
    <section className="py-5 mt-5 bg-light min-vh-100">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* 
                SEKSI: Kantor Layanan 
                Menampilkan alamat fisik dan integrasi Google Maps (Iframe)
            */}
            {subPage === 'kantor' && (
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-5 p-4 p-lg-5 bg-white">
                    <h2 className="fw-bold mb-4">Kantor Layanan</h2>
                    {/* Detail Kontak */}
                    <div className="d-flex gap-3 mb-4">
                      <div className="text-success fs-4"><i className="fas fa-map-marker-alt"></i></div>
                      <div>
                        <h6 className="fw-bold mb-1">Alamat Pusat</h6>
                        <p className="text-muted small mb-0">
                          Gedung Graha Mental Spiritual Lt. 4, Jl. KH. Mas Mansyur No. 71, Tanah Abang, Jakarta Pusat
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <div className="text-success fs-4">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Jam Operasional</h6>
                        <p className="text-muted small mb-0">
                          Senin - Jumat: 08:00 - 16:00 WIB<br />
                          Sabtu - Minggu: Tutup
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <div className="text-success fs-4">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Telepon</h6>
                        <p className="text-muted small mb-0">(021) 1234 5678</p>
                      </div>
                    </div>
                    <a 
                      href="https://maps.app.goo.gl/YourMapLinkHere" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline-success w-100 mt-2"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                  <div className="col-md-7">
                    {/* Iframe Google Maps untuk visualisasi lokasi */}
                    <div className="h-100" style={{ minHeight: '400px' }}>
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.568415715978!2d106.814232!3d-6.1884611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f69b82173f47%3A0x6b78e1c66743b591!2sGraha%20Mental%20Spiritual!5e0!3m2!1sen!2sid!4v1710580000000!5m2!1sen!2sid" 
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 
                SEKSI: Konsultasi 
                Menghubungkan user langsung ke WhatsApp Admin
            */}
            {subPage === 'konsultasi' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white text-center">
                <div className="mb-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <i className="fab fa-whatsapp fa-3x"></i>
                  </div>
                  <h2 className="fw-bold">Konsultasi Syariah</h2>
                  <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
                    Ada pertanyaan seputar Zakat, Infaq, Shodaqoh, atau perhitungan waris? Tim ahli kami siap membantu Anda.
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="p-4 border rounded-4 mb-4">
                      <h5 className="fw-bold mb-3">Layanan Cepat via WhatsApp</h5>
                      <p className="small text-muted mb-4">Klik tombol di bawah untuk langsung terhubung dengan petugas layanan kami.</p>
                      {/* Tautan wa.me dengan pesan teks otomatis */}
                      <a 
                        href="https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20ingin%20berkonsultasi%20mengenai%20zakat" 
                        target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg px-5 rounded-pill shadow-sm"
                      >
                        <i className="fab fa-whatsapp me-2"></i> Chat Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 
                SEKSI: Informasi Rekening 
                Daftar bank untuk transfer donasi dengan fitur salin nomor
            */}
            {subPage === 'rekening' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="fw-bold">Informasi Rekening</h2>
                  <p className="text-muted">Salurkan ZISWAF Anda melalui rekening resmi Lazis DMI DKI Jakarta</p>
                </div>
                
                <div className="row g-4 justify-content-center">
                  {/* Card Rekening Zakat */}
                  <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">ZAKAT</span>
                        <h5 className="mb-0 fw-bold">Bank BSI</h5>
                      </div>
                      <h4 className="fw-bold mb-1">7123 4567 89</h4>
                      <p className="text-muted small mb-4">a.n Lazis DMI DKI Jakarta</p>
                      <button 
                        className={`btn w-100 rounded-pill ${copied === 'bsi_zakat' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleCopy('7123456789', 'bsi_zakat')}
                      >
                        {copied === 'bsi_zakat' ? <><i className="fas fa-check me-2"></i> Berhasil Salin</> : <><i className="far fa-copy me-2"></i> Salin Rekening</>}
                      </button>
                    </div>
                  </div>

                  {/* Card Rekening Infaq */}
                  <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">INFAQ/SOSIAL</span>
                        <h5 className="mb-0 fw-bold">Bank BSI</h5>
                      </div>
                      <h4 className="fw-bold mb-1">7987 6543 21</h4>
                      <p className="text-muted small mb-4">a.n Lazis DMI DKI Jakarta</p>
                      <button 
                        className={`btn w-100 rounded-pill ${copied === 'bsi_infaq' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleCopy('7987654321', 'bsi_infaq')}
                      >
                        {copied === 'bsi_infaq' ? <><i className="fas fa-check me-2"></i> Berhasil Salin</> : <><i className="far fa-copy me-2"></i> Salin Rekening</>}
                      </button>
                    </div>
                  </div>

                  {/* Card Rekening Wakaf */}
                  <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">WAKAF</span>
                        <h5 className="mb-0 fw-bold">Bank DKI Syariah</h5>
                      </div>
                      <h4 className="fw-bold mb-1">123 45 67890</h4>
                      <p className="text-muted small mb-4">a.n Lazis DMI DKI Jakarta</p>
                      <button 
                        className={`btn w-100 rounded-pill ${copied === 'dki_wakaf' ? 'btn-warning text-white' : 'btn-outline-warning'}`}
                        onClick={() => handleCopy('1234567890', 'dki_wakaf')}
                      >
                        {copied === 'dki_wakaf' ? <><i className="fas fa-check me-2"></i> Berhasil Salin</> : <><i className="far fa-copy me-2"></i> Salin Rekening</>}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info border-0 rounded-4 mt-5 d-flex gap-3 align-items-start p-4">
                  <i className="fas fa-info-circle fs-4 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Konfirmasi Pembayaran</h6>
                    <p className="small mb-0">Mohon tambahkan kode unik <b>"01"</b> di akhir nominal transfer atau kirimkan bukti transfer Anda ke WhatsApp layanan kami untuk proses pendataan yang lebih akurat.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 
                SEKSI: Laporan Tahunan 
                Daftar file PDF laporan pertanggungjawaban
            */}
            {subPage === 'laporan' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white text-center">
                <div className="mb-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-file-invoice-dollar fa-3x"></i>
                  </div>
                  <h2 className="fw-bold">Annual Report</h2>
                  <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
                    Wujud transparansi dan akuntabilitas kami dalam mengelola amanah ZISWAF umat.
                  </p>
                </div>
                <div className="row g-4">
                  {[2024, 2023, 2022].map((year) => (
                    <div className="col-md-4" key={year}>
                      <div className="p-4 border rounded-4 hover-shadow transition-all">
                        <i className="far fa-file-pdf fa-2x text-danger mb-3"></i>
                        <h6 className="fw-bold mb-3">Laporan Keuangan {year}</h6>
                        <button className="btn btn-outline-success btn-sm w-100 rounded-pill">Download PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layanan;