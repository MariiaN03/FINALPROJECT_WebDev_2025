//Slider Function
document.addEventListener('DOMContentLoaded', () => {
    const sectionButtons = document.querySelectorAll('.SectionHolder div:not(.LinkWebsite)');
    const allSections = document.querySelectorAll('.HolderD, .BugReportSection');

    sectionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetElement = btn.querySelector('[data-target]');
            if (!targetElement) return;

            const targetId = targetElement.dataset.target; 
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            document.querySelectorAll('.SectionHolder div').forEach(div => {
                div.classList.remove('activeButton');
            });
            btn.classList.add('activeButton');

            allSections.forEach(sec => sec.classList.remove('activePart'));
            targetSection.classList.add('activePart');
        });
    });
});

//Open Image in Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__image');
const closeBtn = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;   
            lightbox.classList.add('open');
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
        }
    });
