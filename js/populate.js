// Functions to populate HTML elements with data from config.json

function populateNavigation(config) {
  document.title = `${config.siteTitle} - Professional Video Editing & Content Creation`;
  const logoLink = document.getElementById("site-logo-link");
  // Check if both the URL and Height properties exist
  if (
    config.siteLogoUrl &&
    config.siteLogoUrl.trim() !== "" &&
    config.siteLogoHeight
  ) {
    // If a logo URL exists and is not empty, use it
    // THIS IS THE KEY CHANGE: We use ${config.siteLogoHeight} instead of "32px"
    logoLink.innerHTML = `<img src="${config.siteLogoUrl}" alt="${config.siteTitle} logo" style="height: ${config.siteLogoHeight}; width: auto;">`;
  } else {
    // Otherwise, fall back to the site title text
    logoLink.innerHTML = `<div class="text-2xl font-bold text-primary">${config.siteTitle}</div>`;
  }
  const mainNav = document.getElementById("main-nav");
  const mobileMenu = document.getElementById("mobile-menu");
  mainNav.innerHTML = ""; // Clear existing links
  mobileMenu.innerHTML = ""; // Clear existing links

  config.navigation.forEach((item) => {
    mainNav.innerHTML += `<a href="${item.href}" class="nav-link">${item.text}</a>`;
    mobileMenu.innerHTML += `<a href="${item.href}" class="mobile-nav-link">${item.text}</a>`;
  });
  mobileMenu.innerHTML += `<a href="#contact" class="mobile-nav-link">Contact</a>`; // Add static contact link
}

function populateHero(heroConfig) {
  document.getElementById("hero-title").textContent = heroConfig.title;
  document.getElementById("hero-subtitle").textContent = heroConfig.subtitle;
  document.getElementById("hero-description").textContent =
    heroConfig.description;

  // Tools we master - from config
  const toolsContainer = document.getElementById("tools-container");
  if (toolsContainer) {
    toolsContainer.innerHTML = "";
    (heroConfig.tools || []).forEach((tool) => {
      // Supports: iconUrl (image), label + className (chip style), or just label
      if (tool.iconUrl) {
        toolsContainer.innerHTML += `<div class="chip" title="${
          tool.title || tool.label || ""
        }" style="background:#0e0e0e; padding: 0; overflow: hidden;"><img src="${
          tool.iconUrl
        }" alt="${
          tool.title || tool.label || ""
        }" style="width: 40px; height: 40px; object-fit: contain; display:block;"></div>`;
      } else {
        const classes = ["chip"];
        if (tool.className) classes.push(tool.className);
        const text = tool.label || (tool.title ? tool.title[0] : "?");
        toolsContainer.innerHTML += `<div class="${classes.join(" ")}" title="${
          tool.title || tool.label || ""
        }">${text}</div>`;
      }
    });
  }

  // Video Embed
  const videoContainer = document.getElementById("hero-video-container");
  if (videoContainer) {
    if (heroConfig.videoEmbedUrl && heroConfig.videoEmbedUrl.trim() !== "") {
      videoContainer.innerHTML = `
        <div class="hero-video-wrapper">
          <iframe 
            src="${heroConfig.videoEmbedUrl}" 
            title="Video Embed" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      `;
      videoContainer.classList.remove("hidden");
    } else {
      videoContainer.innerHTML = "";
      videoContainer.classList.add("hidden");
    }
  }

  const statsBar = document.getElementById("stats-bar");
  statsBar.innerHTML = "";
  heroConfig.stats.forEach((stat) => {
    statsBar.innerHTML += `<div class="stat-item"> <div class="stat-number">${stat.number}</div> <div class="stat-label">${stat.label}</div> </div>`;
  });

  // Initialize trusted brands using the dedicated module
  if (typeof initTrustedBrands === "function") {
    initTrustedBrands(heroConfig.trustedBrands || []);
  }

  // Populate creators grid
  const creatorsGrid = document.getElementById("creators-grid");
  if (creatorsGrid && heroConfig.creators) {
    creatorsGrid.innerHTML = "";
    heroConfig.creators.forEach((creator) => {
      creatorsGrid.innerHTML += `
        <div class="creator-card">
          <img src="${creator.logoUrl}" alt="${creator.name}" class="creator-logo" />
          <div class="creator-info">
            <h4 class="creator-name">${creator.name}</h4>
            <div class="creator-audience"><span class="creator-audience-number">${creator.audience}</span>Subs</div>
          </div>
        </div>
      `;
    });
  }
}

function populateGraphics(graphicsConfig) {
  if (typeof initializeGraphicsCarousel === "function") {
    initializeGraphicsCarousel(graphicsConfig);
  }
}

function populateScripting(scriptingConfig) {
  if (typeof initializeScriptingCarousel === "function") {
    initializeScriptingCarousel(scriptingConfig);
  }
}

function populateSuccessStories(storiesConfig) {
  const container = document.getElementById("success-stories-container");
  if (!container || !storiesConfig) return;

  container.innerHTML = "";
  storiesConfig.forEach((story) => {
    let statsHTML = "";
    if (story.stats && story.stats.length > 0) {
      statsHTML = `<div class="success-story-stats">
        ${story.stats
          .map(
            (stat) => `
          <div class="success-stat-item">
            <img src="${stat.image}" alt="${stat.text}" class="success-stat-img" loading="lazy">
            <div class="success-stat-text">${stat.text}</div>
          </div>
        `,
          )
          .join("")}
      </div>`;
    }

    let topStatsHTML = "";
    if (story.topStats && story.topStats.length > 0) {
      topStatsHTML = `<div class="success-story-top-stats">
        ${story.topStats
          .map(
            (stat) => `
          <div class="success-top-stat">
            <span class="success-top-stat-value">${stat.value}</span>
            <span class="success-top-stat-label">${stat.label}</span>
          </div>
        `,
          )
          .join("")}
      </div>`;
    }

    container.innerHTML += `
      <div class="success-story-card">
        <div class="success-story-header">
          <img src="${story.logoUrl}" alt="${story.name} Logo" class="success-story-logo" loading="lazy">
          <div class="success-story-header-content">
            <div class="success-story-title">
              <h4>${story.name}</h4>
              <div class="success-story-genre">${story.genre}</div>
            </div>
          </div>
          ${topStatsHTML}
        </div>
        <p class="success-story-text">${story.story}</p>
        ${statsHTML}
      </div>
    `;
  });
}

function populateTestimonials(testimonialsConfig) {
  const carousel = document.getElementById("testimonial-carousel");
  carousel.innerHTML = "";
  testimonialsConfig.forEach((item) => {
    carousel.innerHTML += `
            <div class="testimonial-card">

                <div class="author-info">
                    <img src="${item.avatarUrl}" alt="Author Avatar" class="avatar">
                    <div>
                        <p class="author-name">${item.author}</p>
                        <p class="author-subs">${item.subs}</p>
                         <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                </div>
                <div>
                    <p class="review-text">"${item.text}"</p>

                </div>
            </div>`;
  });
}

function populateFaq(faqConfig) {
  const container = document.getElementById("faq-container");
  container.innerHTML = "";
  faqConfig.forEach((item) => {
    container.innerHTML += `
            <div class="faq-item" onclick="toggleFAQ(this)">
                <div class="faq-question">${item.question}<span>+</span></div>
                <div class="faq-answer">${item.answer}</div>
            </div>`;
  });
}

function populateWhyUs(whyUsConfig) {
  if (!whyUsConfig) return;
  const titleEl = document.getElementById("whyus-title");
  const subtitleEl = document.getElementById("whyus-subtitle");
  const boxesEl = document.getElementById("whyus-boxes");
  if (!titleEl || !subtitleEl || !boxesEl) return;

  titleEl.textContent = whyUsConfig.title || "";
  subtitleEl.textContent = whyUsConfig.subtitle || "";

  boxesEl.innerHTML = "";
  (whyUsConfig.comparisonBoxes || []).forEach((box) => {
    const isPro = (box.type || "").toLowerCase() === "pro";
    
    const card = document.createElement("div");
    card.className = `why-us-card ${isPro ? 'pro-card' : 'standard-card'}`;
    
    // Add cool icons next to points based on the card type
    const listHtml = (box.points || []).map((p) => `
        <li>
            <span class="why-us-icon">
                ${isPro 
                    ? '<i class="fas fa-check-circle" style="color: hsl(var(--primary));"></i>' 
                    : '<i class="fas fa-times-circle" style="color: #ef4444;"></i>'
                }
            </span>
            <span class="why-us-text">${p}</span>
        </li>
    `).join("");

    card.innerHTML = `
        <div class="why-us-card-header">
            <h3>${box.title || ""}</h3>
            ${isPro ? '<div class="pro-badge">Our Approach</div>' : ''}
        </div>
        <ul class="why-us-list">
            ${listHtml}
        </ul>
    `;
    boxesEl.appendChild(card);
  });
}

function populateClientWins(clientWinsConfig) {
    if (typeof initializeClientWinsCarousel === 'function') {
        initializeClientWinsCarousel(clientWinsConfig);
    }
}

