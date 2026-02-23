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
import './KalkulatorZakat.css';

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
        // Validasi: Pastikan setidaknya ada satu field yang diisi
        const isAnyFieldFilled = Object.values(fields).some(val => val !== '' && val !== null);
        if (!isAnyFieldFilled) {
            alert('Silakan isi data keuangan Anda terlebih dahulu.');
            return;
        }

        const res = selectedJenis.hitung(fields);
        setHasil(res);
        setShowPayment(false);
        
        // Auto scroll ke hasil dengan sedikit delay agar render selesai
        setTimeout(() => {
            const resultElement = document.querySelector('.kz-hasil');
            if (resultElement) {
                resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    };

    // Konfirmasi via WhatsApp
    const handleKonfirmasiWA = () => {
        if (!namaDonatur.trim()) {
            alert('Silakan masukkan nama Anda untuk konfirmasi.');
            document.getElementById('kz-nama-donatur')?.focus();
            return;
        }

        const nomorWA = '6282117460200'; // Ganti dengan nomor WA Lazis DMI DKI
        const zakatText = hasil ? formatRp(hasil.zakat) : '-';
        const msg = encodeURIComponent(
            `Assalamualaikum, saya ingin mengkonfirmasi pembayaran zakat:\n\n` +
            `Nama       : ${namaDonatur}\n` +
            `Jenis Zakat: ${selectedJenis.label}\n` +
            `Jumlah Zakat: ${zakatText}\n` +
            `Metode     : ${metode === 'qris' ? 'QRIS' : 'Transfer Bank'}\n\n` +
            `Mohon konfirmasinya. Terima kasih. 🙏`
        );
        window.open(`https://wa.me/${nomorWA}?text=${msg}`, '_blank');
    };

    return (
        <div className="kz-page">
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
                                                <img src="/lazis/src/pages/zakat/qris-lazis-dmi.jpeg" />
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
