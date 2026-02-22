/**
 * InfaqShodaqoh.jsx
 * Halaman Infaq & Shodaqoh — terinspirasi nucare.id/infak
 * Pembayaran via QRIS / Transfer + Konfirmasi WhatsApp
 */
import { useState } from 'react';

// Format Rupiah
const formatRp = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// Pilihan nominal cepat
const NOMINAL_CEPAT = [10000, 25000, 50000, 100000, 250000, 500000];

// Kategori infaq
const KATEGORI = [
    { id: 'umum', icon: '🌿', label: 'Infaq Umum', desc: 'Disalurkan untuk program-program pemberdayaan umat sesuai kebutuhan terkini.' },
    { id: 'pendidikan', icon: '📚', label: 'Infaq Pendidikan', desc: 'Mendukung beasiswa dan sarana pendidikan bagi anak-anak kurang mampu.' },
    { id: 'kesehatan', icon: '🏥', label: 'Infaq Kesehatan', desc: 'Membantu biaya pengobatan dan pelayanan kesehatan warga yang membutuhkan.' },
    { id: 'masjid', icon: '🕌', label: 'Infaq Pembangunan Masjid', desc: 'Mendukung pembangunan, renovasi, dan operasional masjid se-DKI Jakarta.' },
    { id: 'kemanusiaan', icon: '🤲', label: 'Infaq Kemanusiaan', desc: 'Bantuan darurat untuk korban bencana alam dan situasi kemanusiaan mendesak.' },
    { id: 'ekonomi', icon: '💼', label: 'Infaq Pemberdayaan Ekonomi', desc: 'Modal usaha dan pelatihan kewirausahaan untuk masyarakat prasejahtera.' },
];

// Keutamaan infaq
const KEUTAMAAN = [
    { ayat: 'QS. Al-Baqarah: 261', teks: '"Perumpamaan orang-orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai; pada setiap tangkai ada seratus biji."' },
    { ayat: 'QS. Al-Baqarah: 274', teks: '"Orang-orang yang menginfakkan hartanya di malam dan siang hari, baik secara tersembunyi maupun terang-terangan, mereka mendapat pahala di sisi Tuhan mereka."' },
];

