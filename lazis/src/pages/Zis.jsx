/**
 * Zakat.jsx (bridge file)
 * File ini hanya menjadi jembatan (re-export) ke src/pages/ziswaf/index.jsx
 * agar import di App.jsx tidak perlu diubah.
 *
 * Semua kode halaman ada di:
 *   src/pages/zakat/index.jsx           ← entry point / router
 *   src/pages/zakat/Zakat.jsx           ← halaman utama Zakat
 *   src/pages/zakat/KalkulatorZakat.jsx ← kalkulator + pembayaran QRIS/Transfer
 *   src/pages/zakat/InfaqShodaqoh.jsx   ← halaman Infaq & Shodaqoh
 */
export { default } from './zakat/index';