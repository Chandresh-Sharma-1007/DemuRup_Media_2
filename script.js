gsap.registerPlugin(ScrollTrigger);

// ── Custom cursor ──────────────────────────────────────────
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (cur) cur.style.opacity = "1";
  if (ring) ring.style.opacity = ".45";
  gsap.set(cur, { x: mx, y: my });
});
(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  gsap.set(ring, { x: rx, y: ry });
  requestAnimationFrame(animRing);
})();
document.addEventListener("mouseover", (e) => {
  if (
    e.target &&
    e.target.closest(
      "a, button, .check-item, .bcard, .step-card, .tcard, .ind-pill, .dr-pop-maybe-later, .client-card, [data-cursor='link'], .wwh-tab",
    )
  ) {
    gsap.to(cur, { width: 18, height: 18, duration: 0.2 });
    gsap.to(ring, { width: 52, height: 52, duration: 0.2 });
  }
});
document.addEventListener("mouseout", (e) => {
  if (
    e.target &&
    e.target.closest(
      "a, button, .check-item, .bcard, .step-card, .tcard, .ind-pill, .dr-pop-maybe-later, .client-card, [data-cursor='link'], .wwh-tab",
    )
  ) {
    gsap.to(cur, { width: 10, height: 10, duration: 0.2 });
    gsap.to(ring, { width: 34, height: 34, duration: 0.2 });
  }
});

// ── Shared Fullscreen Navigation Menu Component ─────────────────
const MENU_OVERLAY_HTML = `
<div id="dr-menu-overlay" class="dr-menu-overlay" aria-hidden="true">
  <div class="dr-menu-container">
    <div class="dr-menu-content">
      <!-- Left Column: Large Bold Links -->
      <div class="dr-menu-left">
        <ul class="dr-menu-links">
          <li class="dr-menu-item"><a href="about.html" class="dr-menu-link">About</a></li>
          <li class="dr-menu-item dr-menu-item-services">
            <a href="index.html#services" class="dr-menu-link dr-services-trigger" id="dr-services-toggle" aria-expanded="false">
              Services <span class="dr-services-arrow dr-services-arrow-desktop" aria-hidden="true">→</span><span class="dr-services-arrow dr-services-arrow-mobile" aria-hidden="true">↓</span>
            </a>
            <!-- Mobile/Tablet Accordion Dropdown -->
            <div class="dr-services-accordion" id="dr-services-accordion" aria-hidden="true">
              <ul class="dr-services-accordion-list">
                <li><a href="Social Media Management.html" class="dr-service-item-link">Social Media Management</a></li>
                <li><a href="Web Design & Development.html" class="dr-service-item-link">Web Design & Development</a></li>
                <li><a href="Branding.html" class="dr-service-item-link">Branding</a></li>
                <li><a href="SEO.html" class="dr-service-item-link">SEO</a></li>
                <li><a href="Performance Marketing.html" class="dr-service-item-link">Performance Marketing</a></li>
                <li><a href="Influencer Marketing.html" class="dr-service-item-link">Influencer Marketing</a></li>
              </ul>
            </div>
          </li>
          <li class="dr-menu-item"><a href="clients.html" class="dr-menu-link">Clients</a></li>
          <li class="dr-menu-item"><a href="casestudy.html" class="dr-menu-link">Case Study</a></li>
          <li class="dr-menu-item"><a href="blog.html" class="dr-menu-link">Blog</a></li>
          <li class="dr-menu-item"><a href="contact.html" class="dr-menu-link">Contact</a></li>
        </ul>
      </div>

      <!-- Right Column: Contact details & Socials + Services Panel -->
      <div class="dr-menu-right" id="dr-menu-right">
        <div class="dr-menu-right-info" id="dr-menu-right-info">
          <div class="dr-menu-right-item dr-menu-contact-section">
            <h4 class="dr-menu-sublabel">Connect</h4>
            <a href="mailto:demurupmedia@gmail.com" class="dr-menu-contact-link">demurupmedia@gmail.com</a>
            <a href="https://wa.me/919586569990" target="_blank" rel="noopener" class="dr-menu-contact-link">+91 95865 69990</a>
          </div>
          
          <div class="dr-menu-right-item dr-menu-contact-section">
            <h4 class="dr-menu-sublabel">Location</h4>
            <p class="dr-menu-text">Vapi, Gujarat, India</p>
          </div>

          <div class="dr-menu-right-item dr-menu-contact-section">
            <h4 class="dr-menu-sublabel">Socials</h4>
            <div class="dr-menu-socials">
              <a href="https://www.instagram.com/demurup_media" target="_blank" rel="noopener" class="dr-menu-social-link">Instagram</a>
              <a href="https://www.linkedin.com/company/demurup-media/" target="_blank" rel="noopener" class="dr-menu-social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <!-- Desktop Services Panel -->
        <div class="dr-menu-services-panel" id="dr-menu-services-panel" aria-hidden="true">
          <h4 class="dr-menu-sublabel dr-services-header">Our Services</h4>
          <ul class="dr-services-desktop-list">
            <li><a href="Social Media Management.html" class="dr-service-item-link">Social Media Management</a></li>
            <li><a href="Web Design & Development.html" class="dr-service-item-link">Web Design & Development</a></li>
            <li><a href="Branding.html" class="dr-service-item-link">Branding</a></li>
            <li><a href="SEO.html" class="dr-service-item-link">SEO</a></li>
            <li><a href="Performance Marketing.html" class="dr-service-item-link">Performance Marketing</a></li>
            <li><a href="Influencer Marketing.html" class="dr-service-item-link">Influencer Marketing</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`;

