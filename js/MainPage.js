document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.backgroundPhoto');
    if (!slides.length) return;

    let index = 0;

    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 5000); // 5 секунд
});