function populateTeam(teamConfig) {
  const container = document.getElementById("team-container");
  if (!container || !teamConfig || teamConfig.length === 0) return;

  container.innerHTML = "";

  // Helper to generate a row of members
  const createRow = (members, isFirstRow) => {
    let rowHtml = `<div class="team-row ${isFirstRow ? "team-row-first" : ""}">`;
    members.forEach((member, index) => {
      // Middle card of the first row gets the "ceo-card" class to lift it
      const isMiddleFirstRow =
        isFirstRow && members.length === 3 && index === 1;

      rowHtml += `
        <div class="team-member ${isMiddleFirstRow ? "ceo-card" : ""}">
          <div class="team-member-img-wrapper">
            <div class="team-member-img-inner">
              <img src="${member.imageUrl}" alt="${member.name}" class="team-member-img" loading="lazy">
            </div>
          </div>
          <div class="team-member-name">${member.name}</div>
          <div class="team-member-role">${member.role}</div>
        </div>
      `;
    });
    rowHtml += `</div>`;
    return rowHtml;
  };

  // Split into rows: 3, 3, 2 (as requested)
  const row1 = teamConfig.slice(0, 3);
  const row2 = teamConfig.slice(3, 6);
  const row3 = teamConfig.slice(6, 8);

  if (row1.length > 0) container.innerHTML += createRow(row1, true);
  if (row2.length > 0) container.innerHTML += createRow(row2, false);
  if (row3.length > 0) container.innerHTML += createRow(row3, false);
}

function populateContact(contactConfig) {
  if (!contactConfig) return;
  const founderNameEl = document.getElementById("founder-name");
  if (founderNameEl) {
    founderNameEl.textContent = contactConfig.name;
    const founderRoleEl = document.getElementById("founder-role");
    if (founderRoleEl) founderRoleEl.textContent = contactConfig.role;
    const bioEl = document.getElementById("founder-bio");
    if (bioEl) {
      const fullBio = contactConfig.bio || "";
      const bioHtml = (fullBio || "").replace(/\n/g, "<br>");
      bioEl.innerHTML = bioHtml;
      bioEl.classList.add("collapsed");
      let isCollapsed = true;
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "bio-toggle";
      toggleBtn.textContent = "Read more";
      toggleBtn.addEventListener("click", () => {
        isCollapsed = !isCollapsed;
        bioEl.classList.toggle("collapsed", isCollapsed);
        toggleBtn.textContent = isCollapsed ? "Read more" : "Show less";
      });
      bioEl.after(toggleBtn);
    }
    const avatarContainer = document.getElementById("founder-avatar");
    if (avatarContainer) {
      if (contactConfig.avatarUrl && contactConfig.avatarUrl.trim() !== "") {
        avatarContainer.style.background = "none";
        avatarContainer.innerHTML = `<img src="${contactConfig.avatarUrl}" alt="${contactConfig.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else {
        const initial = contactConfig.name
          ? contactConfig.name.charAt(0).toUpperCase()
          : "";
        avatarContainer.textContent = initial;
      }
    }
    const socialLinks = document.getElementById("social-links");
    if (socialLinks && contactConfig.socials) {
      socialLinks.innerHTML = "";
      const socialLinksHTML = contactConfig.socials
    .map((item) => {
      // Format URL for display - show domain and path
      let displayUrl = item.url;
      if (item.url.startsWith("mailto:")) {
        displayUrl = item.url.replace("mailto:", "");
      } else if (
        item.url.startsWith("https://") ||
        item.url.startsWith("http://")
      ) {
        try {
          const url = new URL(item.url);
          displayUrl = url.hostname.replace("www.", "") + url.pathname;
        } catch (e) {
          displayUrl = item.url;
        }
      }

      // Use image if iconUrl is provided, otherwise use icon class
      const iconHtml = item.iconUrl
        ? `<img src="${item.iconUrl}" alt="${item.title}" class="social-icon">`
        : `<i class="${item.iconClass}"></i>`;

      return `<a href="${item.url}" title="${item.title}" class="social-link">
            ${iconHtml}
            <span class="social-text">${displayUrl}</span>
        </a>`;
    })
    .join("");
      socialLinks.innerHTML = socialLinksHTML;
    }
  }

  const footerYearEl = document.getElementById("footer-year");
  if (footerYearEl) footerYearEl.textContent = contactConfig.copyrightYear || new Date().getFullYear();

  // Footer logo link + image from config
  const footerLogoLink = document.getElementById("footer-logo-link");
  const footerLogoImg = document.getElementById("footer-logo-img");
  if (footerLogoLink && footerLogoImg) {
    footerLogoLink.href = "/";
    footerLogoImg.src =
      contactConfig && contactConfig.avatarUrl
        ? contactConfig.avatarUrl
        : typeof siteLogoUrl !== "undefined"
          ? siteLogoUrl
          : "";
    // Prefer site logo from config if available
    try {
      const rootConfigLogo =
        window.__siteConfig && window.__siteConfig.siteLogoUrl;
      if (rootConfigLogo) footerLogoImg.src = rootConfigLogo;
    } catch (e) {}
    footerLogoImg.alt = "NY Studios logo";
  }
}

function populateShortForm(shortFormConfig) {
  if (typeof initializeShortFormCarousel === "function" && shortFormConfig) {
    initializeShortFormCarousel(shortFormConfig);
  }
}