function initMenuOverlay() {
  const existingOverlay = document.getElementById("dr-menu-overlay");
  if (!existingOverlay) {
    document.body.insertAdjacentHTML("beforeend", MENU_OVERLAY_HTML);
  } else {
    existingOverlay.outerHTML = MENU_OVERLAY_HTML;
  }
  initMenuLetterHoverAnimations();
}

function setupMenuLinkTypography() {
  const links = document.querySelectorAll(".dr-menu-link");

  links.forEach((link) => {
    if (link.dataset.charSplit) return;
    link.dataset.charSplit = "true";

    // Set aria-label for accessibility if not set
    if (!link.getAttribute("aria-label")) {
      const cleanText = link.textContent.replace(/\s+/g, " ").trim();
      link.setAttribute("aria-label", cleanText);
    }

    // Split text nodes into individual character spans
    const childNodes = Array.from(link.childNodes);

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        // Skip whitespace-only text nodes (indentation / newlines)
        if (!text || /^\s+$/.test(text)) {
          node.textContent = "";
          return;
        }

        // Trim leading and trailing whitespace from the text node
        text = text.trim();
        if (!text) return;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement("span");
          span.className = "dr-char";
          span.setAttribute("aria-hidden", "true");

          if (char === " ") {
            span.innerHTML = "&nbsp;";
            span.classList.add("dr-char-space");
          } else {
            span.textContent = char;
          }

          fragment.appendChild(span);
        }

        link.replaceChild(fragment, node);
      }
    });
  });
}

function initMenuLetterHoverAnimations() {
  setupMenuLinkTypography();

  const links = document.querySelectorAll(".dr-menu-link");

  links.forEach((link) => {
    if (link.dataset.hoverAnimInit) return;
    link.dataset.hoverAnimInit = "true";

    const chars = link.querySelectorAll(".dr-char:not(.dr-char-space)");
    if (!chars.length) return;

    link.addEventListener("mouseenter", () => {
      gsap.killTweensOf(chars);
      gsap.to(chars, {
        y: -7.5,
        duration: 0.32,
        stagger: 0.028,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.killTweensOf(chars);
      gsap
        .timeline()
        .to(chars, {
          y: -9,
          duration: 0.18,
          stagger: 0.028,
          ease: "power1.out",
        })
        .to(
          chars,
          {
            y: 0,
            duration: 0.32,
            stagger: 0.028,
            ease: "power2.inOut",
          },
          "-=0.26",
        );
    });
  });
}

initMenuOverlay();

// ── Scroll reveals ─────────────────────────────────────────
gsap.utils.toArray(".reveal").forEach((el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 46 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      delay: (i % 3) * 0.07,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    },
  );
});

// ── Counter ────────────────────────────────────────────────
document.querySelectorAll("[data-count]").forEach((el) => {
  const t = +el.getAttribute("data-count");
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    onEnter() {
      gsap.to(
        { v: 0 },
        {
          v: t,
          duration: 2.2,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(this.targets()[0].v) + "+";
          },
        },
      );
    },
  });
});

// ── Smart Nav scroll & contrast theme behavior ─────────────────────────────
(function initSmartNavScroll() {
  const mainNav = document.getElementById("main-nav");
  if (!mainNav) return;

  let lastScrollY = window.scrollY;
  let scrollStopTimer = null;
  const SCROLL_THRESHOLD = 5;
  const STOP_TIMEOUT = 400; // Auto-reveal nav after 400ms pause

  function updateNavTheme() {
    if (document.body.classList.contains("menu-open")) {
      mainNav.classList.remove("nav-theme-dark-foreground");
      return;
    }

    const navCheckY = 40; // 40px from top of viewport (center of nav)
    const sections = document.querySelectorAll(
      "section[data-theme], footer[data-theme], header[data-theme], div[data-theme]",
    );
    let currentTheme = "dark"; // Default to dark section (Hero is dark)

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= navCheckY && rect.bottom > navCheckY) {
        currentTheme = sections[i].getAttribute("data-theme") || "dark";
        break;
      }
    }

    if (currentTheme === "light") {
      mainNav.classList.add("nav-theme-dark-foreground");
    } else {
      mainNav.classList.remove("nav-theme-dark-foreground");
    }
  }

  // Initial update
  updateNavTheme();

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      // Update theme contrast dynamically on scroll
      updateNavTheme();

      // 1. If menu overlay is open, ALWAYS keep nav visible
      if (document.body.classList.contains("menu-open")) {
        mainNav.classList.remove("nav-hidden");
        if (scrollStopTimer) clearTimeout(scrollStopTimer);
        return;
      }

      // 2. Clear previous scroll stop timer
      if (scrollStopTimer) clearTimeout(scrollStopTimer);

      // 3. At top of page (near 0), always show nav
      if (currentScrollY <= 60) {
        mainNav.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      const deltaY = currentScrollY - lastScrollY;

      // 4. Check scroll direction with threshold
      if (Math.abs(deltaY) >= SCROLL_THRESHOLD) {
        if (deltaY > 0) {
          // Scrolling DOWN -> Hide nav
          mainNav.classList.add("nav-hidden");
        } else {
          // Scrolling UP -> Show nav immediately
          mainNav.classList.remove("nav-hidden");
        }
        lastScrollY = currentScrollY;
      }

      // 5. Set timer to automatically show nav when user stops scrolling
      scrollStopTimer = setTimeout(() => {
        if (!document.body.classList.contains("menu-open")) {
          mainNav.classList.remove("nav-hidden");
        }
      }, STOP_TIMEOUT);
    },
    { passive: true },
  );
})();

