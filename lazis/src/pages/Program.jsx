import { motion } from 'framer-motion';

const formatRp = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n).replace('Rp', 'Rp ');

const Program = ({ kategori }) => {
  // Data Program
  const programs = [
    { id: 1, title: "Beasiswa Santri Dhuafa", cat: "pendidikan", collected: 45000000, target: 100000000, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Layanan Ambulans Gratis", cat: "kesehatan", collected: 175000000, target: 250000000, image: "https://images.unsplash.com/photo-1587507593720-341525f2b60c?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "Pemberdayaan UMKM Masjid", cat: "ekonomi", collected: 15000000, target: 50000000, image: "https://images.unsplash.com/photo-1578574515318-de9205466f14?auto=format&fit=crop&q=80&w=400" },
    { id: 4, title: "Tanggap Bencana Kemanusiaan", cat: "kemanusiaan", collected: 42000000, target: 50000000, image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=400" },
    { id: 5, title: "Sedekah Pohon & Lingkungan", cat: "lingkungan", collected: 2000000, target: 10000000, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" },
  ];

  const filtered = kategori === 'donasi' 
    ? programs 
    : programs.filter(p => p.cat === kategori);

  return (
    <section className="py-5 mt-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3 fw-bold">Program Kebaikan</span>
          <h2 className="fw-bold display-6">
            {kategori === 'donasi' ? 'Semua Program Unggulan' : `Program ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`}
          </h2>
          <p className="text-muted max-w-2xl mx-auto mt-2">Salurkan donasi terbaik Anda untuk membantu sesama melalui berbagai program kami.</p>
        </div>

        <div className="row g-4">
          {filtered.length > 0 ? filtered.map((item, index) => {
            const progress = (item.collected / item.target) * 100;
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-lg-4 col-md-6"
              >
                <div className="card h-100 border-0 shadow-sm overflow-hidden group">
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img 
                      src={item.image} 
                      className="card-img-top w-100 h-100 object-fit-cover transition-normal group-hover:scale-110" 
                      alt={item.title}
                    />
                    <div className="position-absolute top-0 start-0 p-3">
                      <span className="badge bg-white text-success shadow-sm py-2 px-3 fw-bold">
                        {item.cat.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">{item.title}</h5>
                    
                    <div className="progress-container mb-2" style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                      <div 
                        className="progress-fill bg-success" 
                        style={{ height: '100%', width: `${progress}%`, borderRadius: '4px' }}
                      ></div>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-4 small">
                      <div className="d-flex flex-column">
                        <span className="text-muted">Terkumpul</span>
                        <span className="fw-bold text-success">{formatRp(item.collected)}</span>
                      </div>
                      <div className="d-flex flex-column text-end">
                        <span className="text-muted">Target</span>
                        <span className="fw-bold">{formatRp(item.target)}</span>
                      </div>
                    </div>
                    
                    <button className="btn btn-success w-100 py-2 fw-bold">Donasi Sekarang</button>
                  </div>
                </div>
              </motion.div>
            );
          }) : (
            <div className="col-12 text-center py-5">
              <div className="bg-light p-5 rounded-4 border border-dashed">
                <p className="text-muted mb-0">Belum ada program di kategori ini.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Program;