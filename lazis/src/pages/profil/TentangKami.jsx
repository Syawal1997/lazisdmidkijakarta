/**
 * TentangKami.jsx
 * Sub-halaman Profil: Tentang Kami
 * Konten: lazisdmi.id/tentang-kami
 * Desain: nucare.id/profil/sekilas
 */

// Data statistik lembaga
const stats = [
    { value: '10+', label: 'Tahun Berpengalaman' },
    { value: '50rb+', label: 'Penerima Manfaat' },
    { value: '34', label: 'Kab/Kota Terjangkau' },
    { value: '200+', label: 'Program Tersalurkan' },
];

// Data timeline perjalanan lembaga
const timeline = [
    {
        year: '2010',
        title: 'Pendirian Lazis DMI DKI',
        desc: 'Lazis DMI DKI Jakarta lahir sebagai amanat Pimpinan Wilayah DMI DKI Jakarta untuk menghimpun dan menyalurkan Zakat, Infaq dan Shodaqoh di wilayah DKI Jakarta.',
    },
    {
        year: '2013',
        title: 'Pengukuhan Formal',
        desc: 'Secara yuridis formal dikukuhkan melalui surat keputusan resmi sebagai lembaga amil zakat tingkat provinsi yang sah dan terpercaya.',
    },
    {
        year: '2016',
        title: 'Izin Operasional Resmi',
        desc: 'Mendapat izin operasional resmi sebagai LAZ tingkat provinsi dan mulai memperluas jaringan penyaluran ke seluruh kabupaten/kota DKI Jakarta.',
    },
    {
        year: '2019',
        title: 'Standar Manajemen Mutu',
        desc: 'Menerapkan standar manajemen mutu berbasis teknologi informasi untuk transparansi dan akuntabilitas pengelolaan dana Zakat, Infaq dan Shodaqoh.',
    },
    {
        year: '2021',
        title: 'Satgas Peduli Covid-19',
        desc: 'Pembentukan satuan tugas peduli Covid-19 untuk membantu masyarakat DKI Jakarta yang terdampak pandemi melalui penyaluran sembako dan bantuan tunai.',
    },
    {
        year: '2024',
        title: 'Ekspansi & Inovasi Digital',
        desc: 'Pengembangan platform digital Zakat, Infaq dan Shodaqoh untuk mempermudah donatur dan meningkatkan jangkauan program pemberdayaan umat di seluruh DKI Jakarta.',
    },
];

// Data legalitas lembaga
const legalitas = [
    { label: 'SK Kementerian Agama', value: 'SK KEMENAG NO. 255/2016' },
    { label: 'NPWP', value: '73.XXX.XXX.X-XXX.000' },
    { label: 'Alamat Kantor Pusat', value: 'Jl. Matraman Raya No. 126, Jakarta Timur 13140' },
    { label: 'Kontak', value: '(021) 8580-XXX / lazisdmidki@gmail.com' },
];

const TentangKami = () => {
    return (
        <div className="profil-content">

            {/* ── Hero Banner ── */}
            <div className="profil-hero tentang-hero">
                <div className="profil-hero-overlay" />
                <div className="profil-hero-body">
                    <p className="profil-hero-badge">Tentang Kami</p>
                    <h1 className="profil-hero-title">LAZIS DMI DKI Jakarta</h1>
                    <p className="profil-hero-subtitle">
                        Lembaga Amil Zakat Infaq dan Shadaqah Dewan Masjid Indonesia DKI Jakarta
                    </p>
                </div>
            </div>

            {/* ── Deskripsi Utama ── */}
            <div className="profil-section">
                <div className="profil-section-label">Tentang Kami</div>
                <h2 className="profil-section-title">Mengenal Lazis DMI DKI Jakarta</h2>
                <blockquote className="profil-quote">
                    "Lembaga Amil Zakat Infaq dan Shadaqah Dewan Masjid Indonesia (Lazis DMI) DKI Jakarta
                    merupakan badan resmi DMI Provinsi DKI Jakarta yang memiliki tugas dan fungsi menghimpun
                    dan menyalurkan zakat, infaq dan shadaqah serta sebagai pemberdaya masyarakat di tingkat
                    provinsi DKI Jakarta."
                </blockquote>
                <ul className="profil-list">
                    <li>Mengkoordinasi Lazis DMI Kabupaten/Kota dalam mencapai target penghimpunan Zakat, Infaq dan Shodaqoh di DKI Jakarta</li>
                    <li>Mengorganisir gerakan pengumpulan zakat tingkat provinsi secara profesional dan transparan</li>
                    <li>Mengoptimalkan pendistribusian dan pendayagunaan zakat untuk pengentasan kemiskinan dan peningkatan kesejahteraan</li>
                    <li>Menerapkan sistem manajemen keuangan yang transparan dan akuntabel berbasis teknologi informasi dan komunikasi</li>
                </ul>
            </div>

            {/* ── Stats Counter ── */}
            <div className="profil-stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="profil-stat-card">
                        <div className="profil-stat-value">{s.value}</div>
                        <div className="profil-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Timeline Perjalanan ── */}
            <div className="profil-section">
                <div className="profil-section-label">Perjalanan Kami</div>
                <h2 className="profil-section-title">Sejarah &amp; Milestone</h2>
                <div className="profil-timeline">
                    {timeline.map((item, i) => (
                        <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-dot" />
                            <div className="timeline-card">
                                <span className="timeline-year">{item.year}</span>
                                <h4 className="timeline-title">{item.title}</h4>
                                <p className="timeline-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                    <div className="timeline-line" />
                </div>
            </div>

            {/* ── Legalitas ── */}
            <div className="profil-section">
                <div className="profil-section-label">Legalitas &amp; Perizinan</div>
                <h2 className="profil-section-title">Legalitas Lembaga</h2>
                <div className="profil-legalitas-grid">
                    {legalitas.map((item, i) => (
                        <div key={i} className="legalitas-card">
                            <div className="legalitas-icon">📋</div>
                            <div>
                                <div className="legalitas-label">{item.label}</div>
                                <div className="legalitas-value">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TentangKami;
