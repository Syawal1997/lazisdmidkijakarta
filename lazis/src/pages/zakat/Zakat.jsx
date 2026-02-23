/**
 * Zakat.jsx — Halaman utama Zakat
 * Konten & desain terinspirasi nucare.id/zakat, dimodifikasi untuk Lazis DMI DKI
 */
import { Link } from 'react-router-dom';
import './Zakat.css';

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
        nisab: 'Rp 7.650.000/bln',
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
        icon: '📈',
        judul: 'Zakat Saham',
        desc: 'Zakat wajib atas kepemilikan saham apabila telah memenuhi nisab dan haul satu tahun.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🐄',
        judul: 'Zakat Peternakan',
        desc: 'Zakat yang wajib dikeluarkan atas kepemilikan hewan ternak seperti sapi, kambing, dan unta.',
        nisab: 'Sesuai jenis ternak',
        kadar: 'Bervariasi',
    },
    {
        icon: '🏢',
        judul: 'Zakat Perusahaan',
        desc: 'Zakat atas keuntungan usaha atau badan usaha yang dimiliki individu maupun lembaga.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🏠',
        judul: 'Zakat Properti',
        desc: 'Zakat atas hasil pengelolaan aset properti seperti rumah kontrakan, kos, atau gedung sewaan.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🌙',
        judul: 'Zakat Fitrah',
        desc: 'Zakat wajib bagi setiap Muslim yang ditunaikan pada bulan Ramadan sebelum Salat Idulfitri.',
        nisab: 'Setiap Muslim',
        kadar: '2,5 kg beras',
    },
];

const keunggulan = [
    { icon: '🛡️', judul: 'Terpercaya & Amanah', desc: 'Dikelola oleh Lazis DMI DKI yang dibina langsung oleh DMI Provinsi DKI Jakarta.' },
    { icon: '🎯', judul: 'Tepat Sasaran', desc: 'Zakat disalurkan kepada 8 golongan yang berhak menerima sesuai ketentuan syariat Islam.' },
    { icon: '📊', judul: 'Transparan & Akuntabel', desc: 'Laporan keuangan dan penyaluran zakat dapat diakses dan dipertanggungjawabkan secara terbuka.' },
    { icon: '🕌', judul: 'Berbasis Masjid', desc: 'Program bersinergi dengan masjid-masjid se-DKI Jakarta untuk pemerataan distribusi zakat.' },
];

const ZakatPage = () => (
    <div className="zw-page">
        {/* ── Hero ── */}
        <section className="zw-hero">
            <div className="zw-hero-inner">
                <div className="zw-hero-text">
                    <span className="zw-hero-badge">Zakat</span>
                    <h1 className="zw-hero-title">Tunaikan <span>Zakat</span> Anda<br />Bersama Lazis DMI DKI</h1>
                    <p className="zw-hero-desc">
                        Salurkan zakat Anda melalui Lazis DMI DKI Jakarta — lembaga resmi berbasis masjid yang transparan, amanah, dan tepat sasaran untuk memberdayakan umat.
                    </p>
                    <div className="zw-hero-btns">
                        <Link to="/kalkulator-zakat" className="zw-btn-primary">🧮 Hitung Zakat Saya</Link>
                        <a href="#jenis-zakat" className="zw-btn-outline">Jenis-Jenis Zakat</a>
                    </div>
                </div>
                <div className="zw-hero-card">
                    <h3>Info Nisab Zakat 2025</h3>
                    {[
                        { label: 'Harga Emas (per gram)', val: 'Rp 1.900.000' },
                        { label: 'Nisab Zakat Mal', val: 'Rp 161.500.000' },
                        { label: 'Nisab Zakat Profesi', val: 'Rp 6.725.000/bln' },
                        { label: 'Kadar Zakat', val: '2,5%' },
                    ].map((r, i) => (
                        <div key={i} className="zw-nisab-item">
                            <span className="zw-nisab-label">{r.label}</span>
                            <span className="zw-nisab-val">{r.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Mengapa Lazis DMI DKI ── */}
        <section className="zw-section">
            <div className="zw-section-label">Keunggulan Kami</div>
            <h2 className="zw-section-title">Mengapa Zakat di Lazis DMI DKI?</h2>
            <p className="zw-section-sub">Amanah dalam menerima, tepat dalam menyalurkan</p>
            <div className="zw-keunggulan-grid">
                {keunggulan.map((k, i) => (
                    <div key={i} className="zw-keunggulan-card">
                        <div className="zw-keunggulan-icon">{k.icon}</div>
                        <div className="zw-keunggulan-title">{k.judul}</div>
                        <p className="zw-keunggulan-desc">{k.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ── Jenis Zakat ── */}
        <section className="zw-bg-light" id="jenis-zakat">
            <div className="zw-section">
                <div className="zw-section-label">Panduan Zakat</div>
                <h2 className="zw-section-title">Jenis-Jenis Zakat</h2>
                <p className="zw-section-sub">Kenali jenis zakat yang wajib anda tunaikan</p>
                <div className="zw-jenis-grid">
                    {jenisZakat.map((z, i) => (
                        <div key={i} className="zw-jenis-card">
                            <div className="zw-jenis-icon">{z.icon}</div>
                            <div className="zw-jenis-title">{z.judul}</div>
                            <p className="zw-jenis-desc">{z.desc}</p>
                            <div className="zw-jenis-meta">
                                <span className="zw-jenis-badge">Nisab: {z.nisab}</span>
                                <span className="zw-jenis-badge">Kadar: {z.kadar}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── CTA ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="zw-cta">
                <h2>Sudah Tahu Berapa Zakat Anda? 🧮</h2>
                <p>Gunakan kalkulator zakat kami untuk menghitung dengan mudah, lalu bayar langsung via QRIS atau transfer bank.</p>
                <Link to="/kalkulator-zakat" className="zw-btn-primary">Hitung & Bayar Zakat Sekarang</Link>
            </div>
        </div>
    </div>
);

export default ZakatPage;
