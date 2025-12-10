// ========== HERO CAROUSEL ==========
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.backgroundPhoto');
    if (!slides.length) return; // Exit if no slides found

    let index = 0;

    setInterval(() => {
        slides[index].classList.remove('active');          
        index = (index + 1) % slides.length;                
        slides[index].classList.add('active');              
    }, 5000); // 5 seconds per slide
});

// ========== ROOM SLIDER ==========

// Room data: images, titles, and descriptions
const rooms = [
  {
    img: "img/Bedroom5.jpg",
    title: "Standard Room",
    text:  "Our Standard Room offers a warm and inviting atmosphere designed for restful nights and peaceful mornings. Soft lighting, comfortable bedding, and thoughtfully selected decor elements create a relaxing environment for both leisure and business travelers. Whether you're staying for a short city break or a quick overnight visit, this room provides everything you need — from modern amenities to a calm, cozy retreat after a long day of exploring."
  },
  {
    img: "img/Bedroom.jpg",
    title: "Deluxe Room",
    text:  "The Deluxe Room features extra space and refined comfort, making it a perfect choice for guests who appreciate a more elevated experience. Large windows fill the room with natural light, highlighting the soothing color palette and contemporary furnishings. A high-quality mattress, elegant textiles, and a well-appointed workspace ensure both relaxation and productivity. Ideal for longer stays, couples, or anyone seeking a harmonious blend of style and comfort."
  },
  {
    img: "img/LabyrintheRoom.jpg",
    title: "Superior Room",
    text:  "Our Superior Room combines modern design with cozy details to create a truly welcoming environment. The room features carefully coordinated colors, premium fabrics, and a spacious sleeping area, making it suitable for guests who prefer a bit more comfort. Thoughtfully placed lighting and decorative touches add personality without overwhelming the space. Whether you're unwinding after a busy day or starting your morning with peace and quiet, this room offers the perfect balance of style and relaxation."
  }
];

// Get slider elements
const imgPrev  = document.querySelector(".roomSR.previous");  
const imgMain  = document.querySelector(".roomSR.active");    
const imgNext  = document.querySelector(".roomSR.next");      
const dots = document.querySelectorAll(".dote");              
const titleEl = document.getElementById("roomTitle");         
const textEl  = document.getElementById("roomText");          

let currentIndex = 1; 

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

renderSlider();
