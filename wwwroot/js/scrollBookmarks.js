(function () {
    const bookmarks = document.querySelectorAll('#scroll-bookmarks .bookmark');
    const sections = Array.from(bookmarks).map(b => document.getElementById(b.getAttribute('data-target')));
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    bookmarks.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const id = btn.getAttribute('data-target');
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
                bookmarks.forEach(b => b.classList.toggle('active', b.getAttribute('data-target') === id));
                history.replaceState(null, '', `#${id}`);
            }
        });
    });

    const onScroll = () => {
        let topSectionId = sections[0].id;
        let minDistance = Infinity;
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            const distance = Math.abs(rect.top - headerHeight);
            if (distance < minDistance) {
                minDistance = distance;
                topSectionId = sec.id;
            }
        });
        bookmarks.forEach(b => b.classList.toggle('active', b.getAttribute('data-target') === topSectionId));
        history.replaceState(null, '', `#${topSectionId}`);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
})();

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    const scrollMiddle = window.scrollY + window.innerHeight / 2;
    let currentSection = sections[0];

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;

        if (scrollMiddle >= sectionTop && scrollMiddle < sectionBottom) {
            currentSection = section;
        }
    });

    const color = currentSection.dataset.color;
    document.body.style.backgroundColor = color;
});