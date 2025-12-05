// ============================================
// MAINPAGE.JS - Hero carousel and room slider
// ============================================
// Features:
// 1. Hero carousel - auto-rotates background images every 5 seconds
// 2. Room slider - shows 3 rooms with prev/current/next preview
//    - Click dots to navigate between rooms
//    - Updates image, title, and description
// ============================================

// ========== HERO CAROUSEL ==========
// Auto-rotate background images every 5 seconds
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.backgroundPhoto');
    if (!slides.length) return; // Exit if no slides found

    let index = 0;

    setInterval(() => {
        slides[index].classList.remove('active');           // Hide current slide
        index = (index + 1) % slides.length;                // Move to next (wraps to 0 at end)
        slides[index].classList.add('active');              // Show next slide
    }, 5000); // 5 seconds per slide
});

// ========== ROOM SLIDER ==========

// Room data: images, titles, and descriptions
const rooms = [
  {
    img: "../img/Bedroom5.jpg",
    title: "Standard Room",
    text:  "Our Standard Room offers a warm and inviting atmosphere designed for restful nights and peaceful mornings. Soft lighting, comfortable bedding, and thoughtfully selected decor elements create a relaxing environment for both leisure and business travelers. Whether you're staying for a short city break or a quick overnight visit, this room provides everything you need — from modern amenities to a calm, cozy retreat after a long day of exploring."
  },
  {
    img: "../img/Bedroom.jpg",
    title: "Deluxe Room",
    text:  "The Deluxe Room features extra space and refined comfort, making it a perfect choice for guests who appreciate a more elevated experience. Large windows fill the room with natural light, highlighting the soothing color palette and contemporary furnishings. A high-quality mattress, elegant textiles, and a well-appointed workspace ensure both relaxation and productivity. Ideal for longer stays, couples, or anyone seeking a harmonious blend of style and comfort."
  },
  {
    img: "../img/LabyrintheRoom.jpg",
    title: "Superior Room",
    text:  "Our Superior Room combines modern design with cozy details to create a truly welcoming environment. The room features carefully coordinated colors, premium fabrics, and a spacious sleeping area, making it suitable for guests who prefer a bit more comfort. Thoughtfully placed lighting and decorative touches add personality without overwhelming the space. Whether you're unwinding after a busy day or starting your morning with peace and quiet, this room offers the perfect balance of style and relaxation."
  }
];

// Get slider elements
const imgPrev  = document.querySelector(".roomSR.previous");  // Left preview image
const imgMain  = document.querySelector(".roomSR.active");    // Center main image
const imgNext  = document.querySelector(".roomSR.next");      // Right preview image
const dots = document.querySelectorAll(".dote");              // Navigation dots
const titleEl = document.getElementById("roomTitle");         // Room title text
const textEl  = document.getElementById("roomText");          // Room description text

let currentIndex = 1; // Start at middle room (Deluxe)

// ========== RENDER SLIDER ==========
// Updates all slider elements based on currentIndex
function renderSlider() {
  const total = rooms.length;
  // Calculate prev/next indices (wraps around)
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  // Update three preview images
  imgPrev.src = rooms[prevIndex].img;
  imgMain.src = rooms[currentIndex].img;
  imgNext.src = rooms[nextIndex].img;

  // Update title and description
  titleEl.textContent = rooms[currentIndex].title;
  textEl.textContent = rooms[currentIndex].text;

  // Update active dot indicator
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// ========== DOT NAVIGATION ==========
// Click any dot to jump to that room
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;   
    renderSlider();
  });
});

// Initialize slider on page load
renderSlider();
