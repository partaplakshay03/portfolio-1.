/**
 * ==========================================================================
 * PORTFOLIO CONTROLLER SYSTEM - LAKSHAY PRATAP SINGH
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize loader fadeout
  initLoader();

  // Initialize interactive background particles
  initParticles();

  // Initialize typewriter effect
  initTypewriter();

  // Initialize scroll indicators and active nav links
  initScrollHandler();

  // Initialize scroll reveal intersections
  initScrollReveal();

  // Initialize skills animation
  initSkillsProgress();

  // Initialize animated counter stats
  initCounterStats();

  // Initialize portfolio filter logic
  initPortfolioFilter();

  // Initialize contact form handler
  initContactForm();
});

/**
 * --------------------------------------------------------------------------
 * 1. LOADER CONTROLLER
 * --------------------------------------------------------------------------
 */
function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (!loader) return;

  // Let loading screen display for a minimum duration to appreciate aesthetics
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      // Enable scroll once loaded
      document.body.style.overflow = 'initial';
    }, 1200);
  });

  // Fallback in case window load event already fired or is slow
  setTimeout(() => {
    if (!loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 3500);
}

/**
 * --------------------------------------------------------------------------
 * 2. PARTICLES CANVAS CONTROLLER (NEON CONNECTIVITY NETWORK)
 * --------------------------------------------------------------------------
 */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const numberOfParticles = 75;

  // Mouse interact position
  let mouse = {
    x: null,
    y: null,
    radius: 130
  };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    setCanvasSize();
  });

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();

  // Particle Blueprint
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    // Draw particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow
    }

    // Update coordinates
    update() {
      // Bounce check
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Mouse interactive push/pull effect
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
          // Pull particles slightly towards mouse or repel depending on distance
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 0.6;
          const directionY = forceDirectionY * force * 0.6;
          
          this.x += directionX;
          this.y += directionY;
        }
      }

      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  // Create particle pool
  function createParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (canvas.width - size * 2) + size;
      let y = Math.random() * (canvas.height - size * 2) + size;
      let directionX = (Math.random() * 0.6) - 0.3;
      let directionY = (Math.random() * 0.6) - 0.3;
      // alternate particle glow colors
      let colors = ['rgba(0, 242, 254, 0.45)', 'rgba(127, 0, 255, 0.45)', 'rgba(236, 0, 140, 0.35)'];
      let color = colors[Math.floor(Math.random() * colors.length)];

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  // Connect particles within proximity
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          opacityValue = 1 - (distance / 120);
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  createParticles();
  animate();
}

/**
 * --------------------------------------------------------------------------
 * 3. TYPEWRITER EFFECT
 * --------------------------------------------------------------------------
 */