// ── Fullscreen Navigation Menu ──────────────────────────────
const hmb = document.getElementById("hamburger");
const menuOverlay = document.getElementById("dr-menu-overlay");
const menuLinks = document.querySelectorAll(".dr-menu-link");
const menuRightItems = document.querySelectorAll(".dr-menu-right-item");
const servicesToggle = document.getElementById("dr-services-toggle");
const servicesPanel = document.getElementById("dr-menu-services-panel");
const servicesAccordion = document.getElementById("dr-services-accordion");
let menuIsOpen = false;
let servicesIsOpen = false;

function toggleServicesPanel(state) {
  if (!menuOverlay) return;
  servicesIsOpen = typeof state === "boolean" ? state : !servicesIsOpen;

  const desktopArrow = document.querySelector(".dr-services-arrow-desktop");

  if (servicesIsOpen) {
    menuOverlay.classList.add("services-open");
    if (desktopArrow) desktopArrow.textContent = "←";
    if (servicesToggle) servicesToggle.setAttribute("aria-expanded", "true");
    if (servicesPanel) servicesPanel.setAttribute("aria-hidden", "false");
    if (servicesAccordion)
      servicesAccordion.setAttribute("aria-hidden", "false");
  } else {
    menuOverlay.classList.remove("services-open");
    if (desktopArrow) desktopArrow.textContent = "→";
    if (servicesToggle) servicesToggle.setAttribute("aria-expanded", "false");
    if (servicesPanel) servicesPanel.setAttribute("aria-hidden", "true");
    if (servicesAccordion)
      servicesAccordion.setAttribute("aria-hidden", "true");
  }
}

function openMenu() {
  if (!menuOverlay) return;
  menuIsOpen = true;
  hmb.classList.add("open");
  menuOverlay.classList.add("open");
  document.body.classList.add("menu-open");

  // GSAP animations
  gsap.killTweensOf([menuOverlay, menuLinks, menuRightItems]);

  // Fade in the overlay
  gsap.fromTo(
    menuOverlay,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: "power2.out" },
  );

  // Stagger links fading upward (Fade, Y 20px -> 0, stagger 60ms)
  gsap.fromTo(
    menuLinks,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.08,
      onComplete: () => {
        gsap.set(menuLinks, { clearProps: "transform,y" });
      },
    },
  );

  // Stagger right contact column items fading upward after menu links (delay: 0.35s)
  gsap.fromTo(
    menuRightItems,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.07,
      ease: "power3.out",
      delay: 0.35,
    },
  );
}

function closeMenu() {
  if (!menuOverlay) return;
  menuIsOpen = false;
  toggleServicesPanel(false);
  hmb.classList.remove("open");
  document.body.classList.remove("menu-open");

  // GSAP animations
  gsap.killTweensOf([menuOverlay, menuLinks, menuRightItems]);

  // Fade links out smoothly
  gsap.to(menuLinks, {
    opacity: 0,
    y: -15,
    duration: 0.25,
    stagger: 0.03,
    ease: "power2.in",
  });

  // Fade right contact column items out
  gsap.to(menuRightItems, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    stagger: 0.03,
    ease: "power2.in",
  });

  // Fade out the overlay
  gsap.to(menuOverlay, {
    opacity: 0,
    duration: 0.35,
    delay: 0.15,
    ease: "power2.inOut",
    onComplete: () => {
      menuOverlay.classList.remove("open");
      const chars = document.querySelectorAll(".dr-char");
      if (chars.length) {
        gsap.killTweensOf(chars);
        gsap.set(chars, { clearProps: "transform,y" });
      }
    },
  });
}

if (hmb) {
  hmb.addEventListener("click", () => {
    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

// Services click-to-reveal toggle listener
if (servicesToggle) {
  servicesToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleServicesPanel();
  });
}

// Close services panel when clicking elsewhere inside the menu overlay
if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (!servicesIsOpen) return;

    const isInsideToggle = servicesToggle && servicesToggle.contains(e.target);
    const isInsidePanel = servicesPanel && servicesPanel.contains(e.target);
    const isInsideAccordion =
      servicesAccordion && servicesAccordion.contains(e.target);

    if (!isInsideToggle && !isInsidePanel && !isInsideAccordion) {
      toggleServicesPanel(false);
    }
  });
}

// Close menu when links are clicked (for smooth anchor scroll)
document.querySelectorAll(".dr-menu-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (
      link.id === "dr-services-toggle" ||
      link.classList.contains("dr-services-trigger")
    ) {
      return; // Handled by servicesToggle click handler
    }
    closeMenu();

    const href = link.getAttribute("href");
    if (href && (href.startsWith("#") || href.includes("#"))) {
      const hashIndex = href.indexOf("#");
      const targetId = href.substring(hashIndex);
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 450); // wait for menu fade-out delay
      }
    }
  });
});

// Close menu and navigate when sub-menu service item links are clicked
document.querySelectorAll(".dr-service-item-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    closeMenu();

    const href = link.getAttribute("href");
    if (href && (href.startsWith("#") || href.includes("#"))) {
      const hashIndex = href.indexOf("#");
      const targetId = href.substring(hashIndex);
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 450);
      }
    }
  });
});

