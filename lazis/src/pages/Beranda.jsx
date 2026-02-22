import { Link } from 'react-router-dom';

const Beranda = () => {
  return (
    <>
      <section className="hero-section d-flex align-items-center py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Menebar Kebaikan, <br /><span className="text-success">Memuliakan Umat</span></h1>
              <p className="lead text-secondary mb-4">Lembaga Amil Zakat Dewan Masjid Indonesia DKI Jakarta.</p>
              <div className="d-flex gap-2">
                <Link to="/zakat" className="btn btn-success btn-lg">Bayar Zakat</Link>
                <Link to="/program" className="btn btn-outline-secondary btn-lg">Donasi</Link>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center">
              <img src="https://placehold.co/500x350/198754/ffffff?text=Lazis+DMI" className="img-fluid rounded-4 shadow" alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      {/* Sekilas Program di Beranda */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3>Mari Berkontribusi</h3>
          <p>Pilih program kebaikan untuk disalurkan.</p>
          <Link to="/program" className="btn btn-link">Lihat Semua Program &rarr;</Link>
        </div>
      </section>
    </>
  );
};
export default Beranda;