function initTypewriter() {
  const textElement = document.querySelector('.hero-subtitle-typing');
  if (!textElement) return;

  const roles = [
    "MERN Stack Developer",
    "Full Stack Web Developer",
    "HARTRON Intern"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Delete characters
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // speed up deleting
    } else {
      // Type characters
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // normal typing speed
    }

    // If fully typed, pause before deleting
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // pause at peak
    } else if (isDeleting && charIndex === 0) {
      // If fully deleted, switch to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

/**
 * --------------------------------------------------------------------------
 * 4. SCROLL & NAV ACTION CONTROLLERS
 * --------------------------------------------------------------------------
 */
function initScrollHandler() {
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Mobile Hamburger Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Window scroll handler
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header transparency & shadow transformation
    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (scrollPos > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active navigational states
    let currentSection = '';
    sections.forEach(sec => {
      const topOffset = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollPos >= topOffset && scrollPos < topOffset + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll to Top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * --------------------------------------------------------------------------
 * 5. SCROLL REVEAL INTERSECT OBSERVER
 * --------------------------------------------------------------------------
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once animation plays
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/**
 * --------------------------------------------------------------------------
 * 6. SKILLS PROGRESS ANIMATIONS
 * --------------------------------------------------------------------------
 */
function initSkillsProgress() {
  const progressBars = document.querySelectorAll('.progress-fill');
  const skillsSection = document.getElementById('skills');
  if (!skillsSection || progressBars.length === 0) return;

  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetPct = bar.getAttribute('data-percentage');
          bar.style.width = `${targetPct}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  barObserver.observe(skillsSection);
}

/**
 * --------------------------------------------------------------------------
 * 7. STATS COUNT-UP ANIMATION
 * --------------------------------------------------------------------------
 */
function initCounterStats() {
  const counterBoxes = document.querySelectorAll('.counter-val');
  const statsSection = document.getElementById('achievements');
  if (!statsSection || counterBoxes.length === 0) return;

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterBoxes.forEach(box => {
          const targetNum = parseInt(box.getAttribute('data-target'), 10);
          animateCount(box, targetNum);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  function animateCount(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 25; // 25ms increments
    const totalSteps = duration / intervalTime;
    const stepValue = target / totalSteps;

    const counterInterval = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        element.textContent = target;
        clearInterval(counterInterval);
      } else {
        element.textContent = Math.floor(current);
      }
    }, intervalTime);
  }

  countObserver.observe(statsSection);
}

/**
 * --------------------------------------------------------------------------
 * 8. PORTFOLIO GRID PROJECT FILTERS
 * --------------------------------------------------------------------------
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter visible items
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Display card with a scale animation
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide card with a shrink scale animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 9. CONTACT FORM INTERACT LOGIC
 * --------------------------------------------------------------------------
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const statusContainer = document.querySelector('.form-message-status');
  if (!contactForm) return;

  // Render log database on page load
  renderTransmissions();

  // Handle message send
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Reset status element states
    statusContainer.classList.remove('success', 'error');
    statusContainer.style.display = 'none';

    // Verification check
    if (!name || !email || !message) {
      statusContainer.textContent = "✖ Please fill out all required fields.";
      statusContainer.classList.add('error');
      statusContainer.style.display = 'block';
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      statusContainer.textContent = "✖ Please provide a valid email address.";
      statusContainer.classList.add('error');
      statusContainer.style.display = 'block';
      return;
    }

    // Success Simulation
    statusContainer.textContent = "✓ Syncing parameters... Transmission successfully sent!";
    statusContainer.classList.add('success');
    statusContainer.style.display = 'block';

    // Store in local storage for demonstration & persist message states
    const localMessages = JSON.parse(localStorage.getItem('sent_messages') || '[]');
    localMessages.push({ name, email, phone, message, timestamp: new Date().toISOString() });
    localStorage.setItem('sent_messages', JSON.stringify(localMessages));

    // Re-render local database inbox
    renderTransmissions();

    // Reset the form input fields
    contactForm.reset();

    // Auto fade status container after 6 seconds
    setTimeout(() => {
      statusContainer.style.display = 'none';
    }, 6000);
  });

  // Handle database clear
  const clearBtn = document.getElementById('clear-transmissions-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear the entire transmissions database?')) {
        localStorage.removeItem('sent_messages');
        renderTransmissions();
      }
    });
  }
}

/**
 * --------------------------------------------------------------------------
 * 10. LOCAL DATABASE LOG INBOX RENDERER
 * --------------------------------------------------------------------------
 */
function renderTransmissions() {
  const logContainer = document.getElementById('transmissions-log');
  if (!logContainer) return;

  const localMessages = JSON.parse(localStorage.getItem('sent_messages') || '[]');
  
  if (localMessages.length === 0) {
    logContainer.innerHTML = '<p class="no-transmissions">No incoming transmissions recorded in local database.</p>';
    return;
  }

  let html = '';
  // Show newest transmissions first
  localMessages.slice().reverse().forEach((msg, index) => {
    const originalIndex = localMessages.length - 1 - index;
    const formattedDate = new Date(msg.timestamp).toLocaleString();
    
    html += `
      <div class="transmission-entry">
        <span class="delete-transmission-btn" onclick="deleteTransmission(${originalIndex})" title="Delete Entry">✖ Delete</span>
        <div class="transmission-meta">
          <span class="transmission-sender">📡 SENDER: ${escapeHtml(msg.name)}</span>
          <span>${formattedDate}</span>
        </div>
        <div class="transmission-details">${escapeHtml(msg.message)}</div>
        <div class="transmission-phone-email">
          <div>Email: <span>${escapeHtml(msg.email)}</span></div>
          <div>Phone: <span>${msg.phone ? escapeHtml(msg.phone) : 'None Provided'}</span></div>
        </div>
      </div>
    `;
  });
  logContainer.innerHTML = html;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

// Global scope expose for inline onclick handler
window.deleteTransmission = function(index) {
  let localMessages = JSON.parse(localStorage.getItem('sent_messages') || '[]');
  localMessages.splice(index, 1);
  localStorage.setItem('sent_messages', JSON.stringify(localMessages));
  renderTransmissions();
};

