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