// ── Smooth anchor scroll ───────────────────────────────────
document.querySelectorAll('a[href^="#"]:not(.dr-menu-link)').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ── Checkboxes ─────────────────────────────────────────────
function toggleCheck(el) {
  el.classList.toggle("selected");
  const icon = el.querySelector(".check-icon");
  if (icon)
    icon.style.display = el.classList.contains("selected") ? "block" : "none";
}

// ── Form submit ────────────────────────────────────────────
function submitForm() {
  // Get Values from HTML
  const name = document.getElementById("f-name").value;
  const brand = document.getElementById("f-brand").value;
  const phone = document.getElementById("f-phone").value;
  const service = document.getElementById("f-needs").value;

  // Validation
  if (!name || !brand || !phone) {
    alert("Please fill in all required fields.");
    return;
  }

  // Correct URL from your Published form
  const googleFormURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSf69FZxO2yfhzztccagS5yramNNNxBkFE2lnysiMDPhsx8BDA/formResponse";

  const formData = new FormData();

  // THESE ARE THE CORRECT ENTRY IDs (Found inside your data-params)
  formData.append("entry.473350564", name); // Name
  formData.append("entry.907618539", brand); // Company Name
  formData.append("entry.1773922703", phone); // Phone Number
  formData.append("entry.160217275", service); // Service Needed

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then(() => {
      // Success Actions
      document.getElementById("contact-form-wrap").style.display = "none";
      document.getElementById("form-success").style.display = "block";
      document
        .getElementById("form-success")
        .scrollIntoView({ behavior: "smooth" });
    })
    .catch((err) => {
      console.error("Submission Error:", err);
      alert("Submission failed. Please try again.");
    });
}

// ── Portfolio Request Modal ──────────────────────────────────
function openPortfolioModal() {
  const overlay = document.getElementById("dr-portfolio-modal-overlay");
  if (!overlay) return;
  overlay.style.display = "flex";
  void overlay.offsetWidth;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";

  const formWrap = document.getElementById("dr-portfolio-form-wrap");
  const successWrap = document.getElementById("dr-portfolio-success");
  const errorBox = document.getElementById("dr-p-error");
  if (formWrap) formWrap.style.display = "block";
  if (successWrap) successWrap.style.display = "none";
  if (errorBox) {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }

  setTimeout(() => {
    const firstInput = document.getElementById("dr-p-name");
    if (firstInput) firstInput.focus();
  }, 100);
}

function closePortfolioModal() {
  const overlay = document.getElementById("dr-portfolio-modal-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (!overlay.classList.contains("is-open")) {
      overlay.style.display = "none";
    }
  }, 350);
}

document.addEventListener("DOMContentLoaded", () => {
  const pOverlay = document.getElementById("dr-portfolio-modal-overlay");
  if (pOverlay) {
    pOverlay.addEventListener("click", (e) => {
      if (e.target === pOverlay) {
        closePortfolioModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modalOverlay = document.getElementById(
        "dr-portfolio-modal-overlay",
      );
      if (modalOverlay && modalOverlay.classList.contains("is-open")) {
        closePortfolioModal();
      }
    }
  });
});

function handlePortfolioSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("dr-p-name");
  const emailInput = document.getElementById("dr-p-email");
  const brandInput = document.getElementById("dr-p-brand");
  const phoneInput = document.getElementById("dr-p-phone");
  const msgInput = document.getElementById("dr-p-message");
  const errorBox = document.getElementById("dr-p-error");
  const submitBtn = document.getElementById("dr-p-submit-btn");
  const btnText = document.getElementById("dr-p-btn-text");
  const btnSpinner = document.getElementById("dr-p-btn-spinner");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const brand = brandInput ? brandInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const message = msgInput ? msgInput.value.trim() : "";

  // Validation
  if (!name || !email || !brand) {
    if (errorBox) {
      errorBox.textContent =
        "Please fill in all required fields (Name, Work Email, Brand).";
      errorBox.style.display = "block";
    }
    return;
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (errorBox) {
      errorBox.textContent = "Please enter a valid work email address.";
      errorBox.style.display = "block";
    }
    return;
  }

  if (errorBox) errorBox.style.display = "none";
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.textContent = "Submitting Request...";
  if (btnSpinner) btnSpinner.style.display = "inline-block";

  const googleFormURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSf69FZxO2yfhzztccagS5yramNNNxBkFE2lnysiMDPhsx8BDA/formResponse";
  const formData = new FormData();
  formData.append("entry.473350564", name);
  formData.append("entry.907618539", brand);
  formData.append("entry.1773922703", phone || email);
  formData.append(
    "entry.160217275",
    `Portfolio Request | Email: ${email} | Note: ${message || "N/A"}`,
  );

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = "REQUEST PORTFOLIO →";
      if (btnSpinner) btnSpinner.style.display = "none";

      const formWrap = document.getElementById("dr-portfolio-form-wrap");
      const successWrap = document.getElementById("dr-portfolio-success");
      if (formWrap) formWrap.style.display = "none";
      if (successWrap) successWrap.style.display = "block";
    })
    .catch((err) => {
      console.error("Submission Error:", err);
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = "REQUEST PORTFOLIO →";
      if (btnSpinner) btnSpinner.style.display = "none";
      if (errorBox) {
        errorBox.textContent =
          "Submission failed. Please try again or contact us directly on WhatsApp.";
        errorBox.style.display = "block";
      }
    });
}

