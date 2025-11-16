const openMenu = document.getElementById('openMenuID');
const closeMenu = document.getElementById('closeBtnID');
const closeOutside = document.getElementById('menuOverlayID');
const block = document.getElementById('menuOptionsID');

openMenu.addEventListener('click', () => {
    block.classList.toggle('Show');
    document.body.style.overflow = 'hidden';
});
closeOutside.addEventListener('click', () => {
    block.classList.remove('Show');
    document.body.style.overflow = 'auto';
});

closeMenu.addEventListener('click', () => {
    block.classList.remove('Show');
    document.body.style.overflow = 'auto';
});