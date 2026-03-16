/**
 * KalkulatorZakat.jsx
 * Fitur interaktif untuk menghitung berbagai jenis zakat sesuai syariat.
 * Dilengkapi dengan input otomatis pemisah ribuan dan integrasi pembayaran.
 */
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Konstanta Harga Emas saat ini sebagai acuan perhitungan nisab.
 * Dapat diubah secara manual atau ditarik dari API di masa depan.
 */
const GOLD_PRICE = 1400000; 

/**
 * Fungsi untuk memformat angka ke dalam format Rupiah (IDR).
 * Contoh: 1000000 -> Rp 1.000.000
 */
const formatRp = (n) =>
    new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        maximumFractionDigits: 0 
    }).format(n).replace('Rp', 'Rp ');

/**
 * Fungsi pembantu untuk memformat tampilan angka dengan titik pemisah ribuan.
 */
const formatNumber = (val) => {
    if (!val && val !== 0) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Komponen Input Khusus yang menangani pemformatan angka ribuan secara real-time.
 * Mencegah user memasukkan karakter non-angka dan memudahkan pembacaan nominal besar.
 */
const NumericInput = ({ label, value, onChange, placeholder }) => (
    <div className="kz-input-group">
        <label>{label}</label>
        <div className="input-wrapper">
            <span className="input-prefix">Rp</span>
            <input
                type="text"
                className="kz-input"
                placeholder={placeholder}
                value={formatNumber(value)}
                onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    onChange(raw ? parseInt(raw, 10) : 0);
                }}
            />
        </div>
    </div>
);

/**
 * Definisi Logika Perhitungan untuk setiap jenis Zakat.
 * Setiap objek mengandung nisab, kadar (persentase), dan fungsi hitung khusus.
 */