// ── Testimonial slider ─────────────────────────────────────
let curSlide = 0;
const track = document.getElementById("tslider-track");
const totalSlides = track ? track.children.length : 1;
function goSlide(n) {
  curSlide = (n + totalSlides) % totalSlides;
  if (track) track.style.transform = `translateX(-${curSlide * 100}%)`;
}
function nextSlide() {
  goSlide(curSlide + 1);
}
function prevSlide() {
  goSlide(curSlide - 1);
}
setInterval(nextSlide, 6000);

// ══════════════════════════════════════════════════════════════
//  DEMURUP SMART POPUP — Full Logic
// ══════════════════════════════════════════════════════════════

(function () {
  // ── State ──────────────────────────────────────────────────
  const SESSION_KEY_CLOSED = "dr_popup_x_closed"; // X clicked: hide entire session
  const SESSION_KEY_LATER = "dr_popup_later_ts"; // "Maybe later" timestamp

  const overlay = document.getElementById("dr-popup-overlay");
  if (!overlay) return;
  const timerCircle = document.getElementById("dr-timer-circle");

  let userHasInteracted = false;
  let laterTimer = null;
  let autoTimer = null;
  let ringTimer = null;

  // ── Track first interaction (for audio autoplay) ───────────
  const markInteraction = () => {
    userHasInteracted = true;
  };
  ["click", "scroll", "keydown", "touchstart", "mousemove"].forEach((ev) =>
    document.addEventListener(ev, markInteraction, {
      once: true,
      passive: true,
    }),
  );

  // ── Synthesised "pop" sound via Web Audio API ──────────────
  function playPopSound() {
    if (!userHasInteracted) return; // respect browser autoplay policy
    try {
      // ── PRIMARY: use the provided _popping_up.mp3 file ────
      const sfx = new Audio("_popping_up.mp3");
      sfx.volume = 0.65;
      const playPromise = sfx.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If .mp3 fails (file missing / policy), fall through to Web Audio
          playWebAudioFallback();
        });
      }
    } catch (e) {
      // Silently fail and try synthesised fallback
      playWebAudioFallback();
    }
  }

  // ── FALLBACK: synthesised pop via Web Audio API ─────────────
  function playWebAudioFallback() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();

      // Layer 1: short sine pop
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain1.gain.setValueAtTime(0.18, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.12);

      // Layer 2: soft click transient
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
      gain2.gain.setValueAtTime(0.08, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("[DemuRup Popup] Audio unavailable:", e.message);
    }
  }

  // ── Show modal ─────────────────────────────────────────────
  window.drShowModal = function () {
    // Don't show if X was clicked this session
    if (sessionStorage.getItem(SESSION_KEY_CLOSED)) return;

    // Show
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden"; // prevent scroll behind

    // Sound
    playPopSound();
  };

  // ── Hide modal (shared) ────────────────────────────────────
  function drHide() {
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
    clearInterval(ringTimer);
  }

  // ── Close X: hide for entire session ──────────────────────
  window.drCloseX = function () {
    drHide();
    sessionStorage.setItem(SESSION_KEY_CLOSED, "1");
    clearTimeout(laterTimer);
    clearTimeout(autoTimer);
  };

  // ── Maybe Later: hide modal silently, internal reshow after cooldown ────
  window.drMaybeLater = function () {
    drHide();
    clearTimeout(laterTimer);
    // Silent internal cooldown: reshow after 60s without any user-facing countdown/toast/timer
    laterTimer = setTimeout(function () {
      drShowModal();
    }, 60000);
  };

  // ── CTA click: go to contact & close ──────────────────────
  window.drCtaClick = function (e) {
    e.preventDefault();
    drHide();
    sessionStorage.setItem(SESSION_KEY_CLOSED, "1"); // don't re-show after CTA
    clearTimeout(laterTimer);
    clearTimeout(autoTimer);
    // Smooth scroll to contact or navigate
    const target = document.getElementById("contact-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "contact.html";
    }
  };

  // ── Click backdrop to dismiss (acts like X) ────────────────
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) drCloseX();
  });

  // ── Keyboard ESC closes (acts like X) ─────────────────────
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("visible")) drCloseX();
  });

  // ── Check sessionStorage for "later" on reload ────────────
  function checkLaterResume() {
    // If X was clicked, never show again this session
    if (sessionStorage.getItem(SESSION_KEY_CLOSED)) return;
    // Initial trigger: 50 seconds after page load
    autoTimer = setTimeout(drShowModal, 50000);
  }

  // ── Boot ──────────────────────────────────────────────────
  checkLaterResume();
})(); // end IIFE

// ══════════════════════════════════════════════════════════════
//  DEMURUP INTRO SPLASH SCREEN (Architectural Redesign Engine)
// ══════════════════════════════════════════════════════════════

