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
  // 1. Get values from the inputs
  const name = document.getElementById('f-name').value.trim();
  const brand = document.getElementById('f-brand').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const budget = document.getElementById('f-budget').value;
  const challenge = document.getElementById('f-challenge').value;
  const timeline = document.getElementById('f-timeline').value;

  // 2. Validation (The "Shake" logic you already had)
  if (!name || !brand || !phone) {
    [['f-name', name], ['f-brand', brand], ['f-phone', phone]].forEach(([id, val]) => {
      if (!val) {
        const el = document.getElementById(id);
        el.style.borderColor = '#ff4444';
        el.style.animation = 'none';
        setTimeout(() => { el.style.borderColor = ''; }, 2000);
      }
    });
    return;
  }

  // 3. Collect selected checkboxes (based on your toggleCheck function)
  const selectedServices = [];
  document.querySelectorAll('.check-item.selected').forEach(item => {
    selectedServices.push(item.innerText.trim());
  });

  // 4. Prepare the Google Form Data (REPLACE THE ENTRY IDs BELOW)
  const formData = new URLSearchParams();
  formData.append('entry.1111111111', name);       // Replace with Name ID
  formData.append('entry.2222222222', brand);      // Replace with Brand ID
  formData.append('entry.3333333333', phone);      // Replace with Phone ID
  formData.append('entry.4444444444', budget);     // Replace with Budget ID
  formData.append('entry.5555555555', selectedServices.join(', ')); // Replace with Services ID
  formData.append('entry.6666666666', challenge);  // Replace with Challenge ID
  formData.append('entry.7777777777', timeline);   // Replace with Timeline ID

  // 5. Send to Google Form (REPLACE THE URL BELOW)
  const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID_HERE/formResponse";

  fetch(googleFormUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  }).then(() => {
    // 6. Show Success UI
    document.getElementById('contact-form-wrap').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }).catch(err => {
    console.error("Submission error:", err);
  });
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

  // Auto-advance testimonials every 6s
  setInterval(nextSlide, 6000);
