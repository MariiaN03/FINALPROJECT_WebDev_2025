// MENU.JS

function initMenu() {
    const openMenu = document.getElementById('openMenuID');        // гамбургер
    const closeMenu = document.getElementById('closeBtnID');       // крестик
    const closeOutside = document.getElementById('menuOverlayID'); // тёмный фон
    const block = document.getElementById('menuOptionsID');        // выезжающее меню

    // Если каких-то элементов нет — просто выходим, чтобы не было ошибок
    if (!openMenu || !closeMenu || !closeOutside || !block) {
        console.warn('Menu elements not found on this page');
        return;
    }

    const open = () => {
        block.classList.add('Show');          // открыть меню
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        block.classList.remove('Show');       // закрыть меню
        document.body.style.overflow = 'auto';
    };

    openMenu.addEventListener('click', open);
    closeOutside.addEventListener('click', close);
    closeMenu.addEventListener('click', close);
}

// делаем функцию доступной глобально
window.initMenu = initMenu;