(function () {
  if (sessionStorage.getItem("splashPlayed")) {
    return;
  }

  const stage = document.getElementById("dr-splash-stage");
  if (!stage) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timers = [];

  function clearTimers() {
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function after(fn, ms) {
    const t = setTimeout(fn, ms);
    timers.push(t);
    return t;
  }

  function finishSplash() {
    if (!stage) return;
    clearTimers();

    // 1. Mark session as played
    sessionStorage.setItem("splashPlayed", "true");

    // 2. Begin exit transition (smooth fade and subtle scale)
    stage.classList.remove(
      "phase-box",
      "phase-dimension",
      "phase-deconstruct",
      "phase-redesign",
      "phase-converge",
      "phase-logo",
      "phase-sweep",
      "phase-settle"
    );
    stage.classList.add("phase-exit");

    // 3. Unlock scroll immediately as fade starts
    document.body.classList.remove("dr-splash-active");

    // 4. Notify Hero engine to start entrance cleanly as splash dissolves
    window.dispatchEvent(new CustomEvent("drSplashComplete"));

    // 5. Clean up and remove splash element from DOM after transition finishes
    setTimeout(() => {
      if (stage && stage.parentNode) {
        stage.remove();
      }
    }, 450);
  }

  function runSequence() {
    clearTimers();

    // Reset phases
    stage.className = "dr-splash-stage";

    // ── Reduced Motion Fast Path ──
    if (reduced) {
      after(() => stage.classList.add("phase-logo"), 60);
      after(() => stage.classList.add("phase-settle"), 700);
      after(finishSplash, 1500);
      return;
    }

    // ── Full Architectural Redesign Sequence (Target: ~3.2–3.3s) ──

    // Phase 1: Box appearance (0.00s -> ~0.35s)
    after(() => stage.classList.add("phase-box"), 40);

    // Phase 2: Dimension / 3D spatial expansion (~0.35s -> ~0.65s)
    after(() => {
      stage.classList.remove("phase-box");
      stage.classList.add("phase-dimension");
    }, 360);

    // Phase 3: Architectural Deconstruction (~0.65s -> ~1.15s)
    after(() => {
      stage.classList.remove("phase-dimension");
      stage.classList.add("phase-deconstruct");
    }, 660);

    // Phase 4: Controlled Redesign / Reorganization (~1.15s -> ~1.55s)
    after(() => {
      stage.classList.remove("phase-deconstruct");
      stage.classList.add("phase-redesign");
    }, 1160);

    // Phase 5: Convergence toward Center Line (~1.55s -> ~1.90s)
    after(() => {
      stage.classList.remove("phase-redesign");
      stage.classList.add("phase-converge");
    }, 1560);

    // Phase 6: Real DemuRup Logo Reveal (~1.90s -> ~2.35s)
    after(() => {
      stage.classList.remove("phase-converge");
      stage.classList.add("phase-logo");
    }, 1900);

    // Phase 7: Single Green Light Sweep across Logo (~2.35s -> ~2.65s)
    after(() => {
      stage.classList.add("phase-sweep");
    }, 2350);

    // Phase 8: Settle State (~2.65s -> ~2.85s)
    after(() => {
      stage.classList.remove("phase-sweep");
      stage.classList.add("phase-settle");
    }, 2660);

    // Phase 9: Exit / Transition into Site (~2.85s -> ~3.30s)
    after(finishSplash, 2850);
  }

  // Expose replay for debugging
  window.drSplashReplay = runSequence;

  runSequence();
})();

/* ══════════════════════════════════════════════════════════════
   DEMURUP MEDIA — NEW HERO ANIMATION & ORBIT ENGINE
══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var hero = document.getElementById("hero");
  if (!hero) return;

  var stage = document.getElementById("dr-hero-stage");
  var orbitSvg = document.getElementById("dr-hero-orbit-svg");
  var headline = hero.querySelector(".dr-hero-headline");
  var nodes = hero.querySelectorAll(".dr-service-node");
  var paths = hero.querySelectorAll(".dr-orbit-path");
  var scrollBtn = document.getElementById("dr-hero-scroll-btn");

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var isFinePointer = window.matchMedia("(pointer: fine)").matches;

  /* ── 1. Setup SVG Path Dash Drawing ── */
  paths.forEach(function (path) {
    try {
      var len = path.getTotalLength();
      if (!reduceMotion) {
        path.style.strokeDasharray = len + " " + len;
        path.style.strokeDashoffset = len;
      } else {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      }
    } catch (e) {}
  });

  /* ── 2. Entrance Animation Sequence (GSAP) ── */
  function startEntrance() {
    if (typeof gsap === "undefined" || reduceMotion) {
      if (headline) headline.style.opacity = "1";
      nodes.forEach(function (node) {
        node.style.opacity = "1";
      });
      paths.forEach(function (path) {
        path.style.strokeDashoffset = "0";
      });
      if (scrollBtn) scrollBtn.style.opacity = "1";
      return;
    }

    var tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.15,
    });

    // Step A: Headline reveals cleanly
    tl.fromTo(
      headline,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" },
    );

    // Step B: Orbit paths draw gracefully around headline
    paths.forEach(function (path, i) {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
        },
        0.2 + i * 0.12,
      );
    });

    // Step C: Service nodes enter with smooth stagger
    tl.fromTo(
      nodes,
      { opacity: 0, scale: 0.88, transformOrigin: "center center" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: "back.out(1.3)",
      },
      0.85,
    );

    // Step D: Scroll indicator appears
    if (scrollBtn) {
      tl.fromTo(
        scrollBtn,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        1.3,
      );
    }
  }

  // Trigger entrance sequence
  // Synchronize Hero entrance with Splash completion event
  function scheduleHeroEntrance() {
    var hasActiveSplash =
      !sessionStorage.getItem("splashPlayed") &&
      document.body.classList.contains("dr-splash-active");

    if (!hasActiveSplash) {
      setTimeout(startEntrance, 150);
    } else {
      var triggered = false;
      function onSplashDone() {
        if (triggered) return;
        triggered = true;
        window.removeEventListener("drSplashComplete", onSplashDone);
        setTimeout(startEntrance, 60);
      }
      window.addEventListener("drSplashComplete", onSplashDone);
      // Safe fallback timer in case event is somehow missed
      setTimeout(onSplashDone, 3300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleHeroEntrance);
  } else {
    scheduleHeroEntrance();
  }

  /* ── 3. Subtle Desktop Mouse Parallax ── */
  if (isFinePointer && !reduceMotion && stage) {
    var targetX = 0,
      targetY = 0;
    var currentX = 0,
      currentY = 0;
    var rafId = null;

    function onMouseMove(e) {
      var rect = hero.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var nx = (e.clientX - cx) / (rect.width / 2);
      var ny = (e.clientY - cy) / (rect.height / 2);

      // Controlled subtle shift: 5px max on X, 3px max on Y
      targetX = nx * 5;
      targetY = ny * 3;

      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }

    function updateParallax() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (orbitSvg) {
        orbitSvg.style.transform =
          "translate3d(" +
          currentX.toFixed(2) +
          "px, " +
          currentY.toFixed(2) +
          "px, 0)";
      }

      if (headline) {
        headline.style.transform =
          "translate3d(" +
          (-currentX * 0.22).toFixed(2) +
          "px, " +
          (-currentY * 0.22).toFixed(2) +
          "px, 0)";
      }

      if (
        Math.abs(targetX - currentX) > 0.01 ||
        Math.abs(targetY - currentY) > 0.01
      ) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    }

    hero.addEventListener("mousemove", onMouseMove, { passive: true });
    hero.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    });
  }

  /* ── 4. Scroll Down Button Smooth Action ── */
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var target =
        document.querySelector(".dr-brand-marquee") ||
        document.getElementById("about");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
})();

