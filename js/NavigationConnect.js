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
    // --- твой существующий код здесь (табы и т.п.) ---
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
