/**
 * VisiMisi.jsx
 * Sub-halaman Profil: Visi & Misi
 * Konten: lazisdmi.id/tentang-kami (bagian visi & misi)
 * Desain: nucare.id/profil/visi-misi
 */

// Data poin-poin misi lembaga
const misi = [
    {
        icon: '📡',
        title: 'Literasi & Penggalangan Dana Digital',
        desc: 'Meliterasi dan menggalang dana Zakat, Infaq, Shadaqah berbasis digital untuk kepentingan kegiatan yang berbasis investasi sosial dan pemberdayaan umat.',
    },
    {
        icon: '🤝',
        title: 'Mitra Strategis',
        desc: 'Menjadi pilihan utama mitra strategis dalam berkolaborasi dan bersinergi menjalankan berbagai kegiatan sosial keagamaan bersama masjid-masjid di DKI Jakarta.',
    },
    {
        icon: '🎓',
        title: 'Peningkatan Kualitas SDM',
        desc: 'Menyediakan program-program untuk peningkatan kualitas sumber daya manusia sehingga mampu melahirkan intelektual dan wirausahawan yang unggul dan handal.',
    },
    {
        icon: '🏪',
        title: 'Penggerak Sektor Riil & UMKM',
        desc: 'Menggerakan sektor riil dan para pelaku UMKM dengan pola supply chain yang berdampak pada pertumbuhan ekonomi masyarakat melalui pemanfaatan dana Zakat, Infaq dan Shodaqoh produktif.',
    },
    {
        icon: '🏢',
        title: 'Pemberdayaan Berbasis Masjid',
        desc: 'Memberdayakan masjid-masjid di DKI Jakarta sebagai pusat kegiatan sosial ekonomi umat Islam yang mandiri dan berkelanjutan.',
    },
];

// Data kebijakan mutu manajemen (M.A.T.A.P)
const mutu = [
    {
        kode: 'M',
        kata: 'MODERN',
        desc: 'Sikap dan cara berfikir serta cara bertindak sesuai dengan tuntutan zaman (wal Akhdzu bil Jadidil Ashlah).',
    },
    {
        kode: 'A',
        kata: 'AKUNTABEL',
        desc: "Pertanggung jawaban terhadap aktivitas kelembagaan dan keuangan yang sesuai dengan undang-undang tentang pengelolaan zakat dan syariah islam.",
    },
    {
        kode: 'T',
        kata: 'TRANSPARAN',
        desc: "Terbuka sesuai dengan prinsip-prinsip yang berlaku dalam undang-undang tentang pengelolaan zakat dan syariah islam yang rahmatan lil 'alamin.",
    },
    {
        kode: 'A',
        kata: 'AMANAH',
        desc: 'Dapat dipercaya dalam pengelolaan dana dari para donatur baik yang berupa dana Zakat, Infaq, Shadaqah CSR, dan Dana Sosial Keagamaan Lainnya.',
    },
    {
        kode: 'P',
        kata: 'PROFESIONAL',
        desc: 'Dalam pengelolaan Zakat, Infaq dan Shodaqoh, Lazis DMI DKI selalu mengedepankan layanan yang terbaik sesuai dengan kesepakatan antar pihak dan etika yang berlaku.',
    },
];

const VisiMisi = () => {
    return (
        <div className="profil-content">

            {/* ── Hero Banner ── */}
            <div className="profil-hero visimisi-hero">
                <div className="profil-hero-overlay" />
                <div className="profil-hero-body">
                    <p className="profil-hero-badge">Visi &amp; Misi</p>
                    <h1 className="profil-hero-title">Arah &amp; Langkah Strategis</h1>
                    <p className="profil-hero-subtitle">
                        Panduan perjalanan Lazis DMI DKI Jakarta dalam mewujudkan lembaga filantropi Islam terkemuka
                    </p>
                </div>
            </div>

            {/* ── Visi ── */}
            <div className="profil-section">
                <div className="profil-section-label">Visi Kami</div>
                <h2 className="profil-section-title">Visi Lazis DMI DKI Jakarta</h2>
                <div className="visi-box">
                    <div className="visi-icon">🌟</div>
                    <blockquote className="visi-text">
                        "Menjadi Lembaga Amil Zakat Terpercaya Berbasis Masjid di DKI Jakarta yang Profesional,
                        Transparan, dan Berdampak Nyata bagi Umat"
                    </blockquote>
                </div>
            </div>

            {/* ── Misi Cards ── */}
            <div className="profil-section">
                <div className="profil-section-label">Misi Kami</div>
                <h2 className="profil-section-title">Langkah-Langkah Strategis</h2>
                <p className="profil-section-subtitle">
                    Langkah-langkah strategis yang kami tempuh untuk mewujudkan visi lembaga
                </p>
                <div className="misi-grid">
                    {misi.map((m, i) => (
                        <div key={i} className="misi-card">
                            <div className="misi-number">0{i + 1}</div>
                            <div className="misi-icon">{m.icon}</div>
                            <h4 className="misi-title">{m.title}</h4>
                            <p className="misi-desc">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Kebijakan Mutu ── */}
            <div className="profil-section mutu-section">
                <div className="profil-section-label" style={{ color: '#a8d5b5' }}>Kebijakan Mutu</div>
                <h2 className="profil-section-title" style={{ color: '#fff' }}>Kebijakan Mutu Manajemen</h2>
                <p className="profil-section-subtitle" style={{ color: '#c8e6c9' }}>
                    Lima prinsip utama yang menjadi landasan pengelolaan Lazis DMI DKI Jakarta
                </p>
                <div className="mutu-grid">
                    {mutu.map((m, i) => (
                        <div key={i} className="mutu-card">
                            <div className="mutu-kode">{m.kode}</div>
                            <div className="mutu-kata">{m.kata}</div>
                            <p className="mutu-desc">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default VisiMisi;