const InfaqShodaqoh = () => {
    const [kategori, setKategori] = useState('umum');
    const [nominal, setNominal] = useState('');
    const [namaDonatur, setNamaDonatur] = useState('');
    const [doa, setDoa] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [metode, setMetode] = useState('qris');

    const nominalNum = Number(nominal) || 0;
    const katObj = KATEGORI.find((k) => k.id === kategori);

    const handleLanjut = () => {
        if (nominalNum < 1000) { alert('Nominal minimal Rp 1.000'); return; }
        setShowPayment(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKonfirmasiWA = () => {
        const nomorWA = '6282117460200';
        const msg = encodeURIComponent(
            `Assalamualaikum, saya ingin mengkonfirmasi pembayaran Infaq/Shodaqoh:\n\n` +
            `Nama       : ${namaDonatur || '(belum diisi)'}\n` +
            `Peruntukan : ${katObj?.label}\n` +
            `Nominal    : ${formatRp(nominalNum)}\n` +
            `Metode     : ${metode === 'qris' ? 'QRIS' : 'Transfer Bank'}\n` +
            (doa ? `Doa/Pesan  : ${doa}\n` : '') +
            `\nMohon konfirmasinya. Jazakumullahu khairan 🙏`
        );
        window.open(`https://wa.me/${nomorWA}?text=${msg}`, '_blank');
    };

    return (
        <div className="is-page">
            <style>{`
        .is-page { font-family: 'Segoe UI', sans-serif; background: #f4f7f4; }

        /* ── Hero ── */
        .is-hero {
          background: linear-gradient(135deg, #004d40 0%, #00695c 55%, #00897b 100%);
          padding: 7rem 0 5rem; text-align: center; color: #fff; position: relative; overflow: hidden;
        }
        .is-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 60%, rgba(255,255,255,.06) 0%, transparent 65%);
        }
        .is-hero-badge {
          display: inline-block; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.3);
          font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          padding: .35rem 1rem; border-radius: 50px; margin-bottom: 1rem;
        }
        .is-hero h1 { font-size: 2.6rem; font-weight: 900; margin: 0 0 .8rem; line-height: 1.15; }
        .is-hero h1 span { color: #a7ffeb; }
        .is-hero-desc { opacity: .85; font-size: .97rem; margin: 0 auto; max-width: 500px; line-height: 1.7; }

        /* ── Ayat Banner ── */
        .is-ayat-strip { background: #e0f2f1; padding: 1.5rem; border-bottom: 1px solid #b2dfdb; }
        .is-ayat-inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .is-ayat-text  { font-style: italic; color: #00695c; font-size: .93rem; line-height: 1.7; margin: 0 0 .3rem; font-weight: 500; }
        .is-ayat-ref   { font-size: .78rem; color: #00897b; font-weight: 700; }

        /* ── Main Layout ── */
        .is-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem 4rem; display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start; }

        /* ── Kategori Grid ── */
        .is-kat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .is-kat-card {
          background: #fff; border-radius: 14px; padding: 1.2rem; cursor: pointer;
          border: 2px solid #e0e0e0; transition: all .2s; display: flex; flex-direction: column; gap: .4rem;
        }
        .is-kat-card:hover     { border-color: #80cbc4; background: #e0f2f1; }
        .is-kat-card.active    { border-color: #00897b; background: #e0f2f1; }
        .is-kat-icon  { font-size: 1.6rem; }
        .is-kat-label { font-size: .88rem; font-weight: 700; color: #004d40; }
        .is-kat-desc  { font-size: .75rem; color: #666; line-height: 1.45; }
        .is-kat-badge {
          display: inline-block; margin-top: auto;
          font-size: .65rem; font-weight: 700; padding: .2rem .6rem;
          border-radius: 50px; background: #e0f2f1; color: #00695c;
        }
        .is-kat-card.active .is-kat-badge { background: #00897b; color: #fff; }

        /* ── Nominal Section ── */
        .is-section-title { font-size: 1rem; font-weight: 700; color: #1a2e2e; margin: 0 0 .8rem; display: flex; align-items: center; gap: .5rem; }
        .is-nominal-chips { display: flex; flex-wrap: wrap; gap: .6rem; margin-bottom: 1rem; }
        .is-chip {
          padding: .45rem 1rem; border: 2px solid #b2dfdb; border-radius: 50px;
          background: #fff; font-size: .83rem; font-weight: 600; cursor: pointer;
          color: #00695c; transition: all .15s;
        }
        .is-chip:hover, .is-chip.active { background: #00897b; border-color: #00897b; color: #fff; }
        .is-input {
          width: 100%; padding: .7rem 1rem; border: 2px solid #e0e0e0; border-radius: 10px;
          font-size: .95rem; outline: none; transition: border-color .2s; box-sizing: border-box;
        }
        .is-input:focus { border-color: #00897b; }
        .is-input-hint { font-size: .75rem; color: #888; margin-top: .3rem; }

        /* ── Form Panel ── */
        .is-form-panel {
          background: #fff; border-radius: 18px; box-shadow: 0 4px 20px rgba(0,0,0,.09);
          overflow: hidden; position: sticky; top: 90px;
        }
        .is-form-header { background: linear-gradient(135deg, #004d40, #00897b); padding: 1.4rem 1.8rem; color: #fff; }
        .is-form-header h2 { font-size: 1.1rem; font-weight: 800; margin: 0 0 .2rem; }
        .is-form-header p  { font-size: .8rem; opacity: .85; margin: 0; }
        .is-form-body { padding: 1.5rem 1.8rem; }
        .is-form-field { margin-bottom: 1rem; }
        .is-form-label { display: block; font-size: .82rem; font-weight: 600; color: #374737; margin-bottom: .35rem; }
        .is-nominal-preview {
          background: #e0f2f1; border-radius: 10px; padding: .8rem 1rem;
          margin-bottom: 1rem; text-align: center;
        }
        .is-nominal-preview-label { font-size: .73rem; color: #00695c; font-weight: 600; }
        .is-nominal-preview-val   { font-size: 1.6rem; font-weight: 900; color: #004d40; }
        .is-btn-lanjut {
          width: 100%; padding: .9rem; background: linear-gradient(135deg, #00695c, #00897b);
          color: #fff; border: none; border-radius: 12px; font-size: .97rem; font-weight: 700;
          cursor: pointer; transition: opacity .2s;
        }
        .is-btn-lanjut:hover { opacity: .9; }
        .is-btn-lanjut:disabled { opacity: .5; cursor: not-allowed; }

        /* ── Payment ── */
        .is-payment { margin-top: 1.2rem; border-top: 1px solid #e0f2f1; padding-top: 1.2rem; }
        .is-payment h3 { font-size: .95rem; font-weight: 800; color: #004d40; margin: 0 0 .9rem; }
        .is-metode-tabs { display: flex; gap: .5rem; margin-bottom: 1.1rem; }
        .is-tab {
          flex: 1; padding: .55rem; border: 2px solid #e0e0e0; border-radius: 10px;
          background: #fff; cursor: pointer; font-size: .8rem; font-weight: 600;
          color: #666; text-align: center; transition: all .15s;
        }
        .is-tab.active { border-color: #00897b; background: #e0f2f1; color: #004d40; }

        /* QRIS */
        .is-qris-box { text-align: center; margin-bottom: 1rem; }
        .is-qris-img {
          width: 160px; height: 160px; border: 3px solid #b2dfdb; border-radius: 12px;
          margin: 0 auto .7rem; display: flex; align-items: center; justify-content: center;
          background: #e0f2f1; font-size: 3.5rem;
        }
        .is-qris-label { font-size: .82rem; font-weight: 700; color: #004d40; }
        .is-qris-sub   { font-size: .73rem; color: #666; }

        /* Transfer */
        .is-rek-list { display: flex; flex-direction: column; gap: .6rem; margin-bottom: 1rem; }
        .is-rek-item {
          display: flex; align-items: center; gap: .8rem; background: #e0f2f1;
          border: 1px solid #b2dfdb; border-radius: 10px; padding: .7rem .9rem;
        }
        .is-rek-bank   { font-size: .72rem; font-weight: 800; color: #00695c; min-width: 44px; }
        .is-rek-no     { font-size: .88rem; font-weight: 700; color: #1a2e2e; letter-spacing: .04em; }
        .is-rek-an     { font-size: .72rem; color: #666; }

        /* WA Button */
        .is-btn-wa {
          width: 100%; padding: .8rem; background: #25d366; color: #fff;
          border: none; border-radius: 12px; font-size: .88rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: .5rem;
          transition: background .2s;
        }
        .is-btn-wa:hover { background: #1da851; }

        /* ── Info Section ── */
        .is-info-section { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem 4rem; }
        .is-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .is-info-card { background: #fff; border-radius: 16px; padding: 1.8rem; box-shadow: 0 2px 12px rgba(0,0,0,.06); border-top: 3px solid #00897b; }
        .is-info-title { font-size: 1rem; font-weight: 800; color: #004d40; margin: 0 0 .8rem; }
        .is-info-list  { list-style: none; padding: 0; margin: 0; }
        .is-info-list li { padding: .45rem 0 .45rem 1.6rem; position: relative; font-size: .85rem; color: #444; border-bottom: 1px solid #f0f0f0; }
        .is-info-list li:last-child { border-bottom: none; }
        .is-info-list li::before { content: '▸'; position: absolute; left: 0; color: #00897b; font-weight: 700; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .is-main { grid-template-columns: 1fr; }
          .is-form-panel { position: static; }
          .is-info-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 576px) {
          .is-kat-grid { grid-template-columns: 1fr; }
          .is-hero h1 { font-size: 1.9rem; }
        }
      `}</style>

            {/* ── Hero ── */}
            <div className="is-hero">
                <span className="is-hero-badge">Infaq &amp; Shodaqoh</span>
                <h1>Berbagi <span>Kebaikan</span><br />Bersama Lazis DMI DKI</h1>
                <p className="is-hero-desc">
                    Setiap rupiah yang Anda infaqkan akan disalurkan secara amanah untuk memberdayakan
                    saudara-saudara kita yang membutuhkan di DKI Jakarta.
                </p>
            </div>

            {/* ── Ayat Strip ── */}
            <div className="is-ayat-strip">
                <div className="is-ayat-inner">
                    <p className="is-ayat-text">{KEUTAMAAN[0].teks}</p>
                    <p className="is-ayat-ref">{KEUTAMAAN[0].ayat}</p>
                </div>
            </div>

            {/* ── Main ── */}
            <div className="is-main">

                {/* Kiri — Kategori & Nominal */}
                <div>
                    {/* Pilih Kategori */}
                    <div style={{ background: '#fff', borderRadius: 18, padding: '1.8rem', boxShadow: '0 4px 20px rgba(0,0,0,.08)', marginBottom: '1.5rem' }}>
                        <div className="is-section-title">🎯 Pilih Peruntukan Infaq</div>
                        <div className="is-kat-grid">
                            {KATEGORI.map((k) => (
                                <div
                                    key={k.id}
                                    className={`is-kat-card${kategori === k.id ? ' active' : ''}`}
                                    onClick={() => setKategori(k.id)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="is-kat-icon">{k.icon}</div>
                                    <div className="is-kat-label">{k.label}</div>
                                    <p className="is-kat-desc">{k.desc}</p>
                                    <span className="is-kat-badge">{kategori === k.id ? '✓ Dipilih' : 'Pilih'}</span>
                                </div>
                            ))}
                        </div>

                        {/* Nominal */}
                        <div className="is-section-title" style={{ marginTop: '.5rem' }}>💵 Pilih Nominal Infaq</div>
                        <div className="is-nominal-chips">
                            {NOMINAL_CEPAT.map((n) => (
                                <button
                                    key={n}
                                    className={`is-chip${nominalNum === n ? ' active' : ''}`}
                                    onClick={() => setNominal(String(n))}
                                >
                                    {formatRp(n)}
                                </button>
                            ))}
                        </div>
                        <input
                            id="is-nominal-input"
                            type="number"
                            className="is-input"
                            placeholder="Atau masukkan nominal lain (Rp)"
                            value={nominal}
                            onChange={(e) => setNominal(e.target.value)}
                        />
                        <p className="is-input-hint">Minimal nominal infaq: Rp 1.000</p>
                    </div>

                    {/* Keutamaan Infaq */}
                    <div style={{ background: 'linear-gradient(135deg, #004d40, #00695c)', borderRadius: 18, padding: '2rem', color: '#fff' }}>
                        <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#a7ffeb', marginBottom: '.4rem' }}>Al-Quran</div>
                        <h3 style={{ margin: '0 0 1.3rem', fontSize: '1.1rem', fontWeight: 800 }}>Keutamaan Berinfaq &amp; Bershodaqoh</h3>
                        {KEUTAMAAN.map((a, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: i < KEUTAMAAN.length - 1 ? '.8rem' : 0 }}>
                                <p style={{ fontStyle: 'italic', fontSize: '.85rem', color: 'rgba(255,255,255,.9)', margin: '0 0 .4rem', lineHeight: 1.65 }}>{a.teks}</p>
                                <span style={{ fontSize: '.73rem', fontWeight: 700, color: '#a7ffeb' }}>{a.ayat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kanan — Form Donasi */}
                <div className="is-form-panel">
                    <div className="is-form-header">
                        <h2>Form Donasi Infaq</h2>
                        <p>Isi data diri &amp; pilih metode pembayaran</p>
                    </div>
                    <div className="is-form-body">

                        {/* Preview nominal */}
                        <div className="is-nominal-preview">
                            <div className="is-nominal-preview-label">Peruntukan: {katObj?.label}</div>
                            <div className="is-nominal-preview-val">{nominalNum > 0 ? formatRp(nominalNum) : 'Rp 0'}</div>
                        </div>

                        {/* Nama */}
                        <div className="is-form-field">
                            <label className="is-form-label" htmlFor="is-nama">Nama Donatur</label>
                            <input id="is-nama" type="text" className="is-input" placeholder="Nama lengkap / hamba Allah"
                                value={namaDonatur} onChange={(e) => setNamaDonatur(e.target.value)} />
                        </div>

                        {/* Doa / Pesan */}
                        <div className="is-form-field">
                            <label className="is-form-label" htmlFor="is-doa">Doa / Pesan (opsional)</label>
                            <textarea id="is-doa" className="is-input" rows={2} placeholder="Contoh: untuk kesembuhan ibu saya..."
                                value={doa} onChange={(e) => setDoa(e.target.value)} style={{ resize: 'none' }} />
                        </div>

                        <button className="is-btn-lanjut" disabled={nominalNum < 1000} onClick={handleLanjut}>
                            {nominalNum < 1000 ? 'Masukkan nominal infaq' : `Lanjutkan Infaq ${formatRp(nominalNum)}`}
                        </button>

                        {/* ── Pembayaran ── */}
                        {showPayment && (
                            <div className="is-payment">
                                <h3>Pilih Metode Pembayaran</h3>
                                <div className="is-metode-tabs">
                                    <button className={`is-tab${metode === 'qris' ? ' active' : ''}`} onClick={() => setMetode('qris')}>📱 QRIS</button>
                                    <button className={`is-tab${metode === 'transfer' ? ' active' : ''}`} onClick={() => setMetode('transfer')}>🏦 Transfer</button>
                                </div>

                                {/* QRIS */}
                                {metode === 'qris' && (
                                    <div className="is-qris-box">
                                        <div className="is-qris-img">🟩</div>
                                        {/* Ganti dengan: <img src="/qris-lazis-dmi.png" alt="QRIS" style={{width:'160px',borderRadius:12}} /> */}
                                        <div className="is-qris-label">QRIS Lazis DMI DKI Jakarta</div>
                                        <div className="is-qris-sub">Scan menggunakan m-banking atau e-wallet Anda</div>
                                        <div style={{ marginTop: '.6rem', fontSize: '.82rem', background: '#e0f2f1', padding: '.4rem .8rem', borderRadius: 8, color: '#00695c', fontWeight: 600 }}>
                                            Nominal: {formatRp(nominalNum)}
                                        </div>
                                    </div>
                                )}

                                {/* Transfer */}
                                {metode === 'transfer' && (
                                    <div className="is-rek-list">
                                        {[
                                            { bank: 'BSI', no: '700.1234.5678', an: 'Lazis DMI DKI Jakarta' },
                                            { bank: 'BCA', no: '123.456.7890', an: 'Lazis DMI DKI Jakarta' },
                                            { bank: 'Mandiri', no: '1230.0012.3456', an: 'Lazis DMI DKI Jakarta' },
                                        ].map((r, i) => (
                                            <div key={i} className="is-rek-item">
                                                <div className="is-rek-bank">{r.bank}</div>
                                                <div>
                                                    <div className="is-rek-no">{r.no}</div>
                                                    <div className="is-rek-an">a.n {r.an}</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div style={{ fontSize: '.8rem', background: '#e0f2f1', padding: '.5rem .9rem', borderRadius: 8, color: '#00695c', fontWeight: 600 }}>
                                            Nominal Transfer: {formatRp(nominalNum)}
                                        </div>
                                    </div>
                                )}

                                <button className="is-btn-wa" onClick={handleKonfirmasiWA}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.673.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Konfirmasi via WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Info Tambahan ── */}
            <div className="is-info-section">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#00695c', marginBottom: '.3rem' }}>Panduan</div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a2e2e', margin: 0 }}>Tentang Infaq &amp; Shodaqoh</h2>
                </div>
                <div className="is-info-grid">
                    <div className="is-info-card">
                        <div className="is-info-title">📖 Pengertian Infaq</div>
                        <ul className="is-info-list">
                            <li>Infaq adalah mengeluarkan sebagian harta untuk kepentingan yang diperintahkan Islam</li>
                            <li>Berbeda dengan zakat, infaq tidak terikat nisab dan dapat ditunaikan kapan saja</li>
                            <li>Infaq dapat ditujukan untuk keluarga, kerabat, orang lain, maupun lembaga sosial</li>
                            <li>Hukum infaq bisa wajib (nafkah keluarga) maupun sunnah (program kebaikan)</li>
                        </ul>
                    </div>
                    <div className="is-info-card">
                        <div className="is-info-title">✨ Pengertian Shodaqoh</div>
                        <ul className="is-info-list">
                            <li>Shodaqoh bersifat lebih luas — mencakup segala bentuk kebaikan, termasuk senyum</li>
                            <li>Shodaqoh jariyah memberikan pahala yang terus mengalir meski pemberi telah wafat</li>
                            <li>Tidak terbatas pada harta; waktu, tenaga, dan ilmu juga termasuk shodaqoh</li>
                            <li>Allah melipatgandakan pahala shodaqoh hingga 700 kali lipat (QS. Al-Baqarah: 261)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfaqShodaqoh;
