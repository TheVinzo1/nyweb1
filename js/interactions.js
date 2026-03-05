// UI interactions, effects, and event handlers

// Navigation and mobile menu functionality
class Navigation {
  constructor() {
    this.hamburgerBtn = document.getElementById("hamburger-btn");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.sections = document.querySelectorAll("section[id]");
    this.navLinks = document
      .getElementById("main-nav")
      .querySelectorAll("a.nav-link");
    this.viewWorkBtn = document.getElementById("view-work-btn");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollObserver();
  }

  setupEventListeners() {
    this.hamburgerBtn.addEventListener(
      "click",
      this.toggleMobileMenu.bind(this)
    );

    this.mobileMenu.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", this.closeMobileMenu.bind(this));
    });

    // No special handler for view-work button since it is now a direct anchor link
  }

  toggleMobileMenu() {
    document.body.classList.toggle("mobile-nav-open");
    document.body.classList.toggle("no-scroll");
  }

  closeMobileMenu() {
    document.body.classList.remove("mobile-nav-open");
    document.body.classList.remove("no-scroll");
  }

  handleViewWorkClick() {
    // Prefer the graphics/templates section if present
    const graphicsSection = document.getElementById("graphics");
    const servicesSection = document.getElementById("services");
    const targetSection = graphicsSection || servicesSection;
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // If services is visible, open a category (Gaming preferred)
    if (servicesSection) {
      const gamingBtn = document.querySelector(
        '.category-btn[data-category="Gaming"]'
      );
      const fallbackBtn = document.querySelector(".category-btn");
      const targetBtn = gamingBtn || fallbackBtn;
      if (targetBtn) targetBtn.click();
    }
  }

  setupScrollObserver() {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const activeLink = document
              .getElementById("main-nav")
              .querySelector(`a[href="#${id}"]`);
            this.navLinks.forEach((link) => link.classList.remove("active"));
            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    this.sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
}

// Artwork filter functionality - Deprecated/Replaced by GraphicsCategorySlider

// Poison water effect
class WaterEffect {
  constructor() {
    this.waterLayer = document.getElementById("waterLayer");
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > this.lastScrollY && scrollY > 50) {
      this.waterLayer.classList.add("drain");
      this.waterLayer.classList.remove("splash");
    } else if (scrollY < this.lastScrollY) {
      this.waterLayer.classList.add("splash");
      this.waterLayer.classList.remove("drain");
    }

    if (scrollY < 10) {
      this.waterLayer.classList.add("splash");
      this.waterLayer.classList.remove("drain");
    }

    this.lastScrollY = scrollY;
  }
}

// Stats counter animation
class StatsCounter {
  constructor() {
    this.statsBar = document.querySelector(".stats-bar");

    this.init();
  }

  init() {
    if (this.statsBar) {
      this.setupObserver();
    }
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".stat-number").forEach((el) => {
              if (!el.dataset.animated) {
                this.animateCountUp(el);
                el.dataset.animated = "true";
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.statsBar);
  }

  animateCountUp(el) {
    const finalValueString = el.textContent;
    const suffix = finalValueString.replace(/[0-9.]/g, "");
    const target = parseFloat(finalValueString);

    if (isNaN(target)) return;

    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);
      el.textContent = currentValue + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = finalValueString;
      }
    };

    el.textContent = "0" + suffix;
    window.requestAnimationFrame(step);
  }
}

// FAQ toggle functionality
function toggleFAQ(item) {
  item.classList.toggle("active");
  const icon = item.querySelector(".faq-question span");
  icon.textContent = item.classList.contains("active") ? "−" : "+";
}

// Initialize all interactions
function initializeInteractions() {
  new Navigation();
  new ArtworkFilter();
  new WaterEffect();
  new StatsCounter();
}

// Make toggleFAQ globally available for onclick attributes
window.toggleFAQ = toggleFAQ;

// Image popup functionality
class ImagePopup {
  constructor() {
    this.popup = null;
    this.init();
  }

  init() {
    document.addEventListener("click", this.handleDocumentClick.bind(this));
    document.addEventListener("mouseover", this.handleMouseOver.bind(this)); // Add mouseover listener
  }

  handleDocumentClick(event) {
    const target = event.target.closest(".artwork-card.clickable");
    if (target) {
      event.preventDefault();
      const imageUrl = target.dataset.imageUrl;
      if (imageUrl) {
        this.openPopup(imageUrl);
      }
    }
  }

  handleMouseOver(event) {
    const target = event.target.closest(".artwork-card.clickable");
    if (target) {
      const imageUrl = target.dataset.imageUrl;
      if (imageUrl && !target.dataset.preloaded) {
        const img = new Image();
        img.src = imageUrl;
        target.dataset.preloaded = "true"; // Mark as preloaded
      }
    }
  }

  openPopup(imageUrl) {
    if (this.popup) {
      this.closePopup();
    }

    this.popup = document.createElement("div");
    this.popup.classList.add("image-popup-overlay");
    this.popup.innerHTML = `
            <button class="image-popup-close">&times;</button>
            <div class="image-popup-content">
                <img src="${imageUrl}" alt="Full Image" class="image-popup-img" loading="lazy">
            </div>
        `;
    document.body.appendChild(this.popup);
    document.body.classList.add("no-scroll"); // Prevent scrolling when popup is open

    this.popup
      .querySelector(".image-popup-close")
      .addEventListener("click", this.closePopup.bind(this));
    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) {
        this.closePopup();
      }
    });

    // Optional: Add keyboard escape to close
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  closePopup() {
    if (this.popup) {
      document.body.removeChild(this.popup);
      document.body.classList.remove("no-scroll");
      this.popup = null;
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }
}

// Initialize all interactions
function initializeInteractions() {
  new Navigation();
  new WaterEffect();
  new StatsCounter();
  new ImagePopup(); // Initialize the image popup
}

// Make toggleFAQ globally available for onclick attributes
window.toggleFAQ = toggleFAQ;
