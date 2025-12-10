// js/NavigationConnect.js

fetch('NavigationMenu.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('NavigationBar');
    container.innerHTML = html;

    // ====== ЛОГИКА МЕНЮ ПРЯМО ЗДЕСЬ ======
    const openMenu = document.getElementById('openMenuID');        // гамбургер
    const closeMenu = document.getElementById('closeBtnID');       // крестик
    const closeOutside = document.getElementById('menuOverlayID'); // тёмный фон
    const block = document.getElementById('menuOptionsID');        // выезжающее меню

    if (!openMenu || !closeMenu || !closeOutside || !block) {
      console.error('Menu elements not found on this page');
      return;
    }

    const open = () => {
      block.classList.add('Show');          // открыть меню (класс Show уже есть в CSS)
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      block.classList.remove('Show');       // закрыть меню
      document.body.style.overflow = 'auto';
    };

    openMenu.addEventListener('click', open);
    closeMenu.addEventListener('click', close);
    closeOutside.addEventListener('click', close);
  })
  .catch(err => {
    console.error('Ошибка загрузки NavigationMenu.html:', err);
  });
