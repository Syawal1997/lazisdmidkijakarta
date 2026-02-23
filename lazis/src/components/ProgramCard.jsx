import { Link } from 'react-router-dom';

const ProgramCard = ({ id, title, category, cat, target, collected = 0, image }) => {
  const displayCategory = category || cat || 'Umum';
  const percentage = Math.min(100, Math.round((collected / target) * 100));
  
  return (
    <div className="card h-100 border-0 shadow-sm hover-lift">
      <div className="position-relative">
        <img 
          src={image || `https://placehold.co/600x400/15803d/ffffff?text=${encodeURIComponent(displayCategory)}`} 
          className="card-img-top" 
          alt={title} 
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <span className="badge bg-white text-success position-absolute top-0 end-0 m-3 shadow-sm px-3 py-2 rounded-pill fw-bold">
          {displayCategory.toUpperCase()}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title fw-bold mb-3">{title}</h5>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between small fw-bold mb-1">
            <span className="text-success">Rp {collected.toLocaleString('id-ID')}</span>
            <span className="text-secondary">Rp {target.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="progress mb-3" style={{ height: '8px', borderRadius: '10px', backgroundColor: '#e2e8f0' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: `${percentage}%`, borderRadius: '10px' }} 
              aria-valuenow={percentage} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
             <small className="text-muted">{percentage}% Terkumpul</small>
             <small className="text-muted">∞ Hari Lagi</small>
          </div>

          <Link to={`/program/${id}`} className="btn btn-outline-success w-100 fw-bold rounded-pill">
            Donasi Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;