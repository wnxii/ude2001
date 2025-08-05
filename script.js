// JavaScript for Botaniq Project Showcase

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initAnimations();
  initInteractiveElements();
});

// Navigation Functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile");

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.classList.toggle("active");
  });

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links (only for anchor links)
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Only prevent default for internal anchor links
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
      // For external links (like timeline.html), let the browser handle navigation normally
    });
  });

  // Navbar scroll effects
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove background blur based on scroll position
    if (scrollTop > 50) {
      navbar.classList.add("bg-white/95");
      navbar.classList.remove("bg-white/90");
    } else {
      navbar.classList.add("bg-white/90");
      navbar.classList.remove("bg-white/95");
    }

    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    // Update active navigation link
    updateActiveNavLink();
  });

  // Logo link functionality
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      const currentPath = window.location.pathname;
      // Check if on homepage (index.html or root)
      if (currentPath.endsWith("/") || currentPath.endsWith("index.html")) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      // For other pages, the default href="index.html" will work
    });
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollPosition = window.pageYOffset + 100; // Offset for navbar height

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Scroll Effects and Animations
function initScrollEffects() {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animation
  gsap.from(".hero-title", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".hero-subtitle", {
    duration: 1.5,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero-cta", {
    duration: 1.5,
    y: 30,
    opacity: 0,
    delay: 0.6,
    ease: "power3.out",
  });

  // Section animations on scroll
  const sections = document.querySelectorAll("section:not(:first-child)");
  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Stagger animations for cards
  gsap.fromTo(
    ".portfolio-category",
    {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Team member animations
  gsap.fromTo(
    ".team-member",
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".team-member",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Prototype card animations
  gsap.fromTo(
    ".prototype-card",
    {
      opacity: 0,
      x: -30,
      rotation: -5,
    },
    {
      opacity: 1,
      x: 0,
      rotation: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".prototype-card",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Parallax effect for hero background
  gsap.to(".hero-bg", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Interactive Elements
function initInteractiveElements() {
  // Portfolio link hover effects
  const portfolioLinks = document.querySelectorAll(".portfolio-link");
  portfolioLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      gsap.to(this, { duration: 0.3, x: 10, ease: "power2.out" });
    });

    link.addEventListener("mouseleave", function () {
      gsap.to(this, { duration: 0.3, x: 0, ease: "power2.out" });
    });
  });

  // Card hover animations
  const cards = document.querySelectorAll(
    ".portfolio-category, .team-member, .prototype-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.3,
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.3,
        y: 0,
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      });
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".btn-primary, .bg-emerald-600");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1.05,
        y: -3,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1,
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      });
    });
  });

  // Floating animation for icons
  const floatingElements = document.querySelectorAll(".text-4xl");
  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      y: -10,
      duration: 2 + index * 0.3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: index * 0.5,
    });
  });

  // Table responsive enhancement
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const cells = table.querySelectorAll("td");
    const headers = table.querySelectorAll("th");

    cells.forEach((cell, index) => {
      const headerIndex = index % headers.length;
      if (headers[headerIndex]) {
        cell.setAttribute("data-label", headers[headerIndex].textContent);
      }
    });

    table.classList.add("responsive-table");
  });

  // Lazy loading for images (if any are added later)
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Utility Functions
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Loading Animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    gsap.to(loader, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        loader.style.display = "none";
      },
    });
  }
});

// Error Handling
window.addEventListener("error", function (e) {
  console.warn("An error occurred:", e.error);
});

// Accessibility Enhancements
document.addEventListener("keydown", function (e) {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.classList.remove("active");
    }
  }

  // Tab navigation enhancement
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-nav");
});

// Performance optimization: Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  animationObserver.observe(el);
});

// Console welcome message
console.log(`
🌿 Welcome to Botaniq - Project Showcase
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with modern web technologies:
• HTML5 Semantic Structure
• CSS3 with Custom Properties
• Vanilla JavaScript ES6+
• GSAP Animations
• Responsive Design
• Accessibility Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Export functions for potential external use
window.BotaniqShowcase = {
  initNavigation,
  initScrollEffects,
  initAnimations: initInteractiveElements,
  updateActiveNavLink,
  throttle,
  debounce,
};
