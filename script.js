/* ============================================
   DUBAI PAINT SERVICES - LANDING PAGE V2
   ============================================ */

// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}
if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
}
// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;
const animateCounters = () => {
    counters.forEach(counter => {
        counter.classList.add('counted');
    });
};

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.closest('.hero-stats') && !counterStarted) {
                animateCounters();
                counterStarted = true;
            }
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.service-item, .process-step, .hero-stats').forEach(el => observer.observe(el));

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// WhatsApp Popup
const whatsappPopup = document.getElementById('whatsappPopup');
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');

let popupShown = false;

if (whatsappPopup) {
    setTimeout(() => {
        if (!popupShown) {
            whatsappPopup.classList.add('active');
            popupShown = true;
        }
    }, 3000);
}

const closePopup = () => {
    if (whatsappPopup) whatsappPopup.classList.remove('active');
};
if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
if (popupClose) popupClose.addEventListener('click', closePopup);

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// WhatsApp Float Animation
const whatsappFloat = document.querySelector('.whatsapp-float-v2');
if (whatsappFloat) {
    setInterval(() => {
        whatsappFloat.style.transform = 'scale(1.1)';
        setTimeout(() => whatsappFloat.style.transform = 'scale(1)', 300);
    }, 4000);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (whatsappPopup) whatsappPopup.classList.remove('active');
    }
});

// Dynamic Copyright Year
const copyrightYear = document.querySelector('.footer-bottom p');
if (copyrightYear) {
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', new Date().getFullYear());
}
