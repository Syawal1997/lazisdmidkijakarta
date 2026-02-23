import ProgramCard from '../components/ProgramCard';

const Program = ({ kategori }) => {
  // Data Program (Dummy Data diperluas)
  const programs = [
    { id: 1, title: "Beasiswa Dhuafa Berprestasi", cat: "pendidikan", target: 100000000, collected: 45000000 },
    { id: 2, title: "Layanan Ambulans Gratis 24 Jam", cat: "kesehatan", target: 250000000, collected: 120000000 },
    { id: 3, title: "Bantuan Modal Usaha Mikro", cat: "ekonomi", target: 50000000, collected: 15000000 },
    { id: 4, title: "Tanggap Bencana Banjir Jakarta", cat: "kemanusiaan", target: 50000000, collected: 32000000 },
    { id: 5, title: "Program 1000 Pohon Masjid", cat: "lingkungan", target: 10000000, collected: 2500000 },
    { id: 6, title: "Renovasi Sanitasi Masjid", cat: "kesehatan", target: 75000000, collected: 60000000 },
  ];

  // Filter: Jika kategori 'donasi' (semua), tampilkan semua. Jika tidak, filter berdasarkan kategori.
  const filtered = kategori === 'donasi' || !kategori
    ? programs 
    : programs.filter(p => p.cat === kategori);

  const getTitle = () => {
    if (!kategori || kategori === 'donasi') return 'Semua Program Kebaikan';
    return `Program ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`;
  }

  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-success mb-3">{getTitle()}</h2>
          <p className="text-secondary mw-600 mx-auto">
            Salurkan donasi terbaik Anda untuk program-program pemberdayaan umat bersama Lazis DMI DKI Jakarta.
          </p>
        </div>
        
        <div className="row g-4">
          {filtered.length > 0 ? filtered.map(item => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <ProgramCard 
                id={item.id}
                title={item.title}
                category={item.cat}
                target={item.target}
                collected={item.collected}
              />
            </div>
          )) : (
            <div className="col-12 text-center py-5">
              <div className="alert alert-info d-inline-block px-5">
                Belum ada program aktif di kategori ini.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Program;