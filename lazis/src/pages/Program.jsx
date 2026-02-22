const Program = ({ kategori }) => {
  // Data Program
  const programs = [
    { id: 1, title: "Beasiswa Dhuafa", cat: "pendidikan", target: 100000000 },
    { id: 2, title: "Ambulans Gratis", cat: "kesehatan", target: 250000000 },
    { id: 3, title: "Modal UMKM", cat: "ekonomi", target: 50000000 },
    { id: 4, title: "Bantuan Bencana", cat: "kemanusiaan", target: 50000000 },
    { id: 5, title: "Tanam Pohon", cat: "lingkungan", target: 10000000 },
  ];

  // Filter: Jika kategori 'donasi' (semua), tampilkan semua. Jika tidak, filter berdasarkan kategori.
  const filtered = kategori === 'donasi' 
    ? programs 
    : programs.filter(p => p.cat === kategori);

  return (
    <section className="py-5 mt-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">
          Program {kategori === 'donasi' ? 'Unggulan' : kategori.toUpperCase()}
        </h2>
        <div className="row g-4">
          {filtered.length > 0 ? filtered.map(item => (
            <div key={item.id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src={`https://placehold.co/400x200/198754/ffffff?text=${item.cat}`} className="card-img-top" alt={item.title}/>
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p className="text-muted small">Target: Rp {item.target.toLocaleString()}</p>
                  <button className="btn btn-outline-success w-100">Donasi</button>
                </div>
              </div>
            </div>
          )) : <div className="text-center">Belum ada program di kategori ini.</div>}
        </div>
      </div>
    </section>
  );
};
export default Program;