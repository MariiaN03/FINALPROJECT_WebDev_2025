fetch('NavigationMenu.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('NavigationBar');
    container.innerHTML = html;

    // здесь элементы уже есть в DOM → можно инициализировать меню
    if (window.initMenu) {
      window.initMenu();
    }
  })
  .catch(err => {
    console.error('Ошибка загрузки NavigationMenu.html:', err);
  });
