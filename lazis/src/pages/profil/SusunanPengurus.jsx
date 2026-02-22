/**
 * SusunanPengurus.jsx
 * Sub-halaman Profil: Susunan Pengurus
 * Desain: nucare.id/profil/pengurus
 * Isi: Ketua PW DMI DKI, Ketua Umum, Sekretaris Umum, Bendahara Umum
 */

// Komponen avatar SVG (tidak perlu gambar eksternal)
const AvatarPlaceholder = ({ size = 96 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: '50%' }}
        aria-label="Foto pengurus"
    >
        <rect width="100" height="100" fill="#e8f5e9" />
        <circle cx="50" cy="38" r="18" fill="#a5d6a7" />
        <ellipse cx="50" cy="80" rx="28" ry="20" fill="#a5d6a7" />
    </svg>
);

// Data pembina (Ketua PW DMI DKI)
const pimpinan = {
    nama: 'Pimpinan Wilayah DMI DKI',
    jabatan: 'Ketua Pimpinan Wilayah DMI DKI Jakarta',
    desc: 'Pimpinan tertinggi organisasi Dewan Masjid Indonesia Provinsi DKI Jakarta yang membawahi seluruh kegiatan lembaga termasuk Lazis DMI DKI Jakarta.',
};

// Data pengurus harian
const pengurusUtama = [
    {
        nama: 'Ketua Umum',
        jabatan: 'Ketua Umum Lazis DMI DKI Jakarta',
        desc: 'Bertanggung jawab atas keseluruhan operasional dan program Lazis DMI DKI Jakarta.',
    },
    {
        nama: 'Sekretaris Umum',
        jabatan: 'Sekretaris Umum Lazis DMI DKI Jakarta',
        desc: 'Mengelola administrasi, dokumentasi, dan koordinasi internal lembaga.',
    },
    {
        nama: 'Bendahara Umum',
        jabatan: 'Bendahara Umum Lazis DMI DKI Jakarta',
        desc: 'Bertanggung jawab atas pengelolaan keuangan dan pelaporan keuangan lembaga.',
    },
];

const SusunanPengurus = () => {
    return (
        <div className="profil-content">

            {/* ── Hero Banner ── */}
            <div className="profil-hero pengurus-hero">
                <div className="profil-hero-overlay" />
                <div className="profil-hero-body">
                    <p className="profil-hero-badge">Susunan Pengurus</p>
                    <h1 className="profil-hero-title">Pimpinan &amp; Pengurus</h1>
                    <p className="profil-hero-subtitle">
                        Pimpinan dan pengelola utama Lazis DMI DKI Jakarta
                    </p>
                </div>
            </div>

            {/* ── Pembina: Ketua PW DMI DKI ── */}
            <div className="profil-section">
                <div className="profil-section-label">Pembina</div>
                <h2 className="profil-section-title">Ketua Pimpinan Wilayah</h2>
                <div className="ketua-pw-card">
                    <div className="ketua-pw-avatar">
                        <AvatarPlaceholder size={120} />
                        <div className="ketua-pw-badge">Pembina</div>
                    </div>
                    <div className="ketua-pw-info">
                        <div className="ketua-pw-nama">{pimpinan.nama}</div>
                        <div className="ketua-pw-jabatan">{pimpinan.jabatan}</div>
                        <p className="ketua-pw-desc">{pimpinan.desc}</p>
                    </div>
                </div>
            </div>

            {/* ── Pengurus Harian ── */}
            <div className="profil-section">
                <div className="profil-section-label">Pengurus</div>
                <h2 className="profil-section-title">Pengurus Harian Lembaga</h2>
                <p className="profil-section-subtitle">
                    Pengurus yang bertanggung jawab atas pengelolaan operasional Lazis DMI DKI Jakarta
                </p>
                <div className="pengurus-grid">
                    {pengurusUtama.map((p, i) => (
                        <div key={i} className="pengurus-card">
                            <div className="pengurus-avatar">
                                <AvatarPlaceholder size={88} />
                            </div>
                            <div className="pengurus-info">
                                <div className="pengurus-nama">{p.nama}</div>
                                <div className="pengurus-jabatan">{p.jabatan}</div>
                                <p className="pengurus-desc">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SusunanPengurus;
