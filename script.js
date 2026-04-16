
  gsap.registerPlugin(ScrollTrigger);

  // ── Custom cursor ──────────────────────────────────────────
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.set(cur, { x: mx, y: my });
  });
  (function animRing() {
    rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.check-item,.bcard,.step-card,.tcard,.ind-pill').forEach(el => {
    el.addEventListener('mouseenter', () => { gsap.to(cur,{width:18,height:18,duration:.2}); gsap.to(ring,{width:52,height:52,duration:.2}); });
    el.addEventListener('mouseleave', () => { gsap.to(cur,{width:10,height:10,duration:.2}); gsap.to(ring,{width:34,height:34,duration:.2}); });
  });

  // ── Hero headline ──────────────────────────────────────────
  const h1 = document.getElementById('hero-h1');
  if (h1) {
    const lines = h1.innerHTML.split('<br>');
    h1.innerHTML = lines.map(l => `<span style="display:block;overflow:hidden"><span class="hline" style="display:block">${l}</span></span>`).join('');
    gsap.from('.hline', { yPercent: 108, opacity:0, stagger:.11, duration:1.05, ease:'power4.out', delay:.25 });
  }

  // ── Scroll reveals ─────────────────────────────────────────
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity:0, y:46 }, {
      opacity:1, y:0, duration:.85, ease:'power3.out',
      delay:(i%3)*.07,
      scrollTrigger: { trigger:el, start:'top 88%', toggleActions:'play none none none' }
    });
  });

  // ── Counter ────────────────────────────────────────────────
  document.querySelectorAll('[data-count]').forEach(el => {
    const t = +el.getAttribute('data-count');
    ScrollTrigger.create({ trigger:el, start:'top 90%', once:true, onEnter() {
      gsap.to({v:0},{v:t,duration:2.2,ease:'power2.out',onUpdate(){el.textContent=Math.round(this.targets()[0].v)+'+'}});
    }});
  });

  // ── Nav scroll ─────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    document.getElementById('main-nav').style.borderBottomColor = window.scrollY > 60 ? '#161616' : '#1e1e1e';
  }, { passive:true });

  // ── Mobile menu ────────────────────────────────────────────
  const hmb = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');
  let mOpen = false;
  hmb.addEventListener('click', () => {
    mOpen = !mOpen;
    mob.classList.toggle('open', mOpen);
    document.getElementById('h1').style.cssText = mOpen ? 'transform:rotate(45deg) translate(4px,4px)' : '';
    document.getElementById('h2').style.opacity = mOpen ? '0' : '1';
    document.getElementById('h3').style.cssText = mOpen ? 'transform:rotate(-45deg) translate(4px,-4px)' : '';
  });
  document.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => {
    mOpen = false; mob.classList.remove('open');
    ['h1','h2','h3'].forEach(id => { document.getElementById(id).style.cssText = ''; });
  }));

  // ── Smooth anchor scroll ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // ── Checkboxes ─────────────────────────────────────────────
  function toggleCheck(el) {
    el.classList.toggle('selected');
    const icon = el.querySelector('.check-icon');
    if (icon) icon.style.display = el.classList.contains('selected') ? 'block' : 'none';
  }

  // ── Form submit ────────────────────────────────────────────
  function submitForm() {
    const name = document.getElementById('f-name').value.trim();
    const brand = document.getElementById('f-brand').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    if (!name || !brand || !phone) {
      // Shake empty fields
      [['f-name',name],['f-brand',brand],['f-phone',phone]].forEach(([id,val]) => {
        if (!val) {
          const el = document.getElementById(id);
          el.style.borderColor = '#ff4444';
          el.style.animation = 'none';
          setTimeout(()=>{ el.style.borderColor=''; }, 2000);
        }
      });
      return;
    }
    document.getElementById('contact-form-wrap').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }

  // ── Testimonial slider ─────────────────────────────────────
  let curSlide = 0;
  const track = document.getElementById('tslider-track');
  const totalSlides = track ? track.children.length : 1;
  function goSlide(n) {
    curSlide = (n + totalSlides) % totalSlides;
    if(track) track.style.transform = `translateX(-${curSlide*100}%)`;
  }
  function nextSlide() { goSlide(curSlide+1); }
  function prevSlide() { goSlide(curSlide-1); }
  setInterval(nextSlide, 6000);

  // ══════════════════════════════════════════════════════════════
  //  DEMURUP SMART POPUP — Full Logic
  // ══════════════════════════════════════════════════════════════

  (function() {
    // ── State ──────────────────────────────────────────────────
    const SESSION_KEY_CLOSED  = 'dr_popup_x_closed';   // X clicked: hide entire session
    const SESSION_KEY_LATER   = 'dr_popup_later_ts';   // "Maybe later" timestamp

    const overlay  = document.getElementById('dr-popup-overlay');
    const badge    = document.getElementById('dr-reappear-badge');
    const cntEl    = document.getElementById('dr-badge-countdown');
    const timerCircle = document.getElementById('dr-timer-circle');

    let userHasInteracted = false;
    let laterTimer        = null;
    let autoTimer         = null;
    let timerCountdown    = null;
    let ringTimer         = null;
    let ringVal           = 75.4; // full circumference
    let badgeInterval     = null;

    // ── Track first interaction (for audio autoplay) ───────────
    const markInteraction = () => { userHasInteracted = true; };
    ['click','scroll','keydown','touchstart','mousemove'].forEach(ev =>
      document.addEventListener(ev, markInteraction, { once:true, passive:true })
    );

    // ── Synthesised "pop" sound via Web Audio API ──────────────
    function playPopSound() {
      if (!userHasInteracted) return; // respect browser autoplay policy
      try {
        // ── PRIMARY: use the provided _popping_up.mp3 file ────
        const sfx = new Audio('_popping_up.mp3');
        sfx.volume = 0.65;
        const playPromise = sfx.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If .mp3 fails (file missing / policy), fall through to Web Audio
            playWebAudioFallback();
          });
        }
      } catch(e) {
        // Silently fail and try synthesised fallback
        playWebAudioFallback();
      }
    }

    // ── FALLBACK: synthesised pop via Web Audio API ─────────────
    function playWebAudioFallback() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();

        // Layer 1: short sine pop
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
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
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1200, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
        gain2.gain.setValueAtTime(0.08, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.05);
      } catch(e) {
        console.warn('[DemuRup Popup] Audio unavailable:', e.message);
      }
    }

    // ── Confetti burst on open ─────────────────────────────────
    function spawnConfetti() {
      const modal = document.getElementById('dr-popup-modal');
      const colors = ['#00cc33','#00ff44','#ffffff','#00aa29'];
      for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        el.className = 'dr-confetti';
        el.style.cssText = `
          left: ${20 + Math.random()*60}%;
          top: ${10 + Math.random()*30}%;
          background: ${colors[i%colors.length]};
          width: ${3+Math.random()*5}px;
          height: ${3+Math.random()*5}px;
          animation-delay: ${Math.random()*0.3}s;
          animation-duration: ${0.7+Math.random()*0.5}s;
        `;
        modal.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
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
    window.drShowModal = function() {
      // Don't show if X was clicked this session
      if (sessionStorage.getItem(SESSION_KEY_CLOSED)) return;

      // Hide badge if visible
      badge.style.display = 'none';
      clearInterval(badgeInterval);
      if (cntEl) cntEl.textContent = '30';

      // Show
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden'; // prevent scroll behind

      // Sound
      playPopSound();

      // Confetti
      setTimeout(spawnConfetti, 150);

      // Ring countdown (20s)
      startRingCountdown(20);
    };

    // ── Hide modal (shared) ────────────────────────────────────
    function drHide() {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
      clearInterval(ringTimer);
    }

    // ── Close X: hide for entire session ──────────────────────
    window.drCloseX = function() {
      drHide();
      sessionStorage.setItem(SESSION_KEY_CLOSED, '1');
      badge.style.display = 'none';
      clearTimeout(laterTimer);
      clearTimeout(autoTimer);
    };

    // ── Maybe Later: hide → reshow after 30s ──────────────────
    window.drMaybeLater = function() {
      drHide();

      // Show the countdown badge
      let remaining = 80;
      badge.style.display = 'block';
      if (cntEl) cntEl.textContent = remaining;

      clearInterval(badgeInterval);
      badgeInterval = setInterval(() => {
        remaining--;
        if (cntEl) cntEl.textContent = remaining;
        if (remaining <= 0) {
          clearInterval(badgeInterval);
          badge.style.display = 'none';
          drShowModal();
        }
      }, 1000);
    };

    // ── CTA click: go to contact & close ──────────────────────
    window.drCtaClick = function(e) {
      e.preventDefault();
      drHide();
      sessionStorage.setItem(SESSION_KEY_CLOSED, '1'); // don't re-show after CTA
      badge.style.display = 'none';
      clearTimeout(laterTimer);
      clearTimeout(autoTimer);
      // Smooth scroll to contact
      const target = document.getElementById('contact-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // ── Click backdrop to dismiss (acts like X) ────────────────
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) drCloseX();
    });

    // ── Keyboard ESC closes (acts like X) ─────────────────────
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) drCloseX();
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

