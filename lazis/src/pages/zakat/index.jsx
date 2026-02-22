/**
 * index.jsx — src/pages/ziswaf/index.jsx
 * Entry point untuk semua halaman ZISWAF.
 *
 * Cara pakai di App.jsx:
 *   import Zakat from './pages/Ziswaf';
 *   <Route path="/zakat"            element={<Zakat type="zakat"   />} />
 *   <Route path="/kalkulator-zakat" element={<Zakat type="kalkulator" />} />
 *   <Route path="/infaq"            element={<Zakat type="infaq"   />} />
 *
 * Struktur folder:
 *   ziswaf/Zakat.jsx          ← Halaman utama zakat + jenis zakat
 *   ziswaf/KalkulatorZakat.jsx ← Kalkulator interaktif + pembayaran QRIS/Transfer/WA
 *   ziswaf/InfaqShodaqoh.jsx  ← Halaman infaq & shodaqoh + pembayaran
 */

import ZakatPage from './Zakat';
import KalkulatorZakat from './KalkulatorZakat';
import InfaqShodaqoh from './InfaqShodaqoh';

const Zakat = ({ type }) => {
    switch (type) {
        case 'zakat': return <ZakatPage />;
        case 'kalkulator': return <KalkulatorZakat />;
        case 'infaq': return <InfaqShodaqoh />;
        default: return <ZakatPage />;
    }
};

export default Zakat;
