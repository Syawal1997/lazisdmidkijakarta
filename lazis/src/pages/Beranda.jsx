import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Beranda = () => {
  return (
    <>
      <section className="hero-section d-flex align-items-center py-5 overflow-hidden">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="col-lg-6"
            >
              <h1 className="display-3 fw-bold mb-4">
                Menebar Kebaikan, <br />
                <span className="text-success">Memuliakan Umat</span>
              </h1>
              <p className="lead mb-5 pe-lg-5">
                Lembaga Amil Zakat Dewan Masjid Indonesia DKI Jakarta. Berkhidmat untuk kemaslahatan umat melalui pengelolaan ZIS yang amanah dan transparan.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/zakat" className="btn btn-success btn-lg px-5 shadow-lg">Bayar Zakat</Link>
                <Link to="/program" className="btn btn-outline-success btn-lg px-5">Lihat Program</Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="col-lg-6 mt-5 mt-lg-0 text-center position-relative"
            >
              <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-success opacity-10 blur-3xl rounded-circle"></div>
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800" 
                className="img-fluid rounded-4 shadow-xl position-relative z-1" 
                alt="Banner Lazis DMI" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section Placeholder or Program Highlight */}
      <section className="py-5 bg-white border-top border-bottom border-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="p-4">
                <h2 className="fw-bold text-success mb-2">10K+</h2>
                <p className="text-muted mb-0">Muzakki Terdaftar</p>
              </div>
            </div>
            <div className="col-md-4 border-start border-end border-light">
              <div className="p-4">
                <h2 className="fw-bold text-success mb-2">50+</h2>
                <p className="text-muted mb-0">Program Aktif</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <h2 className="fw-bold text-success mb-2">100M+</h2>
                <p className="text-muted mb-0">Dana Disalurkan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="fw-bold mb-3">Mari Berkontribusi</h3>
            <p className="text-muted mb-4 max-w-2xl mx-auto">Pilih berbagai program kebaikan yang sesuai dengan niat ibadah Anda.</p>
            <Link to="/program" className="btn btn-link text-success text-decoration-none fw-bold">
              Lihat Semua Program <span className="ms-2">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default Beranda;