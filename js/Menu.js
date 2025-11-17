// ============================================
// IMAGINARY INNS - MENU FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const openMenuBtn = document.getElementById('openMenuID');
    const closeMenuBtn = document.getElementById('closeBtnID');
    const menuOptions = document.getElementById('menuOptionsID');
    const menuOverlay = document.getElementById('menuOverlayID');
    const menuLinks = document.querySelectorAll('.menuLink');

    // Open menu
    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menuOptions.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu
    function closeMenu() {
        menuOptions.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});
