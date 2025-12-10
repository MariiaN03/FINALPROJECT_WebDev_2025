// js/NavigationConnect.js

fetch('NavigationMenu.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('NavigationBar');
    container.innerHTML = html;

    // после вставки меню инициализируем логику
    if (window.initMenu) {
      window.initMenu();
    }
  })
  .catch(err => {
    console.error('Ошибка загрузки NavigationMenu.html:', err);
  });
