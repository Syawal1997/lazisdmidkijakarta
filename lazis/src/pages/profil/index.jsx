/**
 * index.jsx  —  src/pages/profil/index.jsx
 * Entry point untuk semua sub-halaman Profil.
 *
 * Menyatukan ProfilSidebar + halaman yang sesuai,
 * dan menyuntikkan CSS terpusat dari profilStyles.js.
 *
 * Cara pakai di App.jsx:
 *   import Profil from './pages/profil';
 *   <Route path="/tentang-kami"      element={<Profil subPage="tentang"  />} />
 *   <Route path="/visi-misi"         element={<Profil subPage="visimisi" />} />
 *   <Route path="/susunan-pengurus"  element={<Profil subPage="pengurus" />} />
 */

import ProfilSidebar from './ProfilSidebar';
import TentangKami from './TentangKami';
import VisiMisi from './VisiMisi';
import SusunanPengurus from './SusunanPengurus';
import profilStyles from './profilStyles';

const Profil = ({ subPage }) => {
    // Pilih komponen halaman berdasarkan subPage prop
    const renderPage = () => {
        switch (subPage) {
            case 'tentang': return <TentangKami />;
            case 'visimisi': return <VisiMisi />;
            case 'pengurus': return <SusunanPengurus />;
            default: return <TentangKami />;
        }
    };

    return (
        <>
            {/* Inject CSS terpusat — hanya di-render sekali di DOM */}
            <style>{profilStyles}</style>

            <div className="profil-wrapper">
                <ProfilSidebar />
                {renderPage()}
            </div>
        </>
    );
};

export default Profil;
