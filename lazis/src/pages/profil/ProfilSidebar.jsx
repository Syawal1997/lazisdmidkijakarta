import { Link, useLocation } from 'react-router-dom';

/**
 * ProfilSidebar
 * Sidebar navigasi bersama untuk semua sub-halaman di /profil.
 * Otomatis menandai link aktif berdasarkan URL saat ini.
 */
const ProfilSidebar = () => {
    const { pathname } = useLocation();

    const links = [
        { to: '/tentang-kami', label: 'Tentang Kami' },
        { to: '/visi-misi', label: 'Visi & Misi' },
        { to: '/susunan-pengurus', label: 'Susunan Pengurus' },
    ];

    return (
        <aside className="profil-sidebar">
            <div className="sidebar-header">
                <span className="sidebar-icon">🕌</span>
                <span className="sidebar-title">Profil Lembaga</span>
            </div>
            <nav className="sidebar-nav">
                {links.map((l) => (
                    <Link
                        key={l.to}
                        to={l.to}
                        className={`sidebar-link${pathname === l.to ? ' active' : ''}`}
                    >
                        {l.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default ProfilSidebar;
