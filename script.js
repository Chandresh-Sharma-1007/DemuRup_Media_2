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
  if (e.target && e.target.closest("a, button, .check-item, .bcard, .step-card, .tcard, .ind-pill, .dr-pop-maybe-later, .client-card, [data-cursor='link'], .wwh-tab")) {
    gsap.to(cur, { width: 18, height: 18, duration: 0.2 });
    gsap.to(ring, { width: 52, height: 52, duration: 0.2 });
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target && e.target.closest("a, button, .check-item, .bcard, .step-card, .tcard, .ind-pill, .dr-pop-maybe-later, .client-card, [data-cursor='link'], .wwh-tab")) {
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
        overwrite: "auto"
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.killTweensOf(chars);
      gsap.timeline()
        .to(chars, {
          y: -9,
          duration: 0.18,
          stagger: 0.028,
          ease: "power1.out"
        })
        .to(chars, {
          y: 0,
          duration: 0.32,
          stagger: 0.028,
          ease: "power2.inOut"
        }, "-=0.26");
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
    const sections = document.querySelectorAll("section[data-theme], footer[data-theme], header[data-theme], div[data-theme]");
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
    { passive: true }
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
    if (servicesAccordion) servicesAccordion.setAttribute("aria-hidden", "false");
  } else {
    menuOverlay.classList.remove("services-open");
    if (desktopArrow) desktopArrow.textContent = "→";
    if (servicesToggle) servicesToggle.setAttribute("aria-expanded", "false");
    if (servicesPanel) servicesPanel.setAttribute("aria-hidden", "true");
    if (servicesAccordion) servicesAccordion.setAttribute("aria-hidden", "true");
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
  gsap.fromTo(menuOverlay, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.35, ease: "power2.out" }
  );

  // Stagger links fading upward (Fade, Y 20px -> 0, stagger 60ms)
  gsap.fromTo(menuLinks,
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
      }
    }
  );

  // Stagger right contact column items fading upward after menu links (delay: 0.35s)
  gsap.fromTo(menuRightItems,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.35 }
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
    ease: "power2.in"
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
    }
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
    const isInsideAccordion = servicesAccordion && servicesAccordion.contains(e.target);

    if (!isInsideToggle && !isInsidePanel && !isInsideAccordion) {
      toggleServicesPanel(false);
    }
  });
}

