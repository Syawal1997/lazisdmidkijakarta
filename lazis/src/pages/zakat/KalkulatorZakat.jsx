/**
 * KalkulatorZakat.jsx
 * Kalkulator zakat interaktif + opsi pembayaran QRIS / Transfer + konfirmasi WhatsApp
 * Terinspirasi nucare.id/kalkulator-zakat, dimodifikasi untuk Lazis DMI DKI Jakarta
 */
import { useState, useCallback } from 'react';

// ── Data jenis zakat & field kalkulatornya ──────────────────────────────────
const JENIS_ZAKAT = [
    {
        id: 'profesi',
        label: 'Zakat Profesi',
        icon: '👔',
        nisabLabel: 'Nisab: Rp 6.725.000/bln (85 gr emas × harga emas)',
        kadar: 0.025,
        fields: [
            { id: 'gaji', label: 'Gaji / Penghasilan per Bulan (Rp)', placeholder: 'Contoh: 8000000' },
            { id: 'penghasilan_lain', label: 'Penghasilan Lain per Bulan (Rp)', placeholder: 'Contoh: 2000000' },
        ],
        hitung: (f) => {
            const total = (Number(f.gaji) || 0) + (Number(f.penghasilan_lain) || 0);
            const nisab = 6725000;
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'mal',
        label: 'Zakat Mal / Tabungan',
        icon: '💰',
        nisabLabel: 'Nisab: Rp 161.500.000 (85 gr emas), kepemilikan ≥ 1 tahun',
        kadar: 0.025,
        fields: [
            { id: 'tabungan', label: 'Total Tabungan & Deposito (Rp)', placeholder: 'Contoh: 200000000' },
            { id: 'investasi', label: 'Nilai Investasi (Rp)', placeholder: 'Contoh: 50000000' },
            { id: 'utang', label: 'Utang Jangka Pendek (Rp)', placeholder: 'Contoh: 10000000' },
        ],
        hitung: (f) => {
            const total = (Number(f.tabungan) || 0) + (Number(f.investasi) || 0) - (Number(f.utang) || 0);
            const nisab = 161500000;
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'emas',
        label: 'Zakat Emas & Perak',
        icon: '💍',
        nisabLabel: 'Nisab: 85 gram emas yang disimpan ≥ 1 tahun',
        kadar: 0.025,
        fields: [
            { id: 'berat_emas', label: 'Berat Emas yang Disimpan (gram)', placeholder: 'Contoh: 100' },
            { id: 'harga_emas', label: 'Harga Emas per Gram (Rp)', placeholder: 'Contoh: 1900000' },
        ],
        hitung: (f) => {
            const berat = Number(f.berat_emas) || 0;
            const harga = Number(f.harga_emas) || 1900000;
            const total = berat * harga;
            const nisab = 85 * harga;
            return berat >= 85 ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'perdagangan',
        label: 'Zakat Perdagangan',
        icon: '🛒',
        nisabLabel: 'Nisab: Rp 161.500.000, kadar 2,5% dari aset bersih',
        kadar: 0.025,
        fields: [
            { id: 'stok', label: 'Nilai Stok Barang (Rp)', placeholder: 'Contoh: 100000000' },
            { id: 'piutang', label: 'Piutang Lancar (Rp)', placeholder: 'Contoh: 30000000' },
            { id: 'kas', label: 'Kas & Setara Kas (Rp)', placeholder: 'Contoh: 50000000' },
            { id: 'utang_dag', label: 'Utang Dagang (Rp)', placeholder: 'Contoh: 20000000' },
        ],
        hitung: (f) => {
            const total = (Number(f.stok) || 0) + (Number(f.piutang) || 0) + (Number(f.kas) || 0) - (Number(f.utang_dag) || 0);
            const nisab = 161500000;
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'pertanian',
        label: 'Zakat Pertanian',
        icon: '🌾',
        nisabLabel: 'Nisab: 653 kg beras. Kadar: 5% (irigasi berbayar) / 10% (hujan)',
        kadar: 0.05,
        fields: [
            { id: 'hasil_panen', label: 'Hasil Panen (kg)', placeholder: 'Contoh: 1000' },
            { id: 'harga_kg', label: 'Harga per Kg (Rp)', placeholder: 'Contoh: 12000' },
            { id: 'irigasi_bayar', label: 'Menggunakan Irigasi Berbayar? (1=Ya, 0=Tdk)', placeholder: '1 atau 0' },
        ],
        hitung: (f) => {
            const hasil = Number(f.hasil_panen) || 0;
            const harga = Number(f.harga_kg) || 12000;
            const total = hasil * harga;
            const nisab = 653 * harga;
            const kadar = Number(f.irigasi_bayar) === 1 ? 0.05 : 0.1;
            return hasil >= 653 ? { total, zakat: total * kadar, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'fitrah',
        label: 'Zakat Fitrah',
        icon: '🌙',
        nisabLabel: 'Wajib bagi setiap Muslim di bulan Ramadan. Kadar: 2,5 kg beras per jiwa.',
        kadar: null,
        fields: [
            { id: 'jiwa', label: 'Jumlah Jiwa yang Ditanggung', placeholder: 'Contoh: 4' },
            { id: 'harga_brs', label: 'Harga Beras per Kg (Rp)', placeholder: 'Contoh: 14000' },
        ],
        hitung: (f) => {
            const jiwa = Number(f.jiwa) || 1;
            const harga = Number(f.harga_brs) || 14000;
            const zakat = jiwa * 2.5 * harga;
            return { total: jiwa, zakat, nisab: 0, lolos: true };
        },
    },
];

// ── Helper format Rupiah ────────────────────────────────────────────────────
const formatRp = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// ── Komponen utama ──────────────────────────────────────────────────────────
const KalkulatorZakat = () => {
    const [selectedJenis, setSelectedJenis] = useState(JENIS_ZAKAT[0]);
    const [fields, setFields] = useState({});
    const [hasil, setHasil] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [metode, setMetode] = useState('qris'); // 'qris' | 'transfer'
    const [namaDonatur, setNamaDonatur] = useState('');

    // Ganti jenis zakat → reset form
    const handleJenisChange = useCallback((jenis) => {
        setSelectedJenis(jenis);
        setFields({});
        setHasil(null);
        setShowPayment(false);
    }, []);

    // Hitung zakat
    const handleHitung = () => {
        const res = selectedJenis.hitung(fields);
        setHasil(res);
        setShowPayment(false);
    };

    // Konfirmasi via WhatsApp
    const handleKonfirmasiWA = () => {
        const nomorWA = '6282117460200'; // Ganti dengan nomor WA Lazis DMI DKI
        const zakatText = hasil ? formatRp(hasil.zakat) : '-';
        const msg = encodeURIComponent(
            `Assalamualaikum, saya ingin mengkonfirmasi pembayaran zakat:\n\n` +
            `Nama       : ${namaDonatur || '(belum diisi)'}\n` +
            `Jenis Zakat: ${selectedJenis.label}\n` +
            `Jumlah Zakat: ${zakatText}\n` +
            `Metode     : ${metode === 'qris' ? 'QRIS' : 'Transfer Bank'}\n\n` +
            `Mohon konfirmasinya. Terima kasih. 🙏`
        );
        window.open(`https://wa.me/${nomorWA}?text=${msg}`, '_blank');
    };

    return (
        <div className="kz-page">
            <style>{`
        .kz-page { font-family: 'Segoe UI', sans-serif; background: #f4f7f4; min-height: 100vh; }

        /* ── Hero ── */
        .kz-hero {
          background: linear-gradient(135deg, #1b5e20, #2e7d32 55%, #33691e);
          padding: 6rem 0 3rem; text-align: center; color: #fff;
        }
        .kz-hero-badge {
          display: inline-block; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.3);
          font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: .3rem .9rem; border-radius: 50px; margin-bottom: 1rem;
        }
        .kz-hero h1 { font-size: 2.4rem; font-weight: 900; margin: 0 0 .6rem; }
        .kz-hero p  { opacity: .85; font-size: .95rem; margin: 0; }

        /* ── Main Layout ── */
        .kz-main { max-width: 1100px; margin: -2rem auto 0; padding: 0 1.5rem 4rem; display: grid; grid-template-columns: 280px 1fr; gap: 1.8rem; align-items: start; }

        /* ── Jenis Sidebar ── */
        .kz-jenis-panel { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,.08); overflow: hidden; position: sticky; top: 90px; }
        .kz-jenis-header { background: linear-gradient(135deg, #1b5e20, #2e7d32); color: #fff; padding: 1rem 1.3rem; font-size: .9rem; font-weight: 700; }
        .kz-jenis-btn {
          display: flex; align-items: center; gap: .7rem; width: 100%; text-align: left;
          padding: .75rem 1.2rem; border: none; background: none; cursor: pointer;
          font-size: .85rem; color: #444; border-left: 3px solid transparent; transition: all .15s;
        }
        .kz-jenis-btn:hover  { background: #f1f8e9; color: #2e7d32; border-left-color: #a5d6a7; }
        .kz-jenis-btn.active { background: #e8f5e9; color: #1b5e20; font-weight: 700; border-left-color: #2e7d32; }
        .kz-jenis-btn-icon   { font-size: 1.1rem; flex-shrink: 0; }

        /* ── Calculator Card ── */
        .kz-calc-card { background: #fff; border-radius: 18px; box-shadow: 0 4px 20px rgba(0,0,0,.08); overflow: hidden; }
        .kz-calc-header { background: linear-gradient(135deg, #2e7d32, #43a047); padding: 1.5rem 2rem; color: #fff; }
        .kz-calc-header h2 { font-size: 1.25rem; font-weight: 800; margin: 0 0 .3rem; }
        .kz-calc-header p  { font-size: .82rem; opacity: .85; margin: 0; }
        .kz-calc-body { padding: 1.8rem 2rem; }

        /* ── Form Fields ── */
        .kz-field { margin-bottom: 1.2rem; }
        .kz-label { display: block; font-size: .83rem; font-weight: 600; color: #374737; margin-bottom: .4rem; }
        .kz-input {
          width: 100%; padding: .65rem 1rem; border: 2px solid #e0e0e0; border-radius: 10px;
          font-size: .9rem; transition: border-color .2s; outline: none; box-sizing: border-box;
        }
        .kz-input:focus { border-color: #4caf50; }
        .kz-btn-hitung {
          width: 100%; padding: .9rem; background: linear-gradient(135deg, #2e7d32, #43a047);
          color: #fff; border: none; border-radius: 12px; font-size: 1rem; font-weight: 700;
          cursor: pointer; transition: opacity .2s, transform .2s;
        }
        .kz-btn-hitung:hover { opacity: .9; transform: translateY(-1px); }

        /* ── Hasil ── */
        .kz-hasil { margin-top: 1.5rem; border-radius: 14px; overflow: hidden; }
        .kz-hasil-lolos { background: linear-gradient(120deg, #e8f5e9, #f1f8e9); border: 2px solid #a5d6a7; border-radius: 14px; padding: 1.5rem; }
        .kz-hasil-gagal { background: #fff8e1; border: 2px solid #ffe082; border-radius: 14px; padding: 1.5rem; }
        .kz-hasil-label { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #558b2f; margin-bottom: .5rem; }
        .kz-hasil-amount { font-size: 2rem; font-weight: 900; color: #1b5e20; margin: 0 0 .3rem; }
        .kz-hasil-sub   { font-size: .82rem; color: #666; margin: 0; }
        .kz-hasil-gagal-title { font-weight: 700; color: #e65100; margin-bottom: .3rem; }
        .kz-btn-bayar {
          width: 100%; margin-top: 1.1rem; padding: .85rem; background: #2e7d32;
          color: #fff; border: none; border-radius: 12px; font-size: .95rem; font-weight: 700;
          cursor: pointer; transition: background .2s;
        }
        .kz-btn-bayar:hover { background: #1b5e20; }

        /* ── Payment Modal Area ── */
        .kz-payment { margin-top: 1.5rem; background: #fff; border: 2px solid #e8f5e9; border-radius: 16px; padding: 1.5rem; }
        .kz-payment h3 { font-size: 1rem; font-weight: 800; color: #1b5e20; margin: 0 0 1rem; }
        .kz-metode-tabs { display: flex; gap: .6rem; margin-bottom: 1.3rem; }
        .kz-tab {
          flex: 1; padding: .6rem; border: 2px solid #e0e0e0; border-radius: 10px;
          background: #fff; cursor: pointer; font-size: .83rem; font-weight: 600; color: #666;
          transition: all .15s; text-align: center;
        }
        .kz-tab.active { border-color: #4caf50; background: #e8f5e9; color: #1b5e20; }

        /* QRIS Display */
        .kz-qris-box { text-align: center; padding: 1rem 0; }
        .kz-qris-img {
          width: 200px; height: 200px; border: 3px solid #c8e6c9; border-radius: 12px;
          margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;
          background: #f1f8e9; font-size: 4rem;
        }
        .kz-qris-label { font-size: .85rem; font-weight: 700; color: #1b5e20; margin-bottom: .3rem; }
        .kz-qris-sub   { font-size: .78rem; color: #666; }

        /* Transfer Display */
        .kz-rek-list { display: flex; flex-direction: column; gap: .8rem; margin-bottom: 1rem; }
        .kz-rek-item {
          display: flex; align-items: center; gap: 1rem; background: #f9fbe7;
          border: 1px solid #dcedc8; border-radius: 10px; padding: .9rem 1.1rem;
        }
        .kz-rek-bank { font-size: .75rem; font-weight: 800; color: #558b2f; min-width: 40px; }
        .kz-rek-detail { flex: 1; }
        .kz-rek-no    { font-size: .95rem; font-weight: 700; color: #1a2e1a; letter-spacing: .05em; }
        .kz-rek-an    { font-size: .75rem; color: #666; }

        /* Nama & Konfirmasi */
        .kz-nama-field { margin: 1rem 0; }
        .kz-btn-wa {
          width: 100%; padding: .85rem; background: #25d366;
          color: #fff; border: none; border-radius: 12px; font-size: .9rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: .5rem;
          transition: background .2s;
        }
        .kz-btn-wa:hover { background: #1da851; }

        /* ── Why Grid ── */
        .kz-why { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem 4rem; }
        .kz-why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.1rem; margin-top: 1.5rem; }
        .kz-why-card {
          background: #fff; border-radius: 14px; padding: 1.4rem 1.2rem; text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,.06); border-top: 3px solid #4caf50;
        }
        .kz-why-icon  { font-size: 2rem; margin-bottom: .6rem; }
        .kz-why-title { font-size: .88rem; font-weight: 700; color: #1b5e20; margin: 0 0 .4rem; }
        .kz-why-desc  { font-size: .78rem; color: #666; line-height: 1.5; margin: 0; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .kz-main { grid-template-columns: 1fr; }
          .kz-jenis-panel { position: static; }
          .kz-why-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .kz-why-grid { grid-template-columns: 1fr; }
          .kz-calc-body { padding: 1.2rem; }
        }
      `}</style>

            {/* ── Hero ── */}
            <div className="kz-hero">
                <span className="kz-hero-badge">Kalkulator Zakat</span>
                <h1>Hitung Zakat Anda dengan Mudah</h1>
                <p>Kalkulasikan kewajiban zakat Anda secara akurat, lalu bayar langsung melalui QRIS atau transfer bank</p>
            </div>

            {/* ── Main ── */}
            <div className="kz-main">

                {/* Sidebar Jenis Zakat */}
                <aside className="kz-jenis-panel">
                    <div className="kz-jenis-header">📋 Pilih Jenis Zakat</div>
                    {JENIS_ZAKAT.map((j) => (
                        <button
                            key={j.id}
                            className={`kz-jenis-btn${selectedJenis.id === j.id ? ' active' : ''}`}
                            onClick={() => handleJenisChange(j)}
                        >
                            <span className="kz-jenis-btn-icon">{j.icon}</span>
                            {j.label}
                        </button>
                    ))}
                </aside>

                {/* Calculator */}
                <div>
                    <div className="kz-calc-card">
                        <div className="kz-calc-header">
                            <h2>{selectedJenis.icon} {selectedJenis.label}</h2>
                            <p>{selectedJenis.nisabLabel}</p>
                        </div>
                        <div className="kz-calc-body">
                            {selectedJenis.fields.map((f) => (
                                <div key={f.id} className="kz-field">
                                    <label className="kz-label">{f.label}</label>
                                    <input
                                        id={`kz-${f.id}`}
                                        type="number"
                                        className="kz-input"
                                        placeholder={f.placeholder}
                                        value={fields[f.id] || ''}
                                        onChange={(e) => setFields((prev) => ({ ...prev, [f.id]: e.target.value }))}
                                    />
                                </div>
                            ))}
                            <button className="kz-btn-hitung" onClick={handleHitung}>
                                🧮 Hitung Zakat Saya
                            </button>

                            {/* Hasil */}
                            {hasil && (
                                <div className="kz-hasil">
                                    {hasil.lolos ? (
                                        <div className="kz-hasil-lolos">
                                            <div className="kz-hasil-label">Zakat yang Wajib Anda Tunaikan</div>
                                            <div className="kz-hasil-amount">{formatRp(hasil.zakat)}</div>
                                            <p className="kz-hasil-sub">
                                                {selectedJenis.kadar
                                                    ? `(${selectedJenis.kadar * 100}% × ${formatRp(hasil.total)})`
                                                    : `Berdasarkan data yang Anda masukkan`}
                                            </p>
                                            <button className="kz-btn-bayar" onClick={() => setShowPayment(true)}>
                                                💳 Bayar Zakat Sekarang
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="kz-hasil-gagal">
                                            <div className="kz-hasil-gagal-title">⚠️ Belum Mencapai Nisab</div>
                                            <p style={{ fontSize: '.83rem', color: '#555', margin: 0 }}>
                                                Harta Anda ({formatRp(hasil.total)}) belum mencapai nisab ({formatRp(hasil.nisab)}).
                                                Zakat belum wajib, namun Anda tetap dianjurkan bersedekah / berinfaq.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Pembayaran */}
                            {showPayment && hasil?.lolos && (
                                <div className="kz-payment">
                                    <h3>Pilih Metode Pembayaran</h3>

                                    {/* Tabs */}
                                    <div className="kz-metode-tabs">
                                        <button className={`kz-tab${metode === 'qris' ? ' active' : ''}`} onClick={() => setMetode('qris')}>
                                            📱 QRIS
                                        </button>
                                        <button className={`kz-tab${metode === 'transfer' ? ' active' : ''}`} onClick={() => setMetode('transfer')}>
                                            🏦 Transfer Bank
                                        </button>
                                    </div>

                                    {/* QRIS */}
                                    {metode === 'qris' && (
                                        <div className="kz-qris-box">
                                            <div className="kz-qris-img">
                                                {/* Placeholder QRIS — ganti dengan <img src="/qris-lazis-dmi.png" /> */}
                                                🟩
                                            </div>
                                            <div className="kz-qris-label">QRIS Lazis DMI DKI Jakarta</div>
                                            <div className="kz-qris-sub">Scan dengan aplikasi dompet digital / m-banking Anda</div>
                                            <div style={{ marginTop: '.6rem', fontSize: '.82rem', background: '#e8f5e9', padding: '.5rem .8rem', borderRadius: 8, color: '#2e7d32', fontWeight: 600 }}>
                                                Nominal: {formatRp(hasil.zakat)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Transfer */}
                                    {metode === 'transfer' && (
                                        <div className="kz-rek-list">
                                            {[
                                                { bank: 'BSI', no: '700.1234.5678', an: 'Lazis DMI DKI Jakarta' },
                                                { bank: 'BCA', no: '123.456.7890', an: 'Lazis DMI DKI Jakarta' },
                                                { bank: 'Mandiri', no: '1230.0012.3456', an: 'Lazis DMI DKI Jakarta' },
                                            ].map((r, i) => (
                                                <div key={i} className="kz-rek-item">
                                                    <div className="kz-rek-bank">{r.bank}</div>
                                                    <div className="kz-rek-detail">
                                                        <div className="kz-rek-no">{r.no}</div>
                                                        <div className="kz-rek-an">a.n {r.an}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ fontSize: '.82rem', background: '#e8f5e9', padding: '.6rem 1rem', borderRadius: 8, color: '#2e7d32', fontWeight: 600 }}>
                                                Nominal Transfer: {formatRp(hasil.zakat)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Nama & Konfirmasi WA */}
                                    <div className="kz-nama-field">
                                        <label className="kz-label">Nama Anda (untuk konfirmasi)</label>
                                        <input
                                            id="kz-nama-donatur"
                                            type="text"
                                            className="kz-input"
                                            placeholder="Masukkan nama lengkap Anda"
                                            value={namaDonatur}
                                            onChange={(e) => setNamaDonatur(e.target.value)}
                                        />
                                    </div>
                                    <button className="kz-btn-wa" onClick={handleKonfirmasiWA}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.673.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        Konfirmasi Pembayaran via WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mengapa Zakat di Lazis DMI DKI ── */}
            <div className="kz-why">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2e7d32', marginBottom: '.3rem' }}>Keunggulan</div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a2e1a', margin: 0 }}>Mengapa Bayar Zakat di Lazis DMI DKI?</h2>
                </div>
                <div className="kz-why-grid">
                    {[
                        { icon: '🛡️', judul: 'Terpercaya & Amanah', desc: 'Dikelola oleh lembaga resmi DMI DKI Jakarta yang telah berpengalaman, diawasi langsung oleh Pimpinan Wilayah DMI DKI.' },
                        { icon: '🎯', judul: 'Tepat Sasaran', desc: 'Zakat disalurkan kepada 8 golongan yang berhak sesuai syariat Islam melalui verifikasi ketat. ' },
                        { icon: '📊', judul: 'Transparan & Akuntabel', desc: 'Laporan keuangan dan data penyaluran zakat dapat diakses secara terbuka dan dipertanggungjawabkan.' },
                        { icon: '🕌', judul: 'Berbasis Jaringan Masjid', desc: 'Bersinergi dengan ratusan masjid se-DKI Jakarta agar distribusi zakat merata dan dekat dengan mustahik.' },
                    ].map((w, i) => (
                        <div key={i} className="kz-why-card">
                            <div className="kz-why-icon">{w.icon}</div>
                            <div className="kz-why-title">{w.judul}</div>
                            <p className="kz-why-desc">{w.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KalkulatorZakat;
