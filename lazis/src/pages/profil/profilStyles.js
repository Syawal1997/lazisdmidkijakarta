/**
 * profilStyles.js
 * Semua CSS untuk halaman Profil (Tentang Kami, Visi & Misi, Susunan Pengurus)
 * dipusatkan di sini agar mudah dikelola.
 */
const profilStyles = `
  /* ---- Layout ---- */
  .profil-wrapper {
    display: flex;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 1.5rem 4rem;
    align-items: flex-start;
  }

  /* ---- Sidebar ---- */
  .profil-sidebar {
    width: 240px;
    flex-shrink: 0;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,.08);
    overflow: hidden;
    position: sticky;
    top: 90px;
  }
  .sidebar-header {
    background: linear-gradient(135deg, #1b5e20, #2e7d32);
    color: #fff;
    padding: 1.2rem 1.4rem;
    display: flex;
    align-items: center;
    gap: .6rem;
    font-weight: 700;
    font-size: .95rem;
  }
  .sidebar-icon { font-size: 1.2rem; }
  .sidebar-nav { padding: .6rem 0; }
  .sidebar-link {
    display: block;
    padding: .75rem 1.4rem;
    color: #444;
    text-decoration: none;
    font-size: .9rem;
    border-left: 3px solid transparent;
    transition: all .2s;
  }
  .sidebar-link:hover {
    background: #f1f8e9;
    color: #2e7d32;
    border-left-color: #81c784;
  }
  .sidebar-link.active {
    background: #e8f5e9;
    color: #1b5e20;
    font-weight: 700;
    border-left-color: #2e7d32;
  }

  /* ---- Content ---- */
  .profil-content { flex: 1; min-width: 0; }

  /* ---- Hero ---- */
  .profil-hero {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    min-height: 240px;
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
  }
  .tentang-hero  { background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%); }
  .visimisi-hero { background: linear-gradient(135deg, #004d40 0%, #00695c 50%, #00796b 100%); }
  .pengurus-hero { background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%); }
  .profil-hero-overlay {
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .profil-hero-body {
    position: relative;
    padding: 2.5rem 3rem;
    z-index: 1;
  }
  .profil-hero-badge {
    display: inline-block;
    background: rgba(255,255,255,.2);
    color: #fff;
    font-size: .78rem;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: .3rem .9rem;
    border-radius: 50px;
    margin-bottom: .8rem;
  }
  .profil-hero-title {
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 .5rem;
    line-height: 1.2;
  }
  .profil-hero-subtitle {
    color: rgba(255,255,255,.8);
    font-size: .95rem;
    margin: 0;
    max-width: 480px;
  }

  /* ---- Section ---- */
  .profil-section {
    background: #fff;
    border-radius: 16px;
    padding: 2rem 2.2rem;
    margin-bottom: 1.8rem;
    box-shadow: 0 2px 16px rgba(0,0,0,.06);
  }
  .profil-section-label {
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #2e7d32;
    margin-bottom: .4rem;
  }
  .profil-section-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1b2d1b;
    margin: 0 0 .4rem;
  }
  .profil-section-subtitle {
    color: #666;
    font-size: .9rem;
    margin: 0 0 1.5rem;
  }

  /* ---- Quote ---- */
  .profil-quote {
    border-left: 4px solid #4caf50;
    padding: .8rem 1.2rem;
    background: #f1f8e9;
    border-radius: 0 8px 8px 0;
    color: #2d4a2d;
    font-style: italic;
    font-size: 1rem;
    line-height: 1.7;
    margin: 1.2rem 0;
  }

  /* ---- List ---- */
  .profil-list {
    padding-left: 0;
    list-style: none;
    margin: 1rem 0 0;
  }
  .profil-list li {
    padding: .55rem 0 .55rem 1.8rem;
    position: relative;
    color: #444;
    font-size: .93rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .profil-list li:last-child { border-bottom: none; }
  .profil-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #4caf50;
    font-weight: 700;
  }

  /* ---- Stats ---- */
  .profil-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.8rem;
  }
  .profil-stat-card {
    background: linear-gradient(135deg, #2e7d32, #43a047);
    border-radius: 14px;
    padding: 1.5rem 1rem;
    text-align: center;
    color: #fff;
    box-shadow: 0 4px 16px rgba(46,125,50,.3);
    transition: transform .2s;
  }
  .profil-stat-card:hover { transform: translateY(-4px); }
  .profil-stat-value {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: .3rem;
  }
  .profil-stat-label {
    font-size: .78rem;
    opacity: .85;
    font-weight: 500;
  }

  /* ---- Timeline ---- */
  .profil-timeline {
    position: relative;
    padding: 1rem 0;
    margin-top: 1.5rem;
  }
  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #c8e6c9, #2e7d32, #c8e6c9);
    transform: translateX(-50%);
    z-index: 0;
  }
  .timeline-item {
    position: relative;
    width: 50%;
    padding: 0 2.5rem 2rem;
    z-index: 1;
  }
  .timeline-item.left  { left: 0;   text-align: right; }
  .timeline-item.right { left: 50%; text-align: left;  }
  .timeline-dot {
    position: absolute;
    top: .4rem;
    width: 14px;
    height: 14px;
    background: #2e7d32;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #c8e6c9;
  }
  .timeline-item.left  .timeline-dot { right: -7px; }
  .timeline-item.right .timeline-dot { left: -7px;  }
  .timeline-card {
    background: #fff;
    border-radius: 12px;
    padding: 1rem 1.3rem;
    box-shadow: 0 2px 12px rgba(0,0,0,.09);
    border: 1px solid #e8f5e9;
    transition: box-shadow .2s;
  }
  .timeline-card:hover { box-shadow: 0 6px 20px rgba(46,125,50,.15); }
  .timeline-year {
    display: inline-block;
    background: #e8f5e9;
    color: #2e7d32;
    font-weight: 700;
    font-size: .78rem;
    padding: .2rem .7rem;
    border-radius: 50px;
    margin-bottom: .4rem;
  }
  .timeline-title {
    font-size: .97rem;
    font-weight: 700;
    color: #1b2d1b;
    margin: 0 0 .3rem;
  }
  .timeline-desc {
    font-size: .82rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  /* ---- Legalitas ---- */
  .profil-legalitas-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.2rem;
  }
  .legalitas-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: #f9fbe7;
    border: 1px solid #dcedc8;
    border-radius: 12px;
    padding: 1.1rem 1.3rem;
  }
  .legalitas-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: .1rem; }
  .legalitas-label {
    font-size: .75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #558b2f;
    margin-bottom: .15rem;
  }
  .legalitas-value { font-size: .9rem; color: #333; font-weight: 500; }

  /* ---- Visi Box ---- */
  .visi-box {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: linear-gradient(120deg, #e8f5e9, #f1f8e9);
    border-radius: 16px;
    padding: 2rem 2.2rem;
    border: 2px solid #c8e6c9;
    margin-top: 1.2rem;
  }
  .visi-icon { font-size: 3rem; flex-shrink: 0; }
  .visi-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1b5e20;
    font-style: italic;
    line-height: 1.5;
    margin: 0;
    border: none;
    padding: 0;
    background: none;
  }

  /* ---- Misi Grid ---- */
  .misi-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
  .misi-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e0f2f1;
    padding: 1.4rem 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
    transition: transform .2s, box-shadow .2s;
    position: relative;
    overflow: hidden;
  }
  .misi-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(46,125,50,.15);
  }
  .misi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #2e7d32, #66bb6a);
  }
  .misi-number {
    position: absolute;
    top: 1rem; right: 1.2rem;
    font-size: 2.5rem;
    font-weight: 900;
    color: #e8f5e9;
    line-height: 1;
  }
  .misi-icon { font-size: 1.8rem; margin-bottom: .6rem; }
  .misi-title {
    font-size: .97rem;
    font-weight: 700;
    color: #1b5e20;
    margin: 0 0 .5rem;
  }
  .misi-desc { font-size: .83rem; color: #555; margin: 0; line-height: 1.55; }

  /* ---- Mutu Section ---- */
  .mutu-section {
    background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%) !important;
    color: #fff;
  }
  .mutu-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .8rem;
    margin-top: 1.5rem;
  }
  .mutu-card {
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 12px;
    padding: 1.3rem 1rem;
    text-align: center;
    backdrop-filter: blur(6px);
    transition: background .2s;
  }
  .mutu-card:hover { background: rgba(255,255,255,.18); }
  .mutu-kode {
    width: 48px; height: 48px;
    line-height: 48px;
    background: rgba(255,255,255,.2);
    border-radius: 50%;
    font-size: 1.4rem;
    font-weight: 900;
    color: #fff;
    margin: 0 auto .5rem;
  }
  .mutu-kata {
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .08em;
    color: #c8e6c9;
    margin-bottom: .5rem;
  }
  .mutu-desc { font-size: .73rem; color: rgba(255,255,255,.75); line-height: 1.4; }

  /* ---- Ketua PW Card ---- */
  .ketua-pw-card {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: linear-gradient(120deg, #e8f5e9, #f9fbe7);
    border-radius: 16px;
    padding: 2rem 2.2rem;
    border: 2px solid #c8e6c9;
    margin-top: 1.2rem;
  }
  .ketua-pw-avatar { position: relative; flex-shrink: 0; }
  .ketua-pw-badge {
    position: absolute;
    bottom: -6px; left: 50%;
    transform: translateX(-50%);
    background: #2e7d32;
    color: #fff;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    padding: .2rem .7rem;
    border-radius: 50px;
    white-space: nowrap;
  }
  .ketua-pw-nama {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1b5e20;
    margin-bottom: .2rem;
  }
  .ketua-pw-jabatan {
    font-size: .85rem;
    color: #4caf50;
    font-weight: 600;
    margin-bottom: .8rem;
  }
  .ketua-pw-desc { font-size: .88rem; color: #555; line-height: 1.6; margin: 0; }

  /* ---- Pengurus Grid ---- */
  .pengurus-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 1.5rem;
  }
  .pengurus-card {
    background: #fff;
    border-radius: 16px;
    padding: 1.8rem 1.3rem;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0,0,0,.07);
    border: 1px solid #e8f5e9;
    transition: transform .2s, box-shadow .2s;
  }
  .pengurus-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 28px rgba(46,125,50,.14);
  }
  .pengurus-avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .pengurus-nama {
    font-size: 1rem;
    font-weight: 700;
    color: #1b5e20;
    margin-bottom: .3rem;
  }
  .pengurus-jabatan {
    font-size: .78rem;
    color: #666;
    font-weight: 600;
    background: #e8f5e9;
    display: inline-block;
    padding: .2rem .8rem;
    border-radius: 50px;
    margin-bottom: .8rem;
  }
  .pengurus-desc {
    font-size: .8rem;
    color: #777;
    line-height: 1.55;
    margin: 0;
  }

  /* ---- Responsive ---- */
  @media (max-width: 900px) {
    .profil-wrapper { flex-direction: column; padding: 5rem 1rem 2rem; }
    .profil-sidebar { width: 100%; position: static; }
    .sidebar-nav { display: flex; }
    .sidebar-link { flex: 1; text-align: center; border-left: none; border-bottom: 3px solid transparent; }
    .sidebar-link.active { border-bottom-color: #2e7d32; border-left: none; }
    .profil-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .timeline-line { display: none; }
    .timeline-item { width: 100%; left: 0 !important; text-align: left; padding: 0 0 1.5rem 2rem; }
    .timeline-item.left .timeline-dot,
    .timeline-item.right .timeline-dot { left: -7px; right: auto; }
    .profil-legalitas-grid { grid-template-columns: 1fr; }
    .misi-grid { grid-template-columns: 1fr; }
    .mutu-grid { grid-template-columns: repeat(2, 1fr); }
    .pengurus-grid { grid-template-columns: 1fr 1fr; }
    .ketua-pw-card { flex-direction: column; text-align: center; }
    .profil-hero-body { padding: 2rem 1.5rem; }
    .profil-hero-title { font-size: 1.5rem; }
  }
  @media (max-width: 576px) {
    .profil-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .mutu-grid { grid-template-columns: 1fr 1fr; }
    .pengurus-grid { grid-template-columns: 1fr; }
    .visi-box { flex-direction: column; text-align: center; }
  }
`;

export default profilStyles;
