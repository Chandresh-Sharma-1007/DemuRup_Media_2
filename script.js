
  gsap.registerPlugin(ScrollTrigger);

  // ── Custom Cursor ────────────────────────────────
  const cursorEl = document.getElementById('cursor');
  const followerEl = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.set(cursorEl, { x: mx, y: my });
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.11;
    fy += (my - fy) * 0.11;
    gsap.set(followerEl, { x: fx, y: fy });
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursorEl, { width: 20, height: 20, duration: 0.2 });
      gsap.to(followerEl, { width: 56, height: 56, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursorEl, { width: 12, height: 12, duration: 0.2 });
      gsap.to(followerEl, { width: 36, height: 36, duration: 0.2 });
    });
  });

  // ── Hero Headline entrance ─────────────────────
  const h1 = document.getElementById('hero-h1');
  if (h1) {
    const raw = h1.innerHTML;
    const lines = raw.split('<br>');
    h1.innerHTML = lines.map(l =>
      `<span style="display:block;overflow:hidden;"><span class="hero-line" style="display:block;">${l}</span></span>`
    ).join('');
    gsap.from('.hero-line', {
      yPercent: 105, opacity: 0, stagger: 0.13, duration: 1.05,
      ease: 'power4.out', delay: 0.25
    });
  }

  // ── Scroll Reveals ────────────────────────────
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0, duration: 0.85,
        ease: 'power3.out',
        delay: (i % 3) * 0.07,
        scrollTrigger: {
          trigger: el, start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Counter ────────────────────────────────────
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.getAttribute('data-count');
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter() {
        gsap.to({ val: 0 }, {
          val: target, duration: 2.2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].val) + '+'; }
        });
      }
    });
  });

  // ── Mobile Nav ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let open = false;
  hamburger.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    document.getElementById('h1').style.cssText = open ? 'transform:rotate(45deg) translate(4px,4px)' : '';
    document.getElementById('h2').style.opacity = open ? '0' : '1';
    document.getElementById('h3').style.cssText = open ? 'transform:rotate(-45deg) translate(4px,-4px)' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
    open = false; mobileMenu.classList.remove('open');
    ['h1','h2','h3'].forEach(id => { document.getElementById(id).style.cssText = ''; });
  }));

  // ── Smooth scroll ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Nav border on scroll ──────────────────────
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.borderBottomColor =
      window.scrollY > 60 ? '#1a1a1a' : '#222';
  }, { passive: true });
