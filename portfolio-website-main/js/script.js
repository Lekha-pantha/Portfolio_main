document.addEventListener('DOMContentLoaded', function() {
  // Navbar Elements
  const navbar = document.getElementById('magic-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const contactBtn = document.querySelector('.btn-contact'); // Added contact button reference

  // Development Approach Elements
  const steps = document.querySelectorAll('.process-step');
  const toolBadges = document.querySelectorAll('.tool-badge');

  // 1. Enhanced Navbar Scroll Effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 50) {
      navbar.classList.remove('scrolled');
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // 2. Magnetic Links Effect
  navLinks.forEach(link => {
    const linkText = link.querySelector('.link-text');
    let frame;
    
    link.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = link.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        linkText.style.transform = `translate(${x * 8}px, ${y * 4 - 3}px)`;
      });
    });
    
    link.addEventListener('mouseleave', () => {
      cancelAnimationFrame(frame);
      linkText.style.transform = 'translateY(0)';
    });

    // Smooth scroll for nav links
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        document.querySelector(hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Contact Button Functionality
  if (contactBtn) {
    // Hover effect
    contactBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 10px 20px rgba(67, 97, 238, 0.3)';
      this.querySelector('.contact-arrow').style.transform = 'translateX(4px)';
    });
    
    contactBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'none';
      this.style.boxShadow = 'none';
      this.querySelector('.contact-arrow').style.transform = 'none';
    });

    // Click functionality
    contactBtn.addEventListener('click', function(e) {
      if (this.hash) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // 4. Active Link on Scroll
  function setActiveLink() {
    const scrollPosition = window.scrollY + 100;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        link.classList.toggle('active', 
          scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight
        );
      }
    });
  }

  // 5. Development Approach Animations
  const animateSteps = () => {
    steps.forEach(step => {
      const connector = step.querySelector('.step-connector');
      if (connector) {
        const stepPosition = step.getBoundingClientRect();
        if (stepPosition.top < window.innerHeight * 0.8) {
          connector.style.height = '0';
          setTimeout(() => {
            connector.style.transition = 'height 1s ease';
            connector.style.height = 'calc(100% + 2.5rem)';
          }, 300);
        }
      }
    });
  };

  // 6. Tool Badge Interactions
  toolBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    });
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'none';
      this.style.boxShadow = 'none';
    });
  });

  // 7. Navbar Toggler
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      this.classList.toggle('collapsed');
    });
  }

  // Initializations
  window.addEventListener('scroll', () => {
    setActiveLink();
    animateSteps();
  });
  
  // Initial calls
  setActiveLink();
  animateSteps();
});