// ============================================
// MENU.JS - Hamburger menu functionality
// ============================================
// Features:
// - Opens slide-out menu panel from right side
// - Prevents body scroll when menu is open
// - Three ways to close: X button, overlay click, or menu item click
// - Used across all pages (MainPage, BookingPage, Rooms, Services, Gallery, Contact)
// ============================================

// ========== GET DOM ELEMENTS ==========
const openMenu = document.getElementById('openMenuID');          // Hamburger icon (3 lines)
const closeMenu = document.getElementById('closeBtnID');         // X button inside menu
const closeOutside = document.getElementById('menuOverlayID');   // Dark overlay behind menu
const block = document.getElementById('menuOptionsID');          // Slide-out menu panel

// ========== OPEN MENU ==========
// Click hamburger icon to show menu and prevent scrolling
openMenu.addEventListener('click', () => {
    block.classList.toggle('Show');           // Slide menu in from right
    document.body.style.overflow = 'hidden';  // Disable body scroll
});

// ========== CLOSE MENU (Overlay Click) ==========
// Click dark overlay to close menu and restore scrolling
closeOutside.addEventListener('click', () => {
    block.classList.remove('Show');           // Slide menu out
    document.body.style.overflow = 'auto';    // Re-enable body scroll
});

// ========== CLOSE MENU (X Button) ==========
// Click X button to close menu and restore scrolling
closeMenu.addEventListener('click', () => {
    block.classList.remove('Show');           // Slide menu out
    document.body.style.overflow = 'auto';    // Re-enable body scroll
});