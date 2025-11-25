// ===================================
// KINGSUKH GUEST HOUSE - MAIN JS
// Modern Interactions & Animations
// ===================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // Initialize all features
    initNavigation();
    initCustomCursor();
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
    initGalleryLightbox();
});

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ===================================
// CUSTOM CURSOR
// ===================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .room-card, .gallery-item, .amenity-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    // Parallax effect for hero
    const hero = document.querySelector('.hero__bg');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Counter animation for stats
    const counters = document.querySelectorAll('.floating-card h4, .banner__card h4');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===================================
// FORM VALIDATION
// ===================================

function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Success
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        
        // In production, you would send this data to a server
        console.log('Form submitted:', { firstName, lastName, email, phone, message });
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// GALLERY LIGHTBOX
// ===================================

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__overlay"></div>
        <div class="lightbox__content">
            <button class="lightbox__close">
                <i class="ri-close-line"></i>
            </button>
            <button class="lightbox__prev">
                <i class="ri-arrow-left-line"></i>
            </button>
            <button class="lightbox__next">
                <i class="ri-arrow-right-line"></i>
            </button>
            <img src="" alt="Gallery Image">
        </div>
    `;

    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .lightbox__content {
            position: relative;
            z-index: 1;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox__content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }
        
        .lightbox__close,
        .lightbox__prev,
        .lightbox__next {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
        }
        
        .lightbox__close:hover,
        .lightbox__prev:hover,
        .lightbox__next:hover {
            background: rgba(196, 161, 93, 0.9);
            transform: scale(1.1);
        }
        
        .lightbox__close {
            top: 20px;
            right: 20px;
        }
        
        .lightbox__prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox__next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox__close i,
        .lightbox__prev i,
        .lightbox__next i {
            font-size: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .lightbox__prev,
            .lightbox__next {
                width: 40px;
                height: 40px;
            }
            
            .lightbox__close i,
            .lightbox__prev i,
            .lightbox__next i {
                font-size: 1.25rem;
            }
        }
    `;
    document.head.appendChild(lightboxStyles);
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showLightbox();
        });
    });

    function showLightbox() {
        lightbox.classList.add('active');
        lightbox.querySelector('img').src = images[currentIndex];
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close lightbox
    lightbox.querySelector('.lightbox__close').addEventListener('click', hideLightbox);
    lightbox.querySelector('.lightbox__overlay').addEventListener('click', hideLightbox);

    // Navigation
    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightbox.querySelector('img').src = images[currentIndex];
    });

    lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightbox.querySelector('img').src = images[currentIndex];
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightbox.querySelector('img').src = images[currentIndex];
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            lightbox.querySelector('img').src = images[currentIndex];
        }
    });
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('🏨 Kingsukh Guest House - Website Loaded Successfully!');