// Close menu when links are clicked (for smooth anchor scroll)
document.querySelectorAll(".dr-menu-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.id === "dr-services-toggle" || link.classList.contains("dr-services-trigger")) {
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
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSf69FZxO2yfhzztccagS5yramNNNxBkFE2lnysiMDPhsx8BDA/formResponse";

    const formData = new FormData();
    
    // THESE ARE THE CORRECT ENTRY IDs (Found inside your data-params)
    formData.append("entry.473350564", name);    // Name
    formData.append("entry.907618539", brand);   // Company Name
    formData.append("entry.1773922703", phone);  // Phone Number
    formData.append("entry.160217275", service); // Service Needed

    fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        // Success Actions
        document.getElementById('contact-form-wrap').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-success').scrollIntoView({ behavior: 'smooth' });
    }).catch(err => {
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
      const modalOverlay = document.getElementById("dr-portfolio-modal-overlay");
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
      errorBox.textContent = "Please fill in all required fields (Name, Work Email, Brand).";
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

  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSf69FZxO2yfhzztccagS5yramNNNxBkFE2lnysiMDPhsx8BDA/formResponse";
  const formData = new FormData();
  formData.append("entry.473350564", name);
  formData.append("entry.907618539", brand);
  formData.append("entry.1773922703", phone || email);
  formData.append("entry.160217275", `Portfolio Request | Email: ${email} | Note: ${message || "N/A"}`);

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = "REQUEST PORTFOLIO →";
    if (btnSpinner) btnSpinner.style.display = "none";

    const formWrap = document.getElementById("dr-portfolio-form-wrap");
    const successWrap = document.getElementById("dr-portfolio-success");
    if (formWrap) formWrap.style.display = "none";
    if (successWrap) successWrap.style.display = "block";
  }).catch((err) => {
    console.error("Submission Error:", err);
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = "REQUEST PORTFOLIO →";
    if (btnSpinner) btnSpinner.style.display = "none";
    if (errorBox) {
      errorBox.textContent = "Submission failed. Please try again or contact us directly on WhatsApp.";
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
  const badge = document.getElementById("dr-reappear-badge");
  const cntEl = document.getElementById("dr-badge-countdown");
  const timerCircle = document.getElementById("dr-timer-circle");

  let userHasInteracted = false;
  let laterTimer = null;
  let autoTimer = null;
  let timerCountdown = null;
  let ringTimer = null;
  let ringVal = 75.4; // full circumference
  let badgeInterval = null;

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

  // ── Confetti burst on open ─────────────────────────────────
  function spawnConfetti() {
    const modal = document.getElementById("dr-popup-modal");
    const colors = ["#00cc33", "#00ff44", "#ffffff", "#00aa29"];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement("div");
      el.className = "dr-confetti";
      el.style.cssText = `
          left: ${20 + Math.random() * 60}%;
          top: ${10 + Math.random() * 30}%;
          background: ${colors[i % colors.length]};
          width: ${3 + Math.random() * 5}px;
          height: ${3 + Math.random() * 5}px;
          animation-delay: ${Math.random() * 0.3}s;
          animation-duration: ${0.7 + Math.random() * 0.5}s;
        `;
      modal.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  }

  // ── Timer ring countdown (20s auto-close) ─────────────────
  function startRingCountdown(seconds) {
    const circumference = 75.4;
    ringVal = circumference;
    if (timerCircle) timerCircle.style.strokeDashoffset = 0;
    clearInterval(ringTimer);
    let elapsed = 0;
    ringTimer = setInterval(() => {
      elapsed++;
      const progress = elapsed / seconds;
      const offset = circumference * progress;
      if (timerCircle) timerCircle.style.strokeDashoffset = offset;
      if (elapsed >= seconds) clearInterval(ringTimer);
    }, 1000);
  }

  // ── Show modal ─────────────────────────────────────────────
  window.drShowModal = function () {
    // Don't show if X was clicked this session
    if (sessionStorage.getItem(SESSION_KEY_CLOSED)) return;

    // Hide badge if visible
    badge.style.display = "none";
    clearInterval(badgeInterval);
    if (cntEl) cntEl.textContent = "30";

    // Show
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden"; // prevent scroll behind

    // Sound
    playPopSound();

    // Confetti
    setTimeout(spawnConfetti, 150);

    // Ring countdown (20s)
    startRingCountdown(20);
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
    badge.style.display = "none";
    clearTimeout(laterTimer);
    clearTimeout(autoTimer);
  };

  // ── Maybe Later: hide → reshow after 30s ──────────────────
  window.drMaybeLater = function () {
    drHide();

    // Show the countdown badge
    let remaining = 80;
    badge.style.display = "block";
    if (cntEl) cntEl.textContent = remaining;

    clearInterval(badgeInterval);
    badgeInterval = setInterval(() => {
      remaining--;
      if (cntEl) cntEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(badgeInterval);
        badge.style.display = "none";
        drShowModal();
      }
    }, 1000);
  };

  // ── CTA click: go to contact & close ──────────────────────
  window.drCtaClick = function (e) {
    e.preventDefault();
    drHide();
    sessionStorage.setItem(SESSION_KEY_CLOSED, "1"); // don't re-show after CTA
    badge.style.display = "none";
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
//  DEMURUP INTRO SPLASH SCREEN
// ══════════════════════════════════════════════════════════════

(function() {
  if (sessionStorage.getItem('splashPlayed')) {
    return;
  }

  const stage = document.getElementById('dr-splash-stage');
  const gridStage = document.getElementById('dr-splash-gridStage');
  const pctEl = document.getElementById('dr-splash-pct');
  const barFill = document.getElementById('dr-splash-barFill');
  const COLS = 6, ROWS = 6;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cells = [];
  let timers = [];

  function clearTimers(){ timers.forEach(t => clearTimeout(t)); timers = []; }
  function after(fn, ms){ const t = setTimeout(fn, ms); timers.push(t); return t; }

  function buildGrid(){
    if (!gridStage) return;
    gridStage.innerHTML = '';
    gridStage.classList.remove('collapse');
    cells = [];
    const cx = (COLS - 1) / 2, cy = (ROWS - 1) / 2;
    for (let r = 0; r < ROWS; r++){
      for (let c = 0; c < COLS; c++){
        const div = document.createElement('div');
        div.className = 'dr-splash-cell';
        const dist = Math.hypot(c - cx, r - cy);
        div.dataset.dist = dist.toFixed(2);
        gridStage.appendChild(div);
        cells.push(div);
      }
    }
  }

  function fadeOutSplash() {
    if (!stage) return;
    stage.classList.add('dr-splash-fade-out');
    document.body.classList.remove('dr-splash-active');
    sessionStorage.setItem('splashPlayed', 'true');
    // Remove element after transition completes (0.8s transition in CSS)
    setTimeout(() => {
      stage.remove();
    }, 850);
  }

  function runSequence(){
    if (!stage) return;
    clearTimers();
    stage.classList.remove('phase-logo', 'phase-idle');
    buildGrid();

    if (reduced){
      after(() => stage.classList.add('phase-logo'), 50);
      after(() => stage.classList.add('phase-idle'), 400);
      animateCounter(600, 700);
      after(fadeOutSplash, 600 + 700 + 1200);
      return;
    }

    // Phase 1 — grid assembles, radial stagger
    cells.forEach(cell => {
      const d = parseFloat(cell.dataset.dist);
      after(() => cell.classList.add('in'), 120 + d * 90);
    });

    const gridInEnd = 120 + 4.2 * 90 + 250; // ~ last cell + settle

    // Phase 2 — redesign pulse: shuffled cells light up in a wave
    const order = [...cells].sort((a,b) => parseFloat(a.dataset.dist) - parseFloat(b.dataset.dist));
    order.forEach((cell, i) => {
      const onAt = gridInEnd + i * 26;
      after(() => cell.classList.add('pulse'), onAt);
      after(() => cell.classList.remove('pulse'), onAt + 260);
    });
    const redesignEnd = gridInEnd + order.length * 26 + 400;

    // Phase 3 — collapse into center
    after(() => {
      cells.forEach(cell => { cell.style.transformOrigin = '50% 50%'; });
      gridStage.classList.add('collapse');
    }, redesignEnd);

    const collapseEnd = redesignEnd + 750;

    // Phase 4 — logo draws
    after(() => stage.classList.add('phase-logo'), collapseEnd);

    // Phase 5 — loading readout counts up
    animateCounter(collapseEnd + 950, 1350);

    // Phase 6 — idle breathing state
    after(() => stage.classList.add('phase-idle'), collapseEnd + 950 + 1350 + 250);

    // Auto fade-out after idle phase settles (1.2s delay)
    after(fadeOutSplash, collapseEnd + 950 + 1350 + 250 + 1200);
  }

  function animateCounter(startAt, duration){
    after(() => {
      const start = performance.now();
      function tick(now){
        const t = Math.min(1, (now - start) / duration);
        const val = Math.round(t * 100);
        if (pctEl) pctEl.textContent = val + '%';
        if (barFill) barFill.style.width = val + '%';
        if (t < 1){ requestAnimationFrame(tick); }
      }
      requestAnimationFrame(tick);
    }, startAt);
  }

  // Expose runSequence for debugging/replay on demand
  window.drSplashReplay = runSequence;

  runSequence();
})();

/* ── Interactive Hero Section Physics Engine ── */
(function() {
  "use strict";

  var hero = document.querySelector(".dr-hero");
  var headline = document.querySelector(".dr-hero__headline");
  if (!hero || !headline) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* ---- 1. Entrance sequence ----------------------------------- */
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      hero.classList.add("is-revealed");
    });
  });

  /* ---- 2. Free-roam DVD-logo-style physics engine --------------- */
  var motionEls = Array.prototype.slice.call(hero.querySelectorAll(".dr-card__motion"));
  var cardEls   = Array.prototype.slice.call(hero.querySelectorAll(".dr-card"));

  var active = [];
  cardEls.forEach(function(cardEl, i) {
    if (getComputedStyle(cardEl).display !== "none") {
      active.push({ card: cardEl, motion: motionEls[i] });
    }
  });
  if (!active.length) return;

  var speeds = [18, 24, 20, 28, 22, 25, 19, 26, 21, 23];
  var angles = [35, 205, 120, 300, 165, 45, 140, 230, 310, 85];
  var spinProfiles = [
    { rot: 2.6, fr: 0.16, pr: 0.4, sc: 0.018, fs: 0.11, ps: 1.0 },
    { rot: 2.2, fr: 0.13, pr: 1.8, sc: 0.015, fs: 0.14, ps: 0.2 },
    { rot: 3.0, fr: 0.11, pr: 2.6, sc: 0.02,  fs: 0.09, ps: 2.1 },
    { rot: 2.4, fr: 0.18, pr: 0.9, sc: 0.016, fs: 0.15, ps: 1.4 },
    { rot: 2.8, fr: 0.14, pr: 3.1, sc: 0.019, fs: 0.1,  ps: 0.7 },
    { rot: 2.5, fr: 0.15, pr: 1.2, sc: 0.017, fs: 0.12, ps: 1.8 },
    { rot: 2.1, fr: 0.17, pr: 2.1, sc: 0.016, fs: 0.13, ps: 0.5 },
    { rot: 2.9, fr: 0.12, pr: 0.7, sc: 0.019, fs: 0.10, ps: 2.4 },
    { rot: 2.3, fr: 0.19, pr: 2.8, sc: 0.015, fs: 0.14, ps: 1.1 },
    { rot: 2.7, fr: 0.13, pr: 1.5, sc: 0.018, fs: 0.11, ps: 0.9 }
  ];
  var depths = [0.35, 0.22, 0.4, 0.28, 0.2, 0.32, 0.25, 0.38, 0.21, 0.3];

  var W = 0, H = 0;
  var centerX = 0, centerY = 0;
  var bodies = [];

  function measure() {
    var heroRect = hero.getBoundingClientRect();
    W = heroRect.width;
    H = heroRect.height;
    centerX = heroRect.left + W / 2;
    centerY = heroRect.top + H / 2;

    bodies.forEach(function(b) {
      var r = b.el.getBoundingClientRect();
      b.w = r.width;
      b.h = r.height;
    });
  }

  function rectsOverlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
  }

  var heroRect = hero.getBoundingClientRect();
  W = heroRect.width || window.innerWidth;
  H = heroRect.height || window.innerHeight;
  centerX = (heroRect.left || 0) + W / 2;
  centerY = (heroRect.top || 0) + H / 2;

  active.forEach(function(pair, i) {
    var r = pair.card.getBoundingClientRect();
    var w = r.width || 80, h = r.height || 140;
    var speed = speeds[i % speeds.length];
    var ang = (angles[i % angles.length]) * Math.PI / 180;

    var spawnX = 0, spawnY = 0;
    for (var attempt = 0; attempt < 50; attempt++) {
      spawnX = Math.random() * Math.max(10, W - w);
      spawnY = Math.random() * Math.max(10, H - h);
      
      var overlapsExisting = false;
      for (var k = 0; k < bodies.length; k++) {
        var existing = bodies[k];
        if (rectsOverlap(spawnX - 25, spawnY - 25, spawnX + w + 25, spawnY + h + 25, existing.x, existing.y, existing.x + existing.w, existing.y + existing.h)) {
          overlapsExisting = true;
          break;
        }
      }
      if (!overlapsExisting) break;
    }

    bodies.push({
      el: pair.card,
      motion: pair.motion,
      w: w, h: h,
      x: spawnX,
      y: spawnY,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      baseVx: Math.cos(ang) * speed,
      baseVy: Math.sin(ang) * speed,
      baseSpeed: speed,
      spin: spinProfiles[i % spinProfiles.length],
      depth: depths[i % depths.length]
    });
  });

  measure();
  window.addEventListener("resize", measure);

  /* ---- Continuous Smooth 2D Motion Force & Infinite Steering Pipeline ---- */
  var targetInputX = centerX;
  var targetInputY = centerY;
  var smoothInputX = centerX;
  var smoothInputY = centerY;
  var isInputActive = false;
  var inputInfluence = 0; // 0.0 to 1.0 smooth envelope
  var lastInputX = centerX;
  var lastInputY = centerY;
  var lastInputTime = 0;
  var inputVelocityX = 0;
  var inputVelocityY = 0;
  var touchStartX = 0;
  var touchStartY = 0;
  var isTouchDragging = false;

  // Mobile persistent 2D traveling heading (continuous 360-degree flight vector)
  var mobileHeadingX = Math.cos(45 * Math.PI / 180);
  var mobileHeadingY = Math.sin(45 * Math.PI / 180);

  function onInputStart(clientX, clientY) {
    targetInputX = clientX;
    targetInputY = clientY;
    smoothInputX = clientX;
    smoothInputY = clientY;
    lastInputX = clientX;
    lastInputY = clientY;
    touchStartX = clientX;
    touchStartY = clientY;
    isTouchDragging = false;
    lastInputTime = Date.now();
    inputVelocityX = 0;
    inputVelocityY = 0;
    isInputActive = true;
    inputInfluence = 1.0;
  }

  function onInputMove(clientX, clientY) {
    targetInputX = clientX;
    targetInputY = clientY;
    isInputActive = true;

    if (Math.hypot(clientX - touchStartX, clientY - touchStartY) > 12) {
      isTouchDragging = true;
    }

    var now = Date.now();
    var dtMove = Math.max(10, now - lastInputTime) / 1000;
    var rawVx = (clientX - lastInputX) / dtMove;
    var rawVy = (clientY - lastInputY) / dtMove;

    inputVelocityX += (rawVx - inputVelocityX) * 0.5;
    inputVelocityY += (rawVy - inputVelocityY) * 0.5;
    lastInputX = clientX;
    lastInputY = clientY;
    lastInputTime = now;
  }

  function onInputEnd() {
    isInputActive = false;
    if (isTouchDragging) {
      window.drSuppressHeroCardClick = true;
      setTimeout(function() {
        window.drSuppressHeroCardClick = false;
      }, 250);
    }
  }

  if (!reduceMotion) {
    // Desktop mouse interaction
    hero.addEventListener("mouseenter", function(e) {
      onInputStart(e.clientX, e.clientY);
    });

    hero.addEventListener("mousemove", function(e) {
      onInputMove(e.clientX, e.clientY);
    }, { passive: true });

    hero.addEventListener("mouseleave", function() {
      onInputEnd();
    });

    // Mobile touch interaction (2D Virtual Cursor Controller)
    hero.addEventListener("touchstart", function(e) {
      if (e.touches && e.touches.length > 0) {
        onInputStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener("touchmove", function(e) {
      if (e.touches && e.touches.length > 0) {
        onInputMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener("touchend", function() {
      onInputEnd();
    }, { passive: true });

    hero.addEventListener("touchcancel", function() {
      onInputEnd();
    }, { passive: true });
  }

  function render(t) {
    for (var i = 0; i < bodies.length; i++) {
      var b = bodies[i];
      var s = b.spin;
      var rot = Math.sin(t * s.fr + s.pr) * s.rot;
      var scale = 1 + Math.sin(t * s.fs + s.ps) * s.sc;

      b.motion.style.transform =
        "translate3d(" + b.x.toFixed(2) + "px," + b.y.toFixed(2) + "px,0) " +
        "rotate(" + rot.toFixed(2) + "deg) scale(" + scale.toFixed(3) + ")";
    }
  }

  if (reduceMotion) {
    render(0);
    return;
  }

  var lastTime = null;

  var CARD_MARGIN = 24; // px of guaranteed spacing around each card (20px-30px gap)

  function tick(now) {
    if (lastTime === null) lastTime = now;
    var dt = (now - lastTime) / 1000;
    lastTime = now;
    if (dt > 0.05) dt = 0.05;

    var isMobile = (window.innerWidth <= 768);

    // 1. Frame-rate independent responsive input interpolation (~25ms latency)
    var inputLerpFactor = Math.min(1.0, 30.0 * dt);
    smoothInputX += (targetInputX - smoothInputX) * inputLerpFactor;
    smoothInputY += (targetInputY - smoothInputY) * inputLerpFactor;

    // 2. Smoothly decay input influence on release (seamless fade, no jumping)
    if (isInputActive) {
      inputInfluence += (1.0 - inputInfluence) * Math.min(1.0, 20.0 * dt);
    } else {
      inputInfluence += (0.0 - inputInfluence) * Math.min(1.0, 2.5 * dt);
      inputVelocityX += (0.0 - inputVelocityX) * Math.min(1.0, 3.5 * dt);
      inputVelocityY += (0.0 - inputVelocityY) * Math.min(1.0, 3.5 * dt);
    }

    // 3. 2D Steering Vector (360-degree virtual controller)
    var relX = smoothInputX - centerX;
    var relY = smoothInputY - centerY;
    var rawDist = Math.sqrt(relX * relX + relY * relY);
    var dist = rawDist || 1;

    var dirX = relX / dist;
    var dirY = relY / dist;

    // Distance curve: balanced force modulation from center to edges
    var maxRadius = Math.max(100, Math.min(W, H) * 0.45);
    var distRatio = Math.min(1.0, rawDist / maxRadius);
    var distForce = 0.45 + 0.55 * (distRatio * distRatio);

    // Dynamic swipe velocity steering
    var fingerSpeed = Math.hypot(inputVelocityX, inputVelocityY);
    var targetSteerX = dirX;
    var targetSteerY = dirY;
    if (fingerSpeed > 30) {
      targetSteerX = inputVelocityX / fingerSpeed;
      targetSteerY = inputVelocityY / fingerSpeed;
    }

    // Continuously rotate mobile heading toward finger direction (immediate response)
    if (isInputActive) {
      mobileHeadingX += (targetSteerX - mobileHeadingX) * Math.min(1.0, 16.0 * dt);
      mobileHeadingY += (targetSteerY - mobileHeadingY) * Math.min(1.0, 16.0 * dt);
      var hLen = Math.hypot(mobileHeadingX, mobileHeadingY) || 1;
      mobileHeadingX /= hLen;
      mobileHeadingY /= hLen;
    }

    var i, b;

    for (i = 0; i < bodies.length; i++) {
      b = bodies[i];

      var targetVx, targetVy;

      if (isMobile) {
        // Fast & Responsive Mobile 2D Infinite Travel (~2.5x speed boost):
        // Active steering speed (~320-400px/s) -> Cruise floating speed (~110px/s)
        var activeSpeed = b.baseSpeed * (14.0 + Math.min(4.0, fingerSpeed / 120));
        var cruiseSpeed = b.baseSpeed * 5.0;
        var currentSpeed = cruiseSpeed * (1.0 - inputInfluence) + activeSpeed * inputInfluence;

        targetVx = mobileHeadingX * currentSpeed;
        targetVy = mobileHeadingY * currentSpeed;

        // Immediate responsive physical acceleration toward target velocity
        b.vx += (targetVx - b.vx) * (8.5 * dt);
        b.vy += (targetVy - b.vy) * (8.5 * dt);
      } else {
        // Desktop Physics (100% untouched desktop behavior)
        var desktopStrength = b.baseSpeed * 2.8;
        var effForceX = dirX * distForce;
        var effForceY = dirY * distForce;
        targetVx = b.baseVx * (1.0 - inputInfluence) + (effForceX * desktopStrength) * inputInfluence;
        targetVy = b.baseVy * (1.0 - inputInfluence) + (effForceY * desktopStrength) * inputInfluence;

        b.vx += (targetVx - b.vx) * (2.5 * dt);
        b.vy += (targetVy - b.vy) * (2.5 * dt);

        var curSpeed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        var minSpeed = Math.max(14, b.baseSpeed * 0.7);
        if (curSpeed < minSpeed && curSpeed > 0.001) {
          var speedFactor = minSpeed / curSpeed;
          b.vx += (b.vx * speedFactor - b.vx) * Math.min(1.0, 3.5 * dt);
          b.vy += (b.vy * speedFactor - b.vy) * Math.min(1.0, 3.5 * dt);
        }
      }

      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }

    // 4. Infinite 2D Wrap-Around Canvas (Multi-axis, Safe Buffer, Zero Flicker)
    var BUFFER = 32; // px buffer so cards completely exit before re-entering
    for (i = 0; i < bodies.length; i++) {
      b = bodies[i];
      if (b.x > W + BUFFER) {
        b.x = -b.w - BUFFER + 1;
      } else if (b.x < -b.w - BUFFER) {
        b.x = W + BUFFER - 1;
      }
      if (b.y > H + BUFFER) {
        b.y = -b.h - BUFFER + 1;
      } else if (b.y < -b.h - BUFFER) {
        b.y = H + BUFFER - 1;
      }
    }

    // Soft card separation (continuous relaxation, zero teleporting/snapping)
    var relaxRate = Math.min(1.0, 5.0 * dt);
    for (i = 0; i < bodies.length; i++) {
      for (var j = i + 1; j < bodies.length; j++) {
        var a = bodies[i], c = bodies[j];
        var m = CARD_MARGIN;
        var ax1 = a.x - m, ay1 = a.y - m, ax2 = a.x + a.w + m, ay2 = a.y + a.h + m;
        var cx1 = c.x - m, cy1 = c.y - m, cx2 = c.x + c.w + m, cy2 = c.y + c.h + m;

        if (rectsOverlap(ax1, ay1, ax2, ay2, cx1, cy1, cx2, cy2)) {
          var overlapX = Math.min(ax2, cx2) - Math.max(ax1, cx1);
          var overlapY = Math.min(ay2, cy2) - Math.max(ay1, cy1);

          if (overlapX < overlapY) {
            var pushX = overlapX * 0.5 * relaxRate;
            if (a.x < c.x) { a.x -= pushX; c.x += pushX; }
            else { a.x += pushX; c.x -= pushX; }
          } else {
            var pushY = overlapY * 0.5 * relaxRate;
            if (a.y < c.y) { a.y -= pushY; c.y += pushY; }
            else { a.y += pushY; c.y -= pushY; }
          }
        }
      }
    }

    render(now / 1000);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/* ── Hero Typewriter Headline Animation ── */
(function() {
  "use strict";

  var targetEl = document.getElementById("hero-typewriter-text");
  if (!targetEl) return;

  var services = [
    "Branding",
    "SEO & GMB",
    "Influencer Marketing",
    "Performance Marketing",
    "Social Media Management",
    "Web Design & Development"
  ];

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var activeTimer = null;

  var PAUSE_AFTER_TYPED = 1800; // ~1.8s pause when full word is typed
  var PAUSE_BEFORE_TYPE = 350;  // ~0.35s pause before typing next word

  function getTypingDelay(char) {
    if (char === ' ' || char === '&') {
      return 110 + Math.random() * 40; // Slight pause on word boundaries
    }
    return 45 + Math.random() * 35; // 45-80ms per character
  }

  function getDeletingDelay() {
    return 25 + Math.random() * 15; // 25-40ms per character
  }

  if (reduceMotion) {
    targetEl.textContent = services[currentIndex];
    setInterval(function() {
      currentIndex = (currentIndex + 1) % services.length;
      targetEl.textContent = services[currentIndex];
    }, 3200);
    return;
  }

  function typeLoop() {
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }

    var currentText = services[currentIndex];

    if (isDeleting) {
      charIndex--;
      targetEl.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      targetEl.textContent = currentText.substring(0, charIndex);
    }

    var delay = 50;

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      delay = PAUSE_AFTER_TYPED;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % services.length;
      delay = PAUSE_BEFORE_TYPE;
    } else if (isDeleting) {
      delay = getDeletingDelay();
    } else {
      var lastChar = currentText.charAt(charIndex - 1);
      delay = getTypingDelay(lastChar);
    }

    activeTimer = setTimeout(typeLoop, delay);
  }

  targetEl.textContent = "";
  activeTimer = setTimeout(typeLoop, 450);
})();

/* ── Interactive Hero Canvas Ribbon (Wide Liquid Silk #00cc33) ── */
(function() {
  "use strict";

  var hero = document.querySelector(".dr-hero");
  var canvas = document.getElementById("dr-hero-trail-canvas");
  if (!hero || !canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (reduceMotion) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var width = 0, height = 0;
  function resize() {
    var rect = hero.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener("resize", resize);

  var MAX_POINTS = 30; // ~200-250px max trail length
  var history = [];
  var targetX = width / 2;
  var targetY = height / 2;
  var currentX = targetX;
  var currentY = targetY;
  var lastAddedX = -9999;
  var lastAddedY = -9999;
  var lastMoveTime = 0;
  var initialized = false;
  var isHovered = false;

  function onMouseMove(e) {
    var rect = hero.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    lastMoveTime = Date.now();

    if (!initialized) {
      currentX = targetX;
      currentY = targetY;
      initialized = true;
    }
    isHovered = true;
  }

  function onMouseEnter() { isHovered = true; }
  function onMouseLeave() { isHovered = false; history = []; }

  function onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      onMouseMove(e.touches[0]);
    }
  }

  hero.addEventListener("mousemove", onMouseMove, { passive: true });
  hero.addEventListener("mouseenter", onMouseEnter, { passive: true });
  hero.addEventListener("mouseleave", onMouseLeave, { passive: true });
  hero.addEventListener("touchstart", onTouchMove, { passive: true });
  hero.addEventListener("touchmove", onTouchMove, { passive: true });
  hero.addEventListener("touchend", onMouseLeave, { passive: true });
  hero.addEventListener("touchcancel", onMouseLeave, { passive: true });

  function renderTrail() {
    ctx.clearRect(0, 0, width, height);

    var now = Date.now();
    // Only generate new trail points while active mouse motion is detected (within 50ms and distance >= 1.8px)
    var isMouseMoving = isHovered && (now - lastMoveTime < 50) && (Math.hypot(targetX - currentX, targetY - currentY) >= 1.5);

    if (initialized) {
      if (isMouseMoving) {
        // Lerp lead point toward cursor
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;

        // Add new point ONLY if cursor has moved >= 2.0px from last point
        if (Math.hypot(currentX - lastAddedX, currentY - lastAddedY) >= 2.0 || history.length === 0) {
          history.unshift({ x: currentX, y: currentY });
          lastAddedX = currentX;
          lastAddedY = currentY;
          if (history.length > MAX_POINTS) {
            history.pop();
          }
        }
      } else {
        // Stationary / Idle: Stop drawing new points at same position.
        // Dissolve existing trail by popping oldest point frame by frame
        if (history.length > 0) {
          history.pop();
        }
      }

      var len = history.length;

      if (len >= 2) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Render densely interpolated radial gradient circles along active history points only
        for (var i = 0; i < len - 1; i++) {
          var p1 = history[i];
          var p2 = history[i + 1];

          var t1 = i / len;
          var t2 = (i + 1) / len;

          var dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          var steps = Math.max(2, Math.ceil(dist / 3));

          for (var s = 0; s < steps; s++) {
            var subT = s / steps;
            var x = p1.x + (p2.x - p1.x) * subT;
            var y = p1.y + (p2.y - p1.y) * subT;

            var progress = t1 + (t2 - t1) * subT; // 0 at head, 1 at tail

            // Ribbon Radius Profile: Head (~45px) -> Wide Body (~145px / 290px width) -> Tail (~4px)
            var radius;
            if (progress < 0.2) {
              radius = 45 + (145 - 45) * (progress / 0.2);
            } else {
              radius = Math.max(4, 145 * Math.pow(1 - (progress - 0.2) / 0.8, 1.2));
            }

            // Opacity decays from head to tail, also factoring remaining history count
            var fadeFactor = Math.min(1, len / 10);
            var alpha = (1 - progress) * 0.22 * fadeFactor;

            if (alpha <= 0.001 || radius <= 0) continue;

            // Pure Brand Green #00cc33 Radial Gradient ONLY
            var grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, "rgba(0, 204, 51, " + alpha.toFixed(3) + ")");
            grad.addColorStop(0.5, "rgba(0, 204, 51, " + (alpha * 0.5).toFixed(3) + ")");
            grad.addColorStop(1, "rgba(0, 204, 51, 0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }
    }

    requestAnimationFrame(renderTrail);
  }

  requestAnimationFrame(renderTrail);
})();

/* ── Hero Reel Video Modal Handler (Embedded YouTube Shorts) ── */
(function() {
  "use strict";

  var modal = document.getElementById("dr-reel-video-modal");
  var backdrop = document.getElementById("dr-reel-video-backdrop");
  var closeBtn = document.getElementById("dr-reel-video-close");
  var iframe = document.getElementById("dr-reel-video-iframe");
  if (!modal || !iframe) return;

  function openVideoModal(videoId) {
    if (!videoId) return;
    iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(videoId) + "?autoplay=1&rel=0";
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
  cards.forEach(function(card) {
    card.addEventListener("click", function(e) {
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
    closeBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeVideoModal();
    });
  }

  // Backdrop click
  if (backdrop) {
    backdrop.addEventListener("click", function(e) {
      e.preventDefault();
      closeVideoModal();
    });
  }

  // ESC key
  window.addEventListener("keydown", function(e) {
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
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    if (heroTitle) {
      tl.fromTo(
        heroTitle,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      );
    }

    if (heroGraphics.length) {
      tl.fromTo(
        heroGraphics,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.6"
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
            toggleActions: "play none none none"
          }
        }
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
            toggleActions: "play none none none"
          }
        }
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

      const currentBtn = container.querySelector(`.srv-tab-btn[data-tab="${currentActiveTab}"]`);
      const targetBtn = container.querySelector(`.srv-tab-btn[data-tab="${targetKey}"]`);
      const currentPanel = container.querySelector(`.srv-tab-panel[data-panel="${currentActiveTab}"]`);
      const targetPanel = container.querySelector(`.srv-tab-panel[data-panel="${targetKey}"]`);

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
                }
              }
            );
          }
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
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var transitionSections = document.querySelectorAll('.editorial-block-transition');
  if (!transitionSections.length) return;

  transitionSections.forEach(function (sec, idx) {
    // Determine the color of the preceding field to be revealed from
    var isToWhite = sec.classList.contains('transition-to-white');
    var isToBlack = sec.classList.contains('transition-to-black');
    var fillColor = isToWhite ? "#000000" : (isToBlack ? "#ffffff" : "#000000");

    // Remove any existing plane if re-initialized
    var existingPlane = sec.querySelector('.editorial-architectural-plane');
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

    var filterId = "greenEdgeGlow_" + idx + "_" + Math.random().toString(36).substr(2, 6);

    plane.innerHTML =
      '<defs>' +
        '<filter id="' + filterId + '" x="-40%" y="-20%" width="180%" height="140%">' +
          '<feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#00CC33" flood-opacity="0.35"/>' +
        '</filter>' +
      '</defs>' +
      '<polygon points="0,0 1000,0 965,1000 0,1000" fill="' + fillColor + '" />' +
      '<line x1="1000" y1="0" x2="965" y2="1000" stroke="#00CC33" stroke-width="2.5" vector-effect="non-scaling-stroke" filter="url(#' + filterId + ')" />';

    sec.appendChild(plane);

    // Initial position: if section is already above the viewport on initial load, place offscreen
    var rect = sec.getBoundingClientRect();
    var initialX = (rect.top < window.innerHeight * 0.25) ? 101 : 0;

    // Bind scroll progress directly to the architectural reveal plane
    gsap.fromTo(plane,
      { xPercent: initialX },
      {
        xPercent: 101,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top 95%",
          end: "top 25%",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      }
    );
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    // Slight delay to ensure layout and other ScrollTriggers are ready
    setTimeout(initEditorialBlockTransitions, 50);
  });
} else {
  setTimeout(initEditorialBlockTransitions, 50);
}






