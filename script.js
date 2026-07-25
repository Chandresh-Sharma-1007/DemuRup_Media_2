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
document
  .querySelectorAll("a,button,.check-item,.bcard,.step-card,.tcard,.ind-pill")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cur, { width: 18, height: 18, duration: 0.2 });
      gsap.to(ring, { width: 52, height: 52, duration: 0.2 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cur, { width: 10, height: 10, duration: 0.2 });
      gsap.to(ring, { width: 34, height: 34, duration: 0.2 });
    });
  });

// ── Shared Fullscreen Navigation Menu Component ─────────────────
const MENU_OVERLAY_HTML = `
<div id="dr-menu-overlay" class="dr-menu-overlay" aria-hidden="true">
  <div class="dr-menu-container">
    <div class="dr-menu-content">
      <!-- Left Column: Large Bold Links -->
      <div class="dr-menu-left">
        <ul class="dr-menu-links">
          <li class="dr-menu-item"><a href="index.html#about" class="dr-menu-link">About</a></li>
          <li class="dr-menu-item dr-menu-item-services">
            <a href="index.html#services" class="dr-menu-link dr-services-trigger" id="dr-services-toggle" aria-expanded="false">
              Services <span class="dr-services-arrow dr-services-arrow-desktop" aria-hidden="true">→</span><span class="dr-services-arrow dr-services-arrow-mobile" aria-hidden="true">↓</span>
            </a>
            <!-- Mobile/Tablet Accordion Dropdown -->
            <div class="dr-services-accordion" id="dr-services-accordion" aria-hidden="true">
              <ul class="dr-services-accordion-list">
                <li><a href="Branding.html" class="dr-service-item-link">Branding</a></li>
                <li><a href="SEO & GMB.html" class="dr-service-item-link">SEO & GMB</a></li>
                <li><a href="Influencer Marketing.html" class="dr-service-item-link">Influencer Marketing</a></li>
                <li><a href="Performance Marketing.html" class="dr-service-item-link">Performance Marketing</a></li>
                <li><a href="Social Media Management.html" class="dr-service-item-link">Social Media Management</a></li>
                <li><a href="Web Design & Development.html" class="dr-service-item-link">Web Design & Development</a></li>
              </ul>
            </div>
          </li>
          <li class="dr-menu-item"><a href="index.html#portfolio" class="dr-menu-link">Portfolio</a></li>
          <li class="dr-menu-item"><a href="blog.html" class="dr-menu-link">Blog</a></li>
          <li class="dr-menu-item"><a href="index.html#clients" class="dr-menu-link">Clients</a></li>
          <li class="dr-menu-item"><a href="index.html#contact-section" class="dr-menu-link">Contact</a></li>
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
            <li><a href="Branding.html" class="dr-service-item-link">Branding</a></li>
            <li><a href="SEO & GMB.html" class="dr-service-item-link">SEO & GMB</a></li>
            <li><a href="Influencer Marketing.html" class="dr-service-item-link">Influencer Marketing</a></li>
            <li><a href="Performance Marketing.html" class="dr-service-item-link">Performance Marketing</a></li>
            <li><a href="Social Media Management.html" class="dr-service-item-link">Social Media Management</a></li>
            <li><a href="Web Design & Development.html" class="dr-service-item-link">Web Design & Development</a></li>
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
}
initMenuOverlay();

// ── Hero headline ──────────────────────────────────────────
const h1 = document.getElementById("hero-h1");
if (h1) {
  const lines = h1.innerHTML.split("<br>");
  h1.innerHTML = lines
    .map(
      (l) =>
        `<span style="display:block;overflow:hidden"><span class="hline" style="display:block">${l}</span></span>`,
    )
    .join("");
  gsap.from(".hline", {
    yPercent: 108,
    opacity: 0,
    stagger: 0.11,
    duration: 1.05,
    ease: "power4.out",
    delay: 0.25,
  });
}

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

// ── Smart Nav scroll behavior ─────────────────────────────
(function initSmartNavScroll() {
  const mainNav = document.getElementById("main-nav");
  if (!mainNav) return;

  let lastScrollY = window.scrollY;
  let scrollStopTimer = null;
  const SCROLL_THRESHOLD = 5;
  const STOP_TIMEOUT = 400; // Auto-reveal nav after 400ms pause

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      // Update border color based on scroll position
      mainNav.style.borderBottomColor = currentScrollY > 60 ? "#161616" : "#1e1e1e";

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
    { opacity: 1, duration: 0.4, ease: "power2.out" }
  );

  // Stagger links fading upward
  gsap.fromTo(menuLinks,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 0.1 }
  );

  // Stagger right column items fading upward
  gsap.fromTo(menuRightItems,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.25 }
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

  // Fade links downward/out
  gsap.to(menuLinks, {
    opacity: 0,
    y: 15,
    duration: 0.35,
    stagger: 0.04,
    ease: "power2.in",
  });

  // Fade right column items out
  gsap.to(menuRightItems, {
    opacity: 0,
    y: 10,
    duration: 0.3,
    stagger: 0.03,
    ease: "power2.in"
  });

  // Fade out the overlay
  gsap.to(menuOverlay, {
    opacity: 0,
    duration: 0.4,
    delay: 0.2,
    ease: "power2.inOut",
    onComplete: () => {
      menuOverlay.classList.remove("open");
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
    // Smooth scroll to contact
    const target = document.getElementById("contact-section");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
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
