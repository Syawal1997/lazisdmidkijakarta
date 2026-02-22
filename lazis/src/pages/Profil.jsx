/**
 * Profil.jsx
 * File ini sekarang hanya menjadi jembatan (re-export) ke src/pages/profil/index.jsx
 * agar import di App.jsx tidak perlu diubah.
 *
 * Semua kode halaman ada di:
 *   src/pages/profil/index.jsx          ← entry point
 *   src/pages/profil/TentangKami.jsx    ← halaman Tentang Kami
 *   src/pages/profil/VisiMisi.jsx       ← halaman Visi & Misi
 *   src/pages/profil/SusunanPengurus.jsx ← halaman Susunan Pengurus
 *   src/pages/profil/ProfilSidebar.jsx  ← sidebar navigasi
 *   src/pages/profil/profilStyles.js    ← CSS terpusat
 */
export { default } from './profil/index';