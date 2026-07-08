/* ============================================
   PREMIUM PAINT SERVICES - LANDING PAGE V2
   Interactive JavaScript
   ============================================ */

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .service-item');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('visible');
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
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
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

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
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-item, .process-step, .testimonial-card, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Testimonial Carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.nav-dots .dot');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
};

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const index = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
        showTestimonial(index);
    });
    
    nextBtn.addEventListener('click', () => {
        const index = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
setInterval(() => {
    const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
    showTestimonial(nextIndex);
}, 5000);

// Comparison Slider
const sliderHandle = document.querySelector('.slider-handle');
const comparisonContainer = document.querySelector('.comparison-container');

if (sliderHandle && comparisonContainer) {
    let isDragging = false;
    
    const updateSlider = (e) => {
        if (!isDragging) return;
        
        const rect = comparisonContainer.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        sliderHandle.style.left = `${percentage}%`;
        document.querySelector('.before-image').style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };
    
    sliderHandle.addEventListener('mousedown', () => isDragging = true);
    sliderHandle.addEventListener('touchstart', () => isDragging = true);
    
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);
    
    document.addEventListener('mousemove', updateSlider);
    document.addEventListener('touchmove', updateSlider);
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Service Items Hover Effect
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'var(--white)';
    });
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content-v2');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroVisual && scrolled < 600) {
        heroVisual.style.transform = `translateY(${-50 + scrolled * 0.2}%)`;
    }
});

// WhatsApp Float Animation
const whatsappFloat = document.querySelector('.whatsapp-float-v2');

if (whatsappFloat) {
    setInterval(() => {
        whatsappFloat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            whatsappFloat.style.transform = 'scale(1)';
        }, 300);
    }, 4000);
}

// Phone Call Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated');
        // Add Google Ads conversion tracking here
        // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXXX/XXXXXXXXXX'});
    });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp click initiated');
        // Add Google Ads conversion tracking here
        // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXXX/XXXXXXXXXX'});
    });
});

// Form Submission (if form exists)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
        
        // Add conversion tracking
        console.log('Form submitted:', data);
    });
}

// Dynamic Copyright Year
const copyrightYear = document.querySelector('.footer-bottom p');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', currentYear);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Lazy Loading Images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Touch Events for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next testimonial
            const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
            showTestimonial(nextIndex);
        } else {
            // Swipe right - previous testimonial
            const prevIndex = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
            showTestimonial(prevIndex);
        }
    }
};

// Performance Optimization - Throttle Scroll Events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Console Easter Egg
console.log('%c🎨 Premium Paint Services', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cTransform your space with our expert painting services!', 'font-size: 14px; color: #666;');
console.log('%cInterested in working with us? Call: +91 XXXXX XXXXX', 'font-size: 12px; color: #FF6B35;');

// ============================================
// WHATSAPP POPUP MODAL
// ============================================

const whatsappPopup = document.getElementById('whatsappPopup');
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');

// Show popup after 3 seconds
setTimeout(() => {
    if (whatsappPopup) {
        whatsappPopup.classList.add('active');
    }
}, 3000);

// Close popup functions
const closePopup = () => {
    if (whatsappPopup) {
        whatsappPopup.classList.remove('active');
    }
};

if (popupOverlay) {
    popupOverlay.addEventListener('click', closePopup);
}

if (popupClose) {
    popupClose.addEventListener('click', closePopup);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsappPopup.classList.contains('active')) {
        closePopup();
    }
});