/* ── Hero Reel Video Modal Handler (Embedded YouTube Shorts) ── */
(function () {
  "use strict";

  var modal = document.getElementById("dr-reel-video-modal");
  var backdrop = document.getElementById("dr-reel-video-backdrop");
  var closeBtn = document.getElementById("dr-reel-video-close");
  var iframe = document.getElementById("dr-reel-video-iframe");
  if (!modal || !iframe) return;

  function openVideoModal(videoId) {
    if (!videoId) return;
    iframe.src =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(videoId) +
      "?autoplay=1&rel=0";
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeVideoModal() {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
    iframe.src = "";
    document.body.style.overflow = "";
  }

  // Bind click on all Hero reel cards with data-youtube-id
  var cards = document.querySelectorAll(".dr-card[data-youtube-id]");
  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (window.drSuppressHeroCardClick) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      e.preventDefault();
      var videoId = card.getAttribute("data-youtube-id");
      if (videoId) {
        openVideoModal(videoId);
      }
    });
  });

  // Close Button
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeVideoModal();
    });
  }

  // Backdrop click
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      e.preventDefault();
      closeVideoModal();
    });
  }

  // ESC key
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("visible")) {
      closeVideoModal();
    }
  });
})();

// ══════════════════════════════════════════════════════════════
// DEMURUP MEDIA — CREATIVE DIGITAL AGENCY SERVICE PAGES ENGINE
// ══════════════════════════════════════════════════════════════
function initServicePages() {
  const isServicePage = document.body.classList.contains("srv-body");
  if (!isServicePage) return;

  // 1. Creative Hero Entrance Animation
  const heroSection = document.querySelector(".srv-hero");
  const heroBadge = document.querySelector(".srv-hero-badge");
  const heroTitle = document.querySelector(".srv-hero-title");
  const heroGraphics = document.querySelectorAll(".srv-hero-graphic");

  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({ delay: 0.1 });

    if (heroBadge) {
      tl.fromTo(
        heroBadge,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
      );
    }

    if (heroTitle) {
      tl.fromTo(
        heroTitle,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.3",
      );
    }

    if (heroGraphics.length) {
      tl.fromTo(
        heroGraphics,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6",
      );
    }
  }

  // 2. Hero Interactive Mouse Parallax (Subtle)
  if (heroSection && heroGraphics.length) {
    heroSection.addEventListener("mousemove", function (e) {
      const rect = heroSection.getBoundingClientRect();
      const xPos = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const yPos = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      heroGraphics.forEach(function (el, idx) {
        const factor = (idx + 1) * 12;
        el.style.transform = `translate(${xPos * factor}px, ${yPos * factor}px)`;
      });
    });

    heroSection.addEventListener("mouseleave", function () {
      heroGraphics.forEach(function (el) {
        el.style.transform = "translate(0px, 0px)";
      });
    });
  }

  // 3. ScrollTrigger Stagger Reveal for Client Logos & Intro
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const introWrap = document.querySelector(".srv-intro-wrapper");
    if (introWrap) {
      gsap.fromTo(
        introWrap,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introWrap,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    const trustItems = document.querySelectorAll(".srv-trust-item");
    if (trustItems.length) {
      gsap.fromTo(
        trustItems,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".srv-trust-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }

  // 4. Interactive Tabs Engine
  const tabContainers = document.querySelectorAll(".srv-interactive-grid");
  tabContainers.forEach(function (container) {
    const navButtons = container.querySelectorAll(".srv-tab-btn");
    const panels = container.querySelectorAll(".srv-tab-panel");
    if (!navButtons.length || !panels.length) return;

    let isAnimating = false;
    let currentActiveTab = "what";

    function switchTab(targetKey) {
      if (targetKey === currentActiveTab || isAnimating) return;
      isAnimating = true;

      const currentBtn = container.querySelector(
        `.srv-tab-btn[data-tab="${currentActiveTab}"]`,
      );
      const targetBtn = container.querySelector(
        `.srv-tab-btn[data-tab="${targetKey}"]`,
      );
      const currentPanel = container.querySelector(
        `.srv-tab-panel[data-panel="${currentActiveTab}"]`,
      );
      const targetPanel = container.querySelector(
        `.srv-tab-panel[data-panel="${targetKey}"]`,
      );

      if (!targetBtn || !targetPanel) {
        isAnimating = false;
        return;
      }

      // Update button states
      navButtons.forEach(function (btn) {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });
      targetBtn.classList.add("is-active");
      targetBtn.setAttribute("aria-selected", "true");

      // Smooth panel transition (opacity 1 -> 0 / y: 0 -> 10, then opacity 0 -> 1 / y: -10 -> 0)
      if (typeof gsap !== "undefined") {
        gsap.to(currentPanel, {
          opacity: 0,
          y: 10,
          duration: 0.16,
          ease: "power2.in",
          onComplete: function () {
            currentPanel.classList.remove("is-active");
            currentPanel.style.display = "none";
            currentPanel.setAttribute("aria-hidden", "true");

            targetPanel.style.display = "block";
            targetPanel.classList.add("is-active");
            targetPanel.setAttribute("aria-hidden", "false");

            gsap.fromTo(
              targetPanel,
              { opacity: 0, y: -10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
                onComplete: function () {
                  currentActiveTab = targetKey;
                  isAnimating = false;
                },
              },
            );
          },
        });
      } else {
        // Fallback without GSAP
        if (currentPanel) {
          currentPanel.classList.remove("is-active");
          currentPanel.style.display = "none";
          currentPanel.setAttribute("aria-hidden", "true");
        }
        targetPanel.style.display = "block";
        targetPanel.classList.add("is-active");
        targetPanel.setAttribute("aria-hidden", "false");
        currentActiveTab = targetKey;
        isAnimating = false;
      }
    }

    navButtons.forEach(function (btn) {
      const tabKey = btn.getAttribute("data-tab");

      // Desktop hover
      btn.addEventListener("mouseenter", function () {
        if (window.innerWidth > 768) {
          switchTab(tabKey);
        }
      });

      // Desktop click & Mobile/Tablet tap
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        switchTab(tabKey);
      });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initServicePages);
} else {
  initServicePages();
}

/* ============ LUXURY SCROLL-RESPONSIVE ARCHITECTURAL TRANSITION SYSTEM ============ */
function initEditorialBlockTransitions() {
  // Respect prefers-reduced-motion
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var transitionSections = document.querySelectorAll(
    ".editorial-block-transition",
  );
  if (!transitionSections.length) return;

  transitionSections.forEach(function (sec, idx) {
    // Determine the color of the preceding field to be revealed from
    var isToWhite = sec.classList.contains("transition-to-white");
    var isToBlack = sec.classList.contains("transition-to-black");
    var fillColor = isToWhite ? "#000000" : isToBlack ? "#ffffff" : "#000000";

    // Remove any existing plane if re-initialized
    var existingPlane = sec.querySelector(".editorial-architectural-plane");
    if (existingPlane) {
      existingPlane.remove();
    }

    // Create the precision architectural plane SVG
    var svgNS = "http://www.w3.org/2000/svg";
    var plane = document.createElementNS(svgNS, "svg");
    plane.setAttribute("class", "editorial-architectural-plane");
    plane.setAttribute("viewBox", "0 0 1000 1000");
    plane.setAttribute("preserveAspectRatio", "none");
    plane.setAttribute("aria-hidden", "true");

    var filterId =
      "greenEdgeGlow_" + idx + "_" + Math.random().toString(36).substr(2, 6);

    plane.innerHTML =
      "<defs>" +
      '<filter id="' +
      filterId +
      '" x="-40%" y="-20%" width="180%" height="140%">' +
      '<feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#00CC33" flood-opacity="0.35"/>' +
      "</filter>" +
      "</defs>" +
      '<polygon points="0,0 1000,0 965,1000 0,1000" fill="' +
      fillColor +
      '" />' +
      '<line x1="1000" y1="0" x2="965" y2="1000" stroke="#00CC33" stroke-width="2.5" vector-effect="non-scaling-stroke" filter="url(#' +
      filterId +
      ')" />';

    sec.appendChild(plane);

    // Initial position: if section is already above the viewport on initial load, place offscreen
    var rect = sec.getBoundingClientRect();
    var initialX = rect.top < window.innerHeight * 0.25 ? 101 : 0;

    // Bind scroll progress directly to the architectural reveal plane
    gsap.fromTo(
      plane,
      { xPercent: initialX },
      {
        xPercent: 101,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top 95%",
          end: "top 25%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    // Slight delay to ensure layout and other ScrollTriggers are ready
    setTimeout(initEditorialBlockTransitions, 50);
  });
} else {
  setTimeout(initEditorialBlockTransitions, 50);
}


document.querySelectorAll('animateMotion[id^="arc"]').forEach((motion) => {

  const match = motion.id.match(/arc(\d+)move/);
  if (!match) return;

  const arcNumber = match[1];
  const arc = document.querySelector(`#arc-${arcNumber}`);

  if (!arc) return;

  motion.addEventListener('beginEvent', () => {
    arc.classList.add('is-active-glow');
  });

  motion.addEventListener('endEvent', () => {
    arc.classList.remove('is-active-glow');
  });

});