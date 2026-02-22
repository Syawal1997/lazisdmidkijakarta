document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Zakat Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    const assetsInput = document.getElementById('assets');
    const zakatResult = document.getElementById('zakat-result');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const assetsValue = parseFloat(assetsInput.value);
            
            if (isNaN(assetsValue) || assetsValue < 0) {
                alert('Silakan masukkan jumlah harta yang valid.');
                return;
            }

            // Calculation: 2.5% of assets
            const zakatAmount = assetsValue * 0.025;

            // Format to IDR Currency
            const formattedZakat = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(zakatAmount);

            zakatResult.textContent = formattedZakat;
        });
    }
});
