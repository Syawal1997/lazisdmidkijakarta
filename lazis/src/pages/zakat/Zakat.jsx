import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const jenisZakat = [
    {
        icon: '💰',
        judul: 'Zakat Mal',
        desc: 'Zakat atas harta kekayaan yang telah memenuhi syarat nisab dan haul selama satu tahun.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '👔',
        judul: 'Zakat Profesi',
        desc: 'Zakat wajib atas penghasilan dari pekerjaan atau profesi yang telah mencapai nisab.',
        nisab: 'Rp 6.725.000/bln',
        kadar: '2,5%',
    },
    {
        icon: '💍',
        judul: 'Zakat Emas & Perak',
        desc: 'Zakat atas kepemilikan emas dan perak yang disimpan sebagai aset dan telah mencapai haul.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🛒',
        judul: 'Zakat Perdagangan',
        desc: 'Zakat atas harta usaha atau barang dagangan yang diperjualbelikan untuk memperoleh keuntungan.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🌾',
        judul: 'Zakat Pertanian',
        desc: 'Zakat atas hasil pertanian seperti padi, jagung, dan hasil tanaman pangan lainnya.',
        nisab: '653 kg beras',
        kadar: '5-10%',
    },
    {
        icon: '🌙',
        judul: 'Zakat Fitrah',
        desc: 'Zakat wajib bagi setiap Muslim yang ditunaikan pada bulan Ramadan sebelum Salat Idulfitri.',
        nisab: 'Setiap Muslim',
        kadar: '2,5 kg beras',
    },
];

const ZakatPage = () => (
    <div className="zw-page pt-5">
        <style>{`
      .zw-hero {
        background: linear-gradient(135deg, var(--primary-900), var(--primary-600));
        padding: 5rem 0; color: white;
      }
      .zw-card {
        background: white; border-radius: 1rem; padding: 2rem;
        box-shadow: var(--shadow-md); transition: all 0.3s;
        border: 1px solid var(--border-color);
        height: 100%;
      }
      .zw-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
        border-color: var(--primary-200);
      }
      .zw-badge {
        font-size: 0.75rem; font-weight: 700;
        padding: 0.25rem 0.75rem; border-radius: 2rem;
        background: var(--primary-50); color: var(--primary-700);
      }
    `}</style>

        <section className="zw-hero mb-5">
            <div className="container text-center">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold letter-spacing-1"
                >Panduan Zakat</motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="display-4 fw-bold mb-3"
                >Tunaikan Zakat, <br />Bersihkan Harta</motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lead opacity-90 max-w-2xl mx-auto mb-5"
                >Layanan Zakat Lazis DMI DKI Jakarta hadir untuk memudahkan Anda menunaikan kewajiban dengan amanah dan transparan.</motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="d-flex justify-content-center gap-3"
                >
                    <Link to="/kalkulator-zakat" className="btn btn-light btn-lg px-5 fw-bold text-success rounded-pill shadow">Hitung Zakat</Link>
                    <Link to="/infaq" className="btn btn-outline-light btn-lg px-5 rounded-pill">Infaq & Shodaqoh</Link>
                </motion.div>
            </div>
        </section>

        <section className="container py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold mb-2">Jenis-Jenis Zakat</h2>
                <p className="text-muted">Kenali kewajiban zakat Anda berdasarkan jenis harta yang dimiliki.</p>
            </div>

            <div className="row g-4">
                {jenisZakat.map((z, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="col-lg-4 col-md-6"
                    >
                        <div className="zw-card">
                            <div className="fs-1 mb-3">{z.icon}</div>
                            <h4 className="fw-bold mb-3">{z.judul}</h4>
                            <p className="text-muted small mb-4">{z.desc}</p>
                            <div className="d-flex flex-wrap gap-2 mt-auto">
                                <span className="zw-badge">Nisab: {z.nisab}</span>
                                <span className="zw-badge">Kadar: {z.kadar}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        <section className="bg-success bg-opacity-5 py-5 mt-5">
            <div className="container py-5 text-center">
                <h2 className="fw-bold mb-4">Ingin Konsultasi Zakat?</h2>
                <p className="text-muted mb-5 max-w-2xl mx-auto">Tim ahli kami siap membantu Anda memahami lebih dalam mengenai perhitungan dan penyaluran zakat sesuai syariat.</p>
                <a href="https://wa.me/6282117460200" className="btn btn-success btn-lg px-5 rounded-pill fw-bold shadow-sm">
                    <i className="fab fa-whatsapp me-2"></i> Hubungi Konsultan Zakat
                </a>
            </div>
        </section>
    </div>
);

export default ZakatPage;
