// js/NavigationConnect.js

fetch('NavigationMenu.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('NavigationBar');
    container.innerHTML = html;

    // ====== MenuLogic ======
    const openMenu = document.getElementById('openMenuID');        
    const closeMenu = document.getElementById('closeBtnID');       
    const closeOutside = document.getElementById('menuOverlayID'); 
    const block = document.getElementById('menuOptionsID');        

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

  //OverlaySmallScreen
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.footer')) {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>hotel name</h3>
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
                            ✉️ <span>info@hotelname.com</span>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 hotel name. All rights reserved.</p>
                </div>
            </div>
        `;}
    document.body.appendChild(footer);

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
