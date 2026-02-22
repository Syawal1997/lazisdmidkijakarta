/**
 * Zakat.jsx — Halaman utama Zakat
 * Konten & desain terinspirasi nucare.id/zakat, dimodifikasi untuk Lazis DMI DKI
 */
import { Link } from 'react-router-dom';

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
        <style>{`
      .zw-page { font-family: 'Segoe UI', sans-serif; background: #f7f9f7; }

      /* ── Hero ── */
      .zw-hero {
        background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 55%, #43a047 100%);
        padding: 7rem 0 5rem;
        position: relative;
        overflow: hidden;
      }
      .zw-hero::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 80% 50%, rgba(255,255,255,.07) 0%, transparent 70%);
      }
      .zw-hero-inner { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; gap: 3rem; }
      .zw-hero-text { flex: 1; color: #fff; }
      .zw-hero-badge {
        display: inline-block;
        background: rgba(255,255,255,.18);
        border: 1px solid rgba(255,255,255,.3);
        color: #fff;
        font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
        padding: .35rem 1rem; border-radius: 50px; margin-bottom: 1rem;
      }
      .zw-hero-title { font-size: 2.8rem; font-weight: 900; line-height: 1.15; margin: 0 0 1rem; }
      .zw-hero-title span { color: #a5d6a7; }
      .zw-hero-desc { font-size: 1rem; color: rgba(255,255,255,.85); line-height: 1.7; margin: 0 0 1.8rem; max-width: 460px; }
      .zw-hero-btns { display: flex; gap: .8rem; flex-wrap: wrap; }
      .zw-btn-primary {
        display: inline-block; background: #fff; color: #2e7d32;
        font-weight: 700; padding: .75rem 1.8rem; border-radius: 50px;
        text-decoration: none; font-size: .9rem; transition: transform .2s, box-shadow .2s;
        box-shadow: 0 4px 14px rgba(0,0,0,.15);
      }
      .zw-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.2); color: #1b5e20; }
      .zw-btn-outline {
        display: inline-block; border: 2px solid rgba(255,255,255,.7); color: #fff;
        font-weight: 700; padding: .75rem 1.8rem; border-radius: 50px;
        text-decoration: none; font-size: .9rem; transition: background .2s;
      }
      .zw-btn-outline:hover { background: rgba(255,255,255,.15); color: #fff; }
      .zw-hero-card {
        flex-shrink: 0; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
        border-radius: 20px; padding: 1.8rem 2rem; backdrop-filter: blur(8px);
        color: #fff; text-align: center; min-width: 240px;
      }
      .zw-hero-card h3 { font-size: 1.1rem; font-weight: 700; margin: 0 0 1.2rem; }
      .zw-nisab-item { display: flex; justify-content: space-between; padding: .5rem 0; border-bottom: 1px solid rgba(255,255,255,.15); font-size: .85rem; }
      .zw-nisab-item:last-child { border-bottom: none; }
      .zw-nisab-label { opacity: .8; }
      .zw-nisab-val { font-weight: 700; }

      /* ── Section ── */
      .zw-section { max-width: 1100px; margin: 0 auto; padding: 3.5rem 1.5rem; }
      .zw-section-label { font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #2e7d32; margin-bottom: .3rem; }
      .zw-section-title { font-size: 1.8rem; font-weight: 800; color: #1a2e1a; margin: 0 0 .4rem; }
      .zw-section-sub   { color: #666; font-size: .93rem; margin: 0 0 2.2rem; }

      /* ── Keunggulan Grid ── */
      .zw-keunggulan-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.2rem; }
      .zw-keunggulan-card {
        background: #fff; border-radius: 16px; padding: 1.6rem 1.3rem; text-align: center;
        box-shadow: 0 3px 14px rgba(0,0,0,.07); border: 1px solid #e8f5e9;
        transition: transform .2s, box-shadow .2s;
      }
      .zw-keunggulan-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(46,125,50,.12); }
      .zw-keunggulan-icon { font-size: 2rem; margin-bottom: .7rem; }
      .zw-keunggulan-title { font-size: .93rem; font-weight: 700; color: #1b5e20; margin: 0 0 .4rem; }
      .zw-keunggulan-desc  { font-size: .8rem; color: #666; line-height: 1.55; margin: 0; }

      /* ── Jenis Zakat Grid ── */
      .zw-bg-light { background: #eef6ee; }
      .zw-jenis-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 1rem; }
      .zw-jenis-card {
        background: #fff; border-radius: 14px; padding: 1.3rem 1rem; text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,.06); border-top: 3px solid #4caf50;
        transition: transform .2s, box-shadow .2s; cursor: default;
      }
      .zw-jenis-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(46,125,50,.14); }
      .zw-jenis-icon  { font-size: 1.8rem; margin-bottom: .5rem; }
      .zw-jenis-title { font-size: .83rem; font-weight: 700; color: #1b5e20; margin: 0 0 .4rem; }
      .zw-jenis-desc  { font-size: .73rem; color: #666; line-height: 1.45; margin: 0 0 .8rem; }
      .zw-jenis-meta  { display: flex; flex-direction: column; gap: .25rem; }
      .zw-jenis-badge {
        display: inline-block; font-size: .65rem; font-weight: 700;
        background: #e8f5e9; color: #2e7d32; padding: .15rem .5rem; border-radius: 50px;
      }

      /* ── CTA Banner ── */
      .zw-cta {
        background: linear-gradient(120deg, #1b5e20, #2e7d32 60%, #43a047);
        border-radius: 20px; padding: 3rem 2.5rem; text-align: center; color: #fff;
        margin: 0 1.5rem 3rem;
      }
      .zw-cta h2 { font-size: 1.7rem; font-weight: 800; margin: 0 0 .6rem; }
      .zw-cta p  { opacity: .85; margin: 0 auto 1.5rem; max-width: 480px; }

      /* ── Responsive ── */
      @media (max-width: 900px) {
        .zw-hero-inner { flex-direction: column; padding-top: 2rem; }
        .zw-hero-card { width: 100%; }
        .zw-keunggulan-grid { grid-template-columns: 1fr 1fr; }
        .zw-jenis-grid { grid-template-columns: repeat(2,1fr); }
        .zw-hero-title { font-size: 2rem; }
      }
      @media (max-width: 576px) {
        .zw-jenis-grid { grid-template-columns: 1fr 1fr; }
        .zw-keunggulan-grid { grid-template-columns: 1fr; }
      }
    `}</style>

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
