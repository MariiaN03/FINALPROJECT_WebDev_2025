document.addEventListener('DOMContentLoaded', () => {
    // ====== NAVIGATION LOAD ======
    const navContainer = document.getElementById('NavigationBar');

    if (navContainer) {
        fetch('NavigationMenu.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('NavigationMenu.html not found');
                }
                return response.text();
            })
            .then(html => {
                navContainer.innerHTML = html;

                // ====== MenuLogic ======
                const openMenu   = document.getElementById('openMenuID');        
                const closeMenu  = document.getElementById('closeBtnID');       
                const closeOutside = document.getElementById('menuOverlayID'); 
                const block      = document.getElementById('menuOptionsID');        

                if (!openMenu || !closeMenu || !closeOutside || !block) {
                    console.error('Menu elements not found on this page');
                    return;
                }

                const open = () => {
                    block.classList.add('Show');          
                    document.body.style.overflow = 'hidden';
                };

                const close = () => {
                    block.classList.remove('Show');      
                    document.body.style.overflow = 'auto';
                };

                openMenu.addEventListener('click', open);
                closeMenu.addEventListener('click', close);
                closeOutside.addEventListener('click', close);
            })
            .catch(err => {
                console.error('Ошибка загрузки NavigationMenu.html:', err);
            });
    } else {
        console.warn('NavigationBar контейнер не найден на этой странице');
    }

    if (!document.querySelector('.footer')) {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>ImaginaryInns</h3>
                        <p>Your home away from home</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="Rooms.html">Rooms</a></li>
                            <li><a href="Services.html">Services</a></li>
                            <li><a href="BookingPage.html">Booking</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <div class="contact-item">
                            📞 <span>+1-800-INN-BOOK</span>
                        </div>
                        <div class="contact-item">
                            ✉️ <span>info@ImaginaryInns.com</span>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 ImaginaryInns. All rights reserved.</p>
                </div>
            </div>
        `;
        document.body.appendChild(footer);
    }

    // ====== OVERLAY FOR SMALL SCREEN ======
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-warning';
    overlay.innerHTML = `
        <div class="fullscreen-warning__inner">
            <p>Please enlarge your browser window to view this page properly.</p>
            <p>For the best experience, please open the site in a full-size window.</p>
        </div>
    `;
    document.body.appendChild(overlay);
});