const JENIS_ZAKAT = [
    {
        id: 'profesi',
        label: 'Zakat Profesi',
        icon: '👔',
        getNisab: () => (85 * GOLD_PRICE) / 12,
        getNisabLabel: () => `Nisab: ${formatRp((85 * GOLD_PRICE) / 12)}/bln (85 gr emas/12)`,
        kadar: 0.025,
        fields: [
            { id: 'gaji', label: 'Gaji / Penghasilan per Bulan', placeholder: '0' },
            { id: 'penghasilan_lain', label: 'Penghasilan Lain per Bulan', placeholder: '0' },
        ],
        hitung: (f, nisab) => {
            const total = (f.gaji || 0) + (f.penghasilan_lain || 0);
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'mal',
        label: 'Zakat Mal / Tabungan',
        icon: '💰',
        getNisab: () => 85 * GOLD_PRICE,
        getNisabLabel: () => `Nisab: ${formatRp(85 * GOLD_PRICE)} (85 gr emas)`,
        kadar: 0.025,
        fields: [
            { id: 'tabungan', label: 'Total Tabungan & Deposito', placeholder: '0' },
            { id: 'investasi', label: 'Nilai Investasi (Saham/Emas/Lainnya)', placeholder: '0' },
            { id: 'utang', label: 'Utang Jangka Pendek (Jatuh Tempo)', placeholder: '0' },
        ],
        hitung: (f, nisab) => {
            const total = (f.tabungan || 0) + (f.investasi || 0) - (f.utang || 0);
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    // ... jenis zakat lainnya memiliki struktur serupa
    {
        id: 'emas',
        label: 'Zakat Emas',
        icon: '💍',
        getNisab: () => 85,
        getNisabLabel: () => `Nisab: 85 gram emas yang disimpan ≥ 1 tahun`,
        kadar: 0.025,
        fields: [
            { id: 'berat_emas', label: 'Berat Emas yang Disimpan (gram)', placeholder: '0', isGram: true },
            { id: 'harga_emas', label: 'Harga Emas saat ini (per gram)', placeholder: formatNumber(GOLD_PRICE), defaultValue: GOLD_PRICE },
        ],
        hitung: (f, nisab) => {
            const berat = f.berat_emas || 0;
            const harga = f.harga_emas || GOLD_PRICE;
            const total = berat * harga;
            const nisabRp = nisab * harga;
            return berat >= nisab ? { total, zakat: total * 0.025, nisab: nisabRp, lolos: true } : { total, nisab: nisabRp, lolos: false };
        },
    },
    {
        id: 'perdagangan',
        label: 'Zakat Perdagangan',
        icon: '🛒',
        getNisab: () => 85 * GOLD_PRICE,
        getNisabLabel: () => `Nisab: ${formatRp(85 * GOLD_PRICE)} (Setara 85 gr emas)`,
        kadar: 0.025,
        fields: [
            { id: 'stok', label: 'Nilai Stok Barang Dagangan', placeholder: '0' },
            { id: 'piutang', label: 'Piutang Lancar', placeholder: '0' },
            { id: 'kas', label: 'Kas & Setara Kas (Uang Tunai Usaha)', placeholder: '0' },
            { id: 'utang_dag', label: 'Utang Dagang (Jatuh Tempo)', placeholder: '0' },
        ],
        hitung: (f, nisab) => {
            const total = (f.stok || 0) + (f.piutang || 0) + (f.kas || 0) - (f.utang_dag || 0);
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'fitrah',
        label: 'Zakat Fitrah',
        icon: '🌙',
        getNisab: () => 0,
        getNisabLabel: () => 'Wajib bagi setiap Muslim di bulan Ramadan.',
        kadar: null,
        fields: [
            { id: 'jiwa', label: 'Jumlah Jiwa yang Ditanggung', placeholder: '1', isJiwa: true },
            { id: 'harga_brs', label: 'Harga Beras per Kg / Jiwa (Standar)', placeholder: '45.000', defaultValue: 45000 },
        ],
        hitung: (f) => {
            const jiwa = f.jiwa || 0;
            const harga = f.harga_brs || 45000;
            const zakat = jiwa * harga;
            return { total: jiwa, zakat, nisab: 0, lolos: true };
        },
    },
];

const KalkulatorZakat = () => {
    const [selectedJenis, setSelectedJenis] = useState(JENIS_ZAKAT[0]);
    const [fields, setFields] = useState({});
    const [hasil, setHasil] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [metode, setMetode] = useState('qris'); 
    const [namaDonatur, setNamaDonatur] = useState('');

    const handleJenisChange = useCallback((jenis) => {
        setSelectedJenis(jenis);
        setFields({});
        setHasil(null);
        setShowPayment(false);
    }, []);

    const handleHitung = () => {
        const nisab = selectedJenis.getNisab();
        const res = selectedJenis.hitung(fields, nisab);
        setHasil(res);
        setShowPayment(false);
    };

    const handleKonfirmasiWA = () => {
        const nomorWA = '6282117460200';
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
        .kz-page { background: var(--bg-body); min-height: 100vh; padding-top: 5rem; }
        .kz-hero {
          background: linear-gradient(135deg, var(--primary-900), var(--primary-600));
          padding: 4rem 0; text-align: center; color: var(--bg-white);
        }
        .kz-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
        .kz-hero p { opacity: 0.9; max-width: 600px; margin: 0 auto; font-size: 1.1rem; }
        
        .kz-main { 
          max-width: 1100px; margin: -3rem auto 0; padding: 0 1rem 4rem; 
          display: grid; grid-template-columns: 280px 1fr; gap: 2rem; 
        }

        .kz-sidebar {
          background: white; border-radius: 1.25rem; box-shadow: var(--shadow-lg);
          padding: 1.25rem; position: sticky; top: 100px; height: fit-content;
          border: 1px solid var(--border-color);
        }
        .kz-jenis-btn {
          display: flex; align-items: center; gap: 0.75rem; width: 100%;
          padding: 0.875rem 1rem; border: none; background: none; border-radius: 0.75rem;
          color: var(--text-muted); font-weight: 600; transition: all 0.2s; text-align: left;
          font-size: 0.95rem;
        }
        .kz-jenis-btn:hover { background: var(--primary-50); color: var(--primary); }
        .kz-jenis-btn.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }

        .kz-content {
          background: white; border-radius: 1.25rem; box-shadow: var(--shadow-lg);
          overflow: hidden; border: 1px solid var(--border-color);
        }
        .kz-content-header {
          background: linear-gradient(to right, var(--primary-50), white); 
          padding: 2.5rem; border-bottom: 1px solid var(--border-color);
        }
        .kz-content-body { padding: 2.5rem; }
        
        .kz-input-group { margin-bottom: 1.5rem; }
        .kz-input-group label { display: block; font-weight: 700; margin-bottom: 0.625rem; font-size: 0.9rem; color: var(--text-main); }
        
        .input-wrapper {
            position: relative; display: flex; align-items: center;
        }
        .input-prefix {
            position: absolute; left: 1rem; font-weight: 600; color: var(--text-muted);
        }
        .kz-input {
          width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; border: 1.5px solid var(--border-color);
          border-radius: 0.75rem; outline: none; transition: all 0.2s; font-weight: 600;
        }
        .kz-input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-100); }
        
        /* Gram input exception */
        .no-prefix .kz-input { padding-left: 1rem; }

        .kz-result-box {
          margin-top: 2.5rem; padding: 2.5rem; border-radius: 1.25rem;
          background: var(--primary-50); border: 2px dashed var(--primary-300);
          text-align: center;
        }
        
        .kz-payment-card {
            border: 1px solid var(--border-color); border-radius: 1rem;
            padding: 1.25rem; transition: all 0.2s; cursor: pointer;
            display: flex; align-items: center; gap: 1rem;
        }
        .kz-payment-card:hover { border-color: var(--primary); background: var(--primary-50); }
        .kz-payment-card.active { border-color: var(--primary); background: var(--primary-50); ring: 2px var(--primary); }

        @media (max-width: 992px) {
          .kz-main { grid-template-columns: 1fr; margin-top: 1rem; }
          .kz-sidebar { position: static; }
          .kz-content-header, .kz-content-body { padding: 1.5rem; }
        }
      `}</style>

            <div className="kz-hero">
                <div className="container">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >Kalkulator Zakat</motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >Hitung kewajiban ZISWAF Anda dengan parameter terbaru sesuai syariat.</motion.p>
                </div>
            </div>

            <div className="kz-main">
                <aside className="kz-sidebar">
                    <h6 className="fw-bold mb-3 px-2 text-uppercase small text-muted letter-spacing-1">Pilih Jenis Zakat</h6>
                    <div className="d-flex flex-column gap-1">
                        {JENIS_ZAKAT.map((j) => (
                            <button
                                key={j.id}
                                className={`kz-jenis-btn ${selectedJenis.id === j.id ? 'active' : ''}`}
                                onClick={() => handleJenisChange(j)}
                            >
                                <span className="fs-5">{j.icon}</span> {j.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-light rounded-3 small">
                        <p className="mb-1 fw-bold text-success">Info Harga Emas</p>
                        <p className="mb-0 text-muted">Standar harga emas saat ini: <br/><b>{formatRp(GOLD_PRICE)}/gram</b></p>
                    </div>
                </aside>

                <main className="kz-content">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={selectedJenis.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="kz-content-header">
                                <h3 className="fw-bold mb-2">{selectedJenis.icon} {selectedJenis.label}</h3>
                                <p className="text-muted mb-0">{selectedJenis.getNisabLabel()}</p>
                            </div>
                            <div className="kz-content-body">
                                <div className="row">
                                    {selectedJenis.fields.map((f) => (
                                        <div key={f.id} className={`col-md-6 ${f.isGram || f.isJiwa ? 'no-prefix' : ''}`}>
                                            {f.isGram || f.isJiwa ? (
                                                <div className="kz-input-group">
                                                    <label>{f.label}</label>
                                                    <input
                                                        type="number"
                                                        className="kz-input"
                                                        placeholder={f.placeholder}
                                                        value={fields[f.id] || ''}
                                                        onChange={(e) => setFields((prev) => ({ ...prev, [f.id]: parseInt(e.target.value, 10) || 0 }))}
                                                    />
                                                </div>
                                            ) : (
                                                <NumericInput
                                                    label={f.label}
                                                    placeholder={f.placeholder}
                                                    value={fields[f.id] || 0}
                                                    onChange={(val) => setFields((prev) => ({ ...prev, [f.id]: val }))}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-success btn-lg w-100 mt-2 py-3 fw-bold shadow-sm rounded-3" onClick={handleHitung}>
                                    Mulai Hitung
                                </button>

                                {hasil && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`kz-result-box ${!hasil.lolos ? 'bg-light border-secondary opacity-75' : ''}`}
                                    >
                                        {hasil.lolos ? (
                                            <div>
                                                <span className="text-muted small text-uppercase fw-bold letter-spacing-1">Kewajiban Zakat Anda</span>
                                                <h1 className="display-4 fw-bold text-success my-2">{formatRp(hasil.zakat)}</h1>
                                                <p className="text-muted mb-4">
                                                    Total Harta: <b>{selectedJenis.id === 'fitrah' ? `${hasil.total} Jiwa` : formatRp(hasil.total)}</b>
                                                </p>
                                                <button className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow fw-bold" onClick={() => setShowPayment(true)}>
                                                    Tunaikan Sekarang
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="py-2">
                                                <h4 className="fw-bold text-dark mb-2">⚠️ Belum Mencapai Nisab</h4>
                                                <p className="text-muted mb-0">Harta Anda ({formatRp(hasil.total)}) belum mencapai syarat minimal wajib zakat ({formatRp(hasil.nisab)}).</p>
                                                <p className="small text-muted mt-3">Tetaplah berbagi melalui <b>Infaq & Shodaqoh</b> untuk keberkahan harta.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {showPayment && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-5 p-4 border rounded-4 bg-white shadow-sm"
                                    >
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <div className="bg-success bg-opacity-10 p-2 rounded-3">
                                                <i className="fas fa-credit-card text-success"></i>
                                            </div>
                                            <h5 className="fw-bold mb-0">Pilih Metode Pembayaran</h5>
                                        </div>
                                        
                                        <div className="row g-3 mb-4">
                                            <div className="col-sm-6">
                                                <div className={`kz-payment-card ${metode === 'qris' ? 'active' : ''}`} onClick={() => setMetode('qris')}>
                                                    <i className="fas fa-qrcode fs-4 text-success"></i>
                                                    <div>
                                                        <p className="mb-0 fw-bold">QRIS</p>
                                                        <small className="text-muted">E-Wallet & M-Banking</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`kz-payment-card ${metode === 'transfer' ? 'active' : ''}`} onClick={() => setMetode('transfer')}>
                                                    <i className="fas fa-university fs-4 text-success"></i>
                                                    <div>
                                                        <p className="mb-0 fw-bold">Transfer Bank</p>
                                                        <small className="text-muted">BSI, DKI Syariah</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {metode === 'qris' ? (
                                            <div className="text-center py-4 bg-light rounded-4 mb-4 border">
                                                <div className="mx-auto bg-white p-3 shadow-sm rounded-4 mb-3" style={{ width: '220px', height: '220px' }}>
                                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LazisDMI_Donation" alt="QRIS" className="w-100" />
                                                </div>
                                                <p className="fw-bold mb-0">Scan QRIS Resmi Lazis DMI</p>
                                                <p className="small text-muted mb-0 px-3">Silakan scan dan masukkan nominal: <br/><span className="text-success fw-bold">{formatRp(hasil.zakat)}</span></p>
                                            </div>
                                        ) : (
                                            <div className="mb-4 border rounded-4 overflow-hidden">
                                                {[
                                                    { bank: 'Bank BSI', no: '7123 4567 89', an: 'Lazis DMI DKI Jakarta' },
                                                    { bank: 'Bank DKI Syariah', no: '123 45 67890', an: 'Lazis DMI DKI Jakarta' }
                                                ].map((r, i) => (
                                                    <div key={i} className="p-3 bg-white d-flex justify-content-between align-items-center border-bottom">
                                                        <div>
                                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                                <span className="badge bg-success bg-opacity-10 text-success small">{r.bank}</span>
                                                            </div>
                                                            <p className="mb-0 fw-bold fs-5">{r.no}</p>
                                                            <small className="text-muted">a.n {r.an}</small>
                                                        </div>
                                                        <button className="btn btn-sm btn-outline-success px-3" onClick={() => navigator.clipboard.writeText(r.no.replace(/\s/g, ''))}>
                                                            Salin
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label className="small fw-bold mb-2">Nama Muzakki (Opsional)</label>
                                            <input type="text" className="form-control py-3 rounded-3 shadow-none border-2" style={{ borderColor: '#eee' }} placeholder="Hamba Allah" value={namaDonatur} onChange={(e) => setNamaDonatur(e.target.value)} />
                                        </div>

                                        <button className="btn btn-success w-100 py-3 rounded-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2" onClick={handleKonfirmasiWA}>
                                            <i className="fab fa-whatsapp fs-5"></i> Kirim Bukti Pembayaran
                                        </button>
                                        <p className="text-center small text-muted mt-3 mb-0">Klik tombol di atas untuk konfirmasi otomatis ke admin kami.</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default KalkulatorZakat;