// Portfolio JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initProjectFiltering();
    initTestimonials();
    initContactForm();
    initAnimations();
    initSkillBars();
});

// Theme Toggle
function initThemeToggle() {
    const darkToggle = document.querySelector('.dark-toggle');
    const root = document.documentElement;
    
    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            darkToggle.textContent = 'Light Mode';
            darkToggle.setAttribute('aria-pressed', 'true');
        } else {
            document.body.setAttribute('data-theme', 'light');
            darkToggle.textContent = 'Dark Mode';
            darkToggle.setAttribute('aria-pressed', 'false');
        }
        localStorage.setItem('theme', theme);
    }
    
    let currentTheme = getInitialTheme();
    applyTheme(currentTheme);
    
    darkToggle.addEventListener('click', () => {
        currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
}

// Navigation
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('nav.navbar a');
    
    function initNav() {
        if (window.innerWidth <= 768) {
            navbar.classList.add('mobile-hidden');
            navToggle.style.display = 'block';
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '&#9776;';
        } else {
            navbar.classList.remove('mobile-hidden', 'mobile-visible');
            navToggle.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '&#9776;';
            navbar.classList.remove('mobile-visible');
            navbar.classList.add('mobile-hidden');
        } else {
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.innerHTML = '&#10005;';
            navbar.classList.remove('mobile-hidden');
            navbar.classList.add('mobile-visible');
        }
    });
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.innerWidth <= 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '&#9776;';
                navbar.classList.remove('mobile-visible');
                navbar.classList.add('mobile-hidden');
            }
        });
    });
    
    // Highlight active nav links based on scroll position
    const sections = document.querySelectorAll('main section, footer#contact');
    function activateMenuAtCurrentSection() {
        const checkpoint = window.pageYOffset + window.innerHeight / 3;
        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (checkpoint >= top && checkpoint < top + height) {
                currentId = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activateMenuAtCurrentSection);
    window.addEventListener('resize', initNav);
    window.addEventListener('load', initNav);
}

// Scroll Effects
function initScrollEffects() {
    const backToTop = document.getElementById('back-to-top');
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 600) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// Project Filtering
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            
            const filter = btn.dataset.filter;
            
            // Filter projects with animation
            projects.forEach((proj, index) => {
                const tech = proj.dataset.tech;
                if (filter === 'all' || tech.includes(filter)) {
                    setTimeout(() => {
                        proj.style.display = 'block';
                        proj.style.animation = 'fadeIn 0.5s ease-in-out';
                    }, index * 100);
                } else {
                    proj.style.display = 'none';
                }
            });
        });
    });
}

// Testimonials Carousel
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    let currentTestimonial = 0;
    let autoPlayInterval;
    
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
            carouselBtns[i].classList.toggle('active', i === index);
            carouselBtns[i].setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    carouselBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            showTestimonial(idx);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Pause auto-play on hover
    const testimonialContainer = document.querySelector('.testimonial-list');
    testimonialContainer.addEventListener('mouseenter', stopAutoPlay);
    testimonialContainer.addEventListener('mouseleave', startAutoPlay);
    
    startAutoPlay();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'success';
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formMessage.textContent = '';
                formMessage.className = '';
            }, 3000);
            
        } catch (error) {
            // Show error message
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            formMessage.className = 'error';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Typing animation for hero subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Utility Functions
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

// Performance optimizations
const debouncedScroll = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload critical images
function preloadImages() {
    const images = [
        './img/IMG_1558.jpeg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Handle form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Initialize error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}