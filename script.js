/* ============================================
   DUBAI PAINT SERVICES - LANDING PAGE V2
   ============================================ */

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => document.querySelector('.preloader').classList.add('hidden'), 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('visible');
});
document.querySelectorAll('a, button, .service-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

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
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
        };
        updateCounter();
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
const exitPopup = document.getElementById('exitPopup');
let popupShown = false;

setTimeout(() => {
    if (whatsappPopup && !popupShown) {
        whatsappPopup.classList.add('active');
        popupShown = true;
    }
}, 3000);

const closePopup = () => {
    if (whatsappPopup) whatsappPopup.classList.remove('active');
};
if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
if (popupClose) popupClose.addEventListener('click', closePopup);

// Exit Intent Popup (only if WhatsApp popup not shown)
const exitOverlay = document.getElementById('exitOverlay');
const exitClose = document.getElementById('exitClose');
let exitShown = false;

document.addEventListener('mouseout', (e) => {
    if (e.clientY < 0 && !exitShown && !popupShown) {
        exitPopup.classList.add('active');
        exitShown = true;
    }
});
if (exitOverlay) exitOverlay.addEventListener('click', () => exitPopup.classList.remove('active'));
if (exitClose) exitClose.addEventListener('click', () => exitPopup.classList.remove('active'));

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

// Form Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = quoteForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Quote Requested!';
        submitBtn.style.background = '#25D366';
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Get My Free Quote Now';
            submitBtn.style.background = '';
            quoteForm.reset();
        }, 3000);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (whatsappPopup) whatsappPopup.classList.remove('active');
        if (exitPopup) exitPopup.classList.remove('active');
    }
});

// Dynamic Copyright Year
const copyrightYear = document.querySelector('.footer-bottom p');
if (copyrightYear) {
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', new Date().getFullYear());
}

console.log('%c🎨 Dubai Paint Services', 'font-size: 24px; font-weight: bold; color: #1E3A5F;');
console.log('%cDubai\'s Most Trusted Painting Service', 'font-size: 14px; color: #666;');
