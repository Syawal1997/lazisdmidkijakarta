import { Link } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';

const Beranda = () => {
  // Dummy data for Beranda
  const featuredPrograms = [
    { id: 1, title: "Beasiswa Dhuafa Berprestasi", cat: "pendidikan", target: 100000000, collected: 45000000 },
    { id: 2, title: "Layanan Ambulans Gratis 24 Jam", cat: "kesehatan", target: 250000000, collected: 120000000 },
    { id: 3, title: "Bantuan Modal Usaha Mikro", cat: "ekonomi", target: 50000000, collected: 15000000 },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center position-relative overflow-hidden" style={{ minHeight: '90vh', paddingTop: '80px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
            background: 'radial-gradient(circle at 10% 20%, rgb(240, 253, 244) 0%, rgb(255, 255, 255) 90%)',
            zIndex: -1 
        }}></div>
        
        {/* Decorative Shapes */}
        <div className="position-absolute top-0 end-0 mt-5 me-n5 opacity-25 d-none d-lg-block">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#15803d" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.6,33.2C59.1,44.2,47.7,53.2,35.2,60.6C22.7,68.1,9.1,74,-3.8,80.6C-16.7,87.1,-28.9,94.4,-40.2,89.5C-51.5,84.7,-61.9,67.7,-69.9,50.7C-77.9,33.7,-83.5,16.8,-81.4,1.2C-79.3,-14.4,-69.5,-28.7,-58.5,-40.4C-47.5,-52.1,-35.3,-61.1,-22.3,-69.3C-9.3,-77.5,4.5,-84.9,17.8,-83.3C31.1,-81.7,43.9,-71.1,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
        </div>

        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="badge bg-success bg-opacity-10 text-success mb-3 px-3 py-2 rounded-pill fw-bold">
                ✨ Lembaga Amil Zakat Terpercaya
              </span>
              <h1 className="display-4 fw-bold mb-4 text-dark lh-sm">
                Menebar Kebaikan, <br />
                <span className="text-success position-relative">
                   Memuliakan Umat
                   <svg className="position-absolute bottom-0 start-0 w-100" height="10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: -1, opacity: 0.3 }}>
                    <path d="M2.00025 7.00005C29.6231 3.52295 106.333 -1.82137 198.001 3.50005" stroke="#15803d" strokeWidth="3" strokeLinecap="round"/>
                   </svg>
                </span>
              </h1>
              <p className="lead text-secondary mb-5 pe-lg-5">
                Salurkan zakat, infaq, dan sedekah Anda melalui Lazis DMI DKI Jakarta. 
                Kami memastikan amanah Anda sampai kepada yang berhak dengan profesional dan transparan.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/zakat" className="btn btn-primary btn-lg px-4 py-3 rounded-pill shadow-lg hover-scale">
                  <span>Bayar Zakat</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/program" className="btn btn-outline-success btn-lg px-4 py-3 rounded-pill">
                  Lihat Program
                </Link>
              </div>
              
              <div className="d-flex gap-5 mt-5 pt-3 border-top border-secondary border-opacity-10">
                 <div>
                    <h4 className="fw-bold text-dark mb-0">15rb+</h4>
                    <p className="text-secondary small mb-0">Donatur Terdaftar</p>
                 </div>
                 <div>
                    <h4 className="fw-bold text-dark mb-0">850+</h4>
                    <p className="text-secondary small mb-0">Penerima Manfaat</p>
                 </div>
                 <div>
                    <h4 className="fw-bold text-dark mb-0">100%</h4>
                    <p className="text-secondary small mb-0">Transparan</p>
                 </div>
              </div>
            </div>
            
            <div className="col-lg-6 text-center position-relative">
              <div className="position-relative d-inline-block">
                  {/* Abstract blob background for image */}
                  <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-success bg-opacity-10 rounded-circle blur-3xl" style={{ filter: 'blur(60px)', zIndex: -1 }}></div>
                  <img 
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800" 
                    className="img-fluid rounded-4 shadow-xl position-relative z-2" 
                    alt="Kegiatan Sosial Penyaluran Zakat" 
                    loading="lazy"
                    style={{ transform: 'rotate(-2deg)', border: '8px solid white' }}
                  />
                  
                  {/* Floating Card */}
                  <div className="card position-absolute bottom-0 start-0 mb-n4 ms-n4 border-0 shadow-lg p-3 rounded-4 z-3 d-none d-md-block" style={{ width: '200px' }}>
                     <div className="d-flex align-items-center gap-3">
                        <div className="bg-success text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                           ✓
                        </div>
                        <div>
                           <p className="mb-0 fw-bold small">Tersalurkan</p>
                           <p className="mb-0 text-success fw-bold">Rp 1.2 M+</p>
                        </div>
                     </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
           <div className="row g-4 text-center">
              {[
                  { icon: "🛡️", title: "Amanah", desc: "Dikelola secara profesional sesuai syariat dan regulasi." },
                  { icon: "⚡", title: "Cepat", desc: "Layanan responsif dan penyaluran bantuan segera." },
                  { icon: "📊", title: "Transparan", desc: "Laporan keuangan yang diaudit dan dapat diakses publik." }
              ].map((f, i) => (
                  <div key={i} className="col-md-4">
                      <div className="p-4 rounded-4 h-100 hover-lift border border-light bg-light bg-opacity-50">
                          <div className="display-4 mb-3">{f.icon}</div>
                          <h4 className="fw-bold mb-2">{f.title}</h4>
                          <p className="text-secondary mb-0">{f.desc}</p>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
               <span className="text-success fw-bold text-uppercase small letter-spacing-2">Program Unggulan</span>
               <h2 className="fw-bold display-6 mt-2">Mari Berkontribusi</h2>
            </div>
            <Link to="/program" className="btn btn-outline-success rounded-pill d-none d-md-inline-flex">
               Lihat Semua <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
          
          <div className="row g-4">
             {featuredPrograms.map(item => (
                <div key={item.id} className="col-lg-4 col-md-6">
                    <ProgramCard {...item} />
                </div>
             ))}
          </div>
          
          <div className="text-center mt-5 d-md-none">
            <Link to="/program" className="btn btn-outline-success rounded-pill">
               Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Zakat Calculator */}
      <section className="py-5 bg-dark position-relative overflow-hidden">
         {/* Background pattern */}
         <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ 
             backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
         }}></div>
         
         <div className="container position-relative z-1 py-5">
            <div className="row align-items-center justify-content-center text-center">
               <div className="col-lg-8">
                  <h2 className="display-5 fw-bold text-white mb-4">Sudahkah Anda Menghitung Zakat?</h2>
                  <p className="lead text-white-50 mb-5">
                     Gunakan kalkulator zakat kami untuk menghitung kewajiban zakat Maal, Profesi, atau Penghasilan Anda dengan mudah dan akurat.
                  </p>
                  <Link to="/kalkulator-zakat" className="btn btn-success btn-lg rounded-pill px-5 py-3 shadow-lg hover-scale">
                     <span className="me-2">🧮</span> Hitung Zakat Sekarang
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </>
  );
};

export default Beranda;