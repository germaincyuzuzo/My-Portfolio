    // Dark mode toggle
    const darkToggle = document.querySelector('.dark-toggle');
    const root = document.documentElement;
    // Initialize theme from local storage or system preference
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

    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.getElementById('primary-navigation');
    function initNav() {
      if(window.innerWidth <= 768){
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
      if(isExpanded) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '&#9776;'; // hamburger icon
        navbar.classList.remove('mobile-visible');
        navbar.classList.add('mobile-hidden');
      } else {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.innerHTML = '&#10005;'; // close icon (×)
        navbar.classList.remove('mobile-hidden');
        navbar.classList.add('mobile-visible');
      }
    });

    // Highlight active nav links based on scroll position
    const sections = document.querySelectorAll('main section, footer#contact');
    const navLinks = document.querySelectorAll('nav.navbar a');
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

    // Smooth scroll for anchor links and close menu on mobile click
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        if(window.innerWidth <= 768) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.innerHTML = '&#9776;';
          navbar.classList.remove('mobile-visible');
          navbar.classList.add('mobile-hidden');
        }
      });
    });

    // On window resize, reset menu if width changes beyond breakpoint
    window.addEventListener('resize', () => {
      initNav();
    });
    window.addEventListener('load', () => {
      initNav();
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      if(window.pageYOffset > 600){
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Projects filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('#projects .project');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active btn aria-pressed
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;

        projects.forEach(proj => {
          if(filter === 'all' || proj.dataset.tech.includes(filter)){
            proj.style.display = 'block';
          } else {
            proj.style.display = 'none';
          }
        });
      });
    });

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    let currentTestimonial = 0;
    function showTestimonial(index) {
      testimonials.forEach((t,i) => {
        t.classList.toggle('active', i === index);
        carouselBtns[i].classList.toggle('active', i === index);
        carouselBtns[i].setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
      currentTestimonial = index;
    }
    carouselBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        showTestimonial(idx);
      });
    });
    // Auto cycle testimonials every 8 seconds
    setInterval(() => {
      let next = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(next);
    }, 8000);
