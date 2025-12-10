fetch('NavigationMenu.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('NavigationBar').innerHTML = html;
  })
  .catch(err => {
    console.error('Ошибка загрузки header.html:', err);
  });