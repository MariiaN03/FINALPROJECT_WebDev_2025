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
