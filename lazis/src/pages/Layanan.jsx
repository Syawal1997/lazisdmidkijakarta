const Layanan = ({ subPage }) => {
  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="card p-5 shadow-sm border-0">
            {subPage === 'kantor' && (
                <>
                    <h2>Kantor Layanan</h2>
                    <p>Jl. Protokol Masjid No. 1, Jakarta.</p>
                </>
            )}
            {subPage === 'konsultasi' && (
                <>
                    <h2>Konsultasi Syariah</h2>
                    <p>Hubungi kami via WhatsApp untuk konsultasi zakat & waris.</p>
                    <button className="btn btn-success">Chat WhatsApp</button>
                </>
            )}
            {subPage === 'rekening' && (
                <>
                    <h2>Informasi Rekening</h2>
                    <div className="alert alert-info">BSI: 700.xxx.xxxx a.n Lazis DMI</div>
                    <div className="alert alert-warning">Mandiri: 123.xxx.xxxx a.n Lazis DMI</div>
                </>
            )}
            {subPage === 'laporan' && (
                <>
                    <h2>Annual Report</h2>
                    <p>Download Laporan Keuangan 2024 (PDF)</p>
                </>
            )}
        </div>
      </div>
    </section>
  );
};
export default Layanan;