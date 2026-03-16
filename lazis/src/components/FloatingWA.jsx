const FloatingWA = () => {
  return (
    <a 
      href="https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20ingin%20bertanya%20seputar%20Lazis%20DMI%20DKI" 
      target="_blank" 
      rel="noopener noreferrer"
      className="btn-whatsapp-floating d-flex align-items-center justify-content-center shadow-lg transition-all"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        fontSize: '30px',
        zIndex: '1000',
        textDecoration: 'none'
      }}
      title="Chat WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <style>{`
        .btn-whatsapp-floating:hover {
          transform: scale(1.1);
          color: white;
          background-color: #128C7E;
        }
      `}</style>
    </a>
  );
};

export default FloatingWA;