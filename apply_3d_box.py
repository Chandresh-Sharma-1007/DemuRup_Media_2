# -*- coding: utf-8 -*-
import os

# 1. Update index.html
html_path = r"c:\Users\Chandresh\Desktop\Work\DemuRup\DemuRup media final\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Locate section #about
about_start = html_content.find('<section id="about"')
about_end = html_content.find('</section>', about_start) + len('</section>')

new_about_section = '''  <section id="about" class="editorial-block-transition transition-to-white transition-angled" data-theme="light">
    <div class="about-container">
      <div class="about-grid">
        <!-- Left Column: The Statement / Core Copy -->
        <div class="about-col-left">
          <h2 class="about-heading reveal">
            ONE TEAM.<br />ZERO<br /><span class="about-heading-accent">COMPROMISE.</span>
          </h2>
          <p class="about-text reveal">
            DemuRup Media functions as a one-stop shop for digital services,
            focusing on startups, D2C brands, real estate, and finance
            companies.
          </p>
          <p class="about-text reveal">
            We provide a unified brand voice through an integrated team
            approach, ensuring that your brand doesn't just grow—it evolves. By
            redesigning the traditional marketing box, we offer a seamless
            transition from local presence to global reach.
          </p>
          <div class="about-cta-group reveal">
            <a href="#contact-section" class="about-btn-cta">
              <span class="about-btn-text">Work With Us</span>
              <svg class="about-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <span class="about-locale">India → Global</span>
          </div>
        </div>

        <!-- Right Column: Manifesto + 3D Animated "Redesign the Box" Visual -->
        <div class="about-col-right reveal">
          <!-- Manifesto Card -->
          <div class="about-manifesto-card">
            <div class="about-manifesto-badge">
              <span class="about-badge-dot"></span>
              <span class="about-badge-text">MANIFESTO</span>
            </div>
            <p class="about-manifesto-quote">
              "WE DON'T JUST THINK OUTSIDE THE BOX — <span class="about-quote-accent">WE REDESIGN IT.</span>"
            </p>
          </div>

          <!-- 3D "Redesign the Box" Animated Visual Stage -->
          <div class="about-3d-stage" id="about-3d-stage" role="img" aria-label="3D animated black cube opening and exploding into a green neon wireframe polyhedron and floating geometric shards">
            <!-- Stage Blueprint Drafting Background -->
            <div class="about-3d-backdrop" aria-hidden="true">
              <div class="about-3d-grid-lines"></div>
              <span class="about-3d-tag about-3d-tag-tl">SYS // 01-BOX</span>
              <span class="about-3d-tag about-3d-tag-tr">DECONSTRUCT → REBUILD</span>
              <span class="about-3d-tag about-3d-tag-bl">COORD: 3D.GEO.04</span>
              <span class="about-3d-tag about-3d-tag-br">STATUS: REDESIGNED</span>
            </div>

            <!-- SVG 3D Deconstructed Box & Exploding Wireframe Polyhedron -->
            <svg class="about-3d-svg" viewBox="0 0 680 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <!-- Neon Green Glow Filters -->
                <filter id="dr-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur1" />
                  <feGaussianBlur stdDeviation="10" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="dr-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <!-- Box Gradients -->
                <linearGradient id="dr-box-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2a2a2a" />
                  <stop offset="100%" stop-color="#121212" />
                </linearGradient>
                <linearGradient id="dr-box-front" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#1f1f1f" />
                  <stop offset="100%" stop-color="#0a0a0a" />
                </linearGradient>
                <linearGradient id="dr-box-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#050505" />
                  <stop offset="100%" stop-color="#001a08" />
                </linearGradient>
                <linearGradient id="dr-lid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#333333" />
                  <stop offset="100%" stop-color="#151515" />
                </linearGradient>
                <!-- Polyhedron Glow Gradient -->
                <radialGradient id="dr-core-burst" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(0, 204, 51, 0.45)" />
                  <stop offset="60%" stop-color="rgba(0, 204, 51, 0.1)" />
                  <stop offset="100%" stop-color="rgba(0, 204, 51, 0)" />
                </radialGradient>
              </defs>

              <!-- ═══ FLOOR DRAFTING GRID & SHADOWS ═══ -->
              <g class="dr-drafting-floor">
                <!-- Ground Shadows -->
                <ellipse cx="230" cy="365" rx="130" ry="32" fill="rgba(10,10,10,0.09)" />
                <ellipse cx="460" cy="355" rx="140" ry="28" fill="rgba(0,204,51,0.06)" filter="url(#dr-subtle-glow)" />
                
                <!-- Floor Perspective Grid Lines -->
                <line x1="60" y1="365" x2="620" y2="365" stroke="rgba(10,10,10,0.12)" stroke-width="1" stroke-dasharray="4 4" />
                <line x1="120" y1="395" x2="560" y2="395" stroke="rgba(10,10,10,0.08)" stroke-width="1" />
                <line x1="80" y1="335" x2="600" y2="335" stroke="rgba(10,10,10,0.08)" stroke-width="1" stroke-dasharray="2 4" />
                
                <!-- Perspective Ray Lines -->
                <line x1="110" y1="410" x2="230" y2="335" stroke="rgba(10,10,10,0.08)" stroke-width="1" />
                <line x1="330" y1="410" x2="380" y2="335" stroke="rgba(10,10,10,0.08)" stroke-width="1" />
                <line x1="550" y1="410" x2="480" y2="335" stroke="rgba(10,10,10,0.08)" stroke-width="1" />

                <!-- Drafting Dimensions & Markers -->
                <line x1="75" y1="180" x2="75" y2="340" stroke="rgba(10,10,10,0.2)" stroke-width="1" />
                <line x1="70" y1="180" x2="80" y2="180" stroke="rgba(10,10,10,0.2)" stroke-width="1" />
                <line x1="70" y1="340" x2="80" y2="340" stroke="rgba(10,10,10,0.2)" stroke-width="1" />
                <text x="60" y="265" fill="rgba(10,10,10,0.35)" font-family="monospace" font-size="9" transform="rotate(-90 60 265)">h = 160mm</text>
              </g>

              <!-- ═══ AMBIENT ENERGY CONNECTIONS (BOX TO POLYHEDRON) ═══ -->
              <g class="dr-energy-streams" filter="url(#dr-subtle-glow)">
                <line x1="280" y1="240" x2="430" y2="190" stroke="rgba(0,204,51,0.5)" stroke-width="1.2" stroke-dasharray="5 5" class="dr-anim-stream-1" />
                <line x1="260" y1="200" x2="470" y2="140" stroke="rgba(0,204,51,0.6)" stroke-width="1.5" stroke-dasharray="6 4" class="dr-anim-stream-2" />
                <line x1="290" y1="270" x2="490" y2="240" stroke="rgba(0,204,51,0.4)" stroke-width="1" stroke-dasharray="4 6" class="dr-anim-stream-3" />
                <circle cx="470" cy="200" r="90" fill="url(#dr-core-burst)" />
              </g>

              <!-- ═══ THE 3D MATTE BLACK BOX (CUBE) ═══ -->
              <g class="dr-box-assembly" id="dr-box-assembly">
                <!-- Left Outer Face -->
                <polygon points="120,200 210,150 210,310 120,360" fill="url(#dr-box-left)" stroke="#111" stroke-width="1.5" />
                <line x1="120" y1="200" x2="120" y2="360" stroke="#00cc33" stroke-width="1.5" opacity="0.6" />
                
                <!-- Hollow Portal Interior Back & Walls -->
                <polygon points="210,150 330,210 330,370 210,310" fill="url(#dr-box-front)" stroke="#111" stroke-width="1.5" />
                <polygon points="230,195 310,235 310,345 230,305" fill="url(#dr-box-inner)" />
                
                <!-- Glowing Green Neon Inner Seams -->
                <polyline points="230,195 230,305 310,345" stroke="#00cc33" stroke-width="2.5" filter="url(#dr-neon-glow)" />
                <polyline points="230,195 310,235 310,345" stroke="#00cc33" stroke-width="1.5" opacity="0.8" />
                <line x1="230" y1="195" x2="190" y2="175" stroke="#00cc33" stroke-width="1" opacity="0.4" stroke-dasharray="3 3" />
                
                <!-- Inner Neon Energy Core -->
                <circle cx="270" cy="270" r="12" fill="#00cc33" filter="url(#dr-neon-glow)" class="dr-box-core-pulse" />
                <circle cx="270" cy="270" r="5" fill="#ffffff" />

                <!-- Front Outer Bevel Frame Highlights -->
                <line x1="330" y1="210" x2="330" y2="370" stroke="#00cc33" stroke-width="2" filter="url(#dr-neon-glow)" />
                <line x1="210" y1="310" x2="330" y2="370" stroke="#00cc33" stroke-width="2" filter="url(#dr-neon-glow)" />
                <line x1="120" y1="360" x2="210" y2="310" stroke="#222" stroke-width="1.5" />

                <!-- The 3D Lifting Box Lid -->
                <g class="dr-box-lid" id="dr-box-lid">
                  <!-- Lid Top Surface -->
                  <polygon points="110,145 215,90 325,145 220,200" fill="url(#dr-lid-grad)" stroke="#111" stroke-width="1.5" />
                  <!-- Lid Side Thickness -->
                  <polygon points="110,145 220,200 220,212 110,157" fill="#181818" stroke="#111" stroke-width="1" />
                  <polygon points="220,200 325,145 325,157 220,212" fill="#121212" stroke="#111" stroke-width="1" />
                  <!-- Glowing Neon Underside Seam on Lid -->
                  <polyline points="110,157 220,212 325,157" stroke="#00cc33" stroke-width="2.5" filter="url(#dr-neon-glow)" />
                </g>
              </g>

              <!-- ═══ THE EXPLODING WIREFRAME POLYHEDRON (ICOSA CRYSTAL) ═══ -->
              <g class="dr-polyhedron-assembly" id="dr-polyhedron-assembly">
                <!-- Outer Polyhedron Rotating Cage -->
                <g class="dr-polyhedron-spin" id="dr-polyhedron-spin" filter="url(#dr-subtle-glow)">
                  <!-- Facet Planes (Translucent Green) -->
                  <polygon points="460,95 535,140 475,190" fill="rgba(0,204,51,0.08)" stroke="#00cc33" stroke-width="1.6" />
                  <polygon points="460,95 390,145 475,190" fill="rgba(0,204,51,0.05)" stroke="#00cc33" stroke-width="1.6" />
                  <polygon points="390,145 410,230 475,190" fill="rgba(0,204,51,0.1)" stroke="#00cc33" stroke-width="1.8" />
                  <polygon points="475,190 410,230 480,285" fill="rgba(0,204,51,0.06)" stroke="#00cc33" stroke-width="1.6" />
                  <polygon points="475,190 535,140 550,225" fill="rgba(0,204,51,0.12)" stroke="#00cc33" stroke-width="1.8" />
                  <polygon points="475,190 550,225 480,285" fill="rgba(0,204,51,0.08)" stroke="#00cc33" stroke-width="1.6" />
                  <polygon points="535,140 460,95 520,70" fill="rgba(0,204,51,0.04)" stroke="#00cc33" stroke-width="1.4" />
                  <polygon points="460,95 390,145 415,80" fill="rgba(0,204,51,0.04)" stroke="#00cc33" stroke-width="1.4" />
                  <polygon points="390,145 350,185 410,230" fill="rgba(0,204,51,0.07)" stroke="#00cc33" stroke-width="1.6" />
                  <polygon points="410,230 480,285 440,310" fill="rgba(0,204,51,0.05)" stroke="#00cc33" stroke-width="1.4" />
                  <polygon points="480,285 550,225 560,280" fill="rgba(0,204,51,0.05)" stroke="#00cc33" stroke-width="1.4" />
                  <polygon points="550,225 535,140 585,175" fill="rgba(0,204,51,0.06)" stroke="#00cc33" stroke-width="1.5" />

                  <!-- Internal Wireframe Lattice -->
                  <line x1="460" y1="95" x2="480" y2="285" stroke="#00cc33" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7" />
                  <line x1="390" y1="145" x2="550" y2="225" stroke="#00cc33" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7" />
                  <line x1="535" y1="140" x2="410" y2="230" stroke="#00cc33" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7" />

                  <!-- Glowing Vertices Nodes -->
                  <circle cx="460" cy="95" r="3.5" fill="#00cc33" />
                  <circle cx="535" cy="140" r="3.5" fill="#00cc33" />
                  <circle cx="475" cy="190" r="4.5" fill="#ffffff" stroke="#00cc33" stroke-width="2" />
                  <circle cx="390" cy="145" r="3.5" fill="#00cc33" />
                  <circle cx="410" cy="230" r="3.5" fill="#00cc33" />
                  <circle cx="480" cy="285" r="3.5" fill="#00cc33" />
                  <circle cx="550" cy="225" r="3.5" fill="#00cc33" />
                  <circle cx="350" cy="185" r="2.5" fill="#00cc33" />
                  <circle cx="585" cy="175" r="2.5" fill="#00cc33" />
                </g>
              </g>

              <!-- ═══ FLOATING 3D SHARDS & EXPLODING GEOMETRIC PARTICLES ═══ -->
              <g class="dr-shards-cluster" id="dr-shards-cluster">
                <!-- Shard 1: Solid Dark Cube with Green Edge (Upper Right) -->
                <g class="dr-shard dr-shard-1">
                  <polygon points="560,90 580,75 600,85 580,100" fill="#2a2a2a" stroke="#00cc33" stroke-width="1" />
                  <polygon points="560,90 580,100 580,118 560,108" fill="#1a1a1a" />
                  <polygon points="580,100 600,85 600,103 580,118" fill="#111111" stroke="#00cc33" stroke-width="0.8" />
                </g>

                <!-- Shard 2: Pure Neon Rhombus (Far Right) -->
                <g class="dr-shard dr-shard-2" filter="url(#dr-neon-glow)">
                  <polygon points="610,180 635,160 645,190 620,210" fill="rgba(0,204,51,0.25)" stroke="#00cc33" stroke-width="1.8" />
                  <circle cx="627" cy="185" r="2" fill="#ffffff" />
                </g>

                <!-- Shard 3: Solid Black/Green Cube (Lower Right) -->
                <g class="dr-shard dr-shard-3">
                  <polygon points="530,290 555,275 575,290 550,305" fill="#222" stroke="#00cc33" stroke-width="1.2" />
                  <polygon points="530,290 550,305 550,325 530,310" fill="#00cc33" opacity="0.85" />
                  <polygon points="550,305 575,290 575,310 550,325" fill="#111" />
                </g>

                <!-- Shard 4: Small Floating Crystal (Upper Center) -->
                <g class="dr-shard dr-shard-4">
                  <polygon points="430,55 448,40 460,58 442,73" fill="rgba(0,204,51,0.18)" stroke="#00cc33" stroke-width="1.2" />
                  <circle cx="445" cy="56" r="2" fill="#00cc33" />
                </g>

                <!-- Shard 5: Micro Debris & Spark Particles -->
                <g class="dr-shard dr-shard-5" filter="url(#dr-subtle-glow)">
                  <rect x="360" y="110" width="8" height="8" transform="rotate(25 360 110)" fill="#00cc33" />
                  <rect x="510" y="80" width="6" height="6" transform="rotate(45 510 80)" fill="#111" stroke="#00cc33" stroke-width="1" />
                  <rect x="590" y="240" width="9" height="9" transform="rotate(35 590 240)" fill="#00cc33" />
                  <rect x="420" y="270" width="7" height="7" transform="rotate(15 420 270)" fill="#1a1a1a" stroke="#00cc33" stroke-width="0.8" />
                  <circle cx="375" cy="245" r="2.5" fill="#00cc33" />
                  <circle cx="515" cy="330" r="3" fill="#00cc33" />
                  <circle cx="620" cy="130" r="2" fill="#00cc33" />
                  <circle cx="475" cy="32" r="2.5" fill="#00cc33" />
                </g>
              </g>
            </svg>

            <!-- Interactive Trigger / Status Footer inside stage -->
            <div class="about-3d-controls">
              <span class="about-3d-caption">
                <span class="about-3d-pulse-dot"></span>
                <span>Thinking Outside &amp; Redesigning the Box</span>
              </span>
              <button class="about-3d-replay-btn" id="dr-replay-box-anim" type="button" aria-label="Replay box animation">
                <span>REPLAY SEQUENCE</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      (function () {
        const stage = document.getElementById('about-3d-stage');
        const replayBtn = document.getElementById('dr-replay-box-anim');
        if (!stage) return;

        function triggerOpenSequence() {
          stage.classList.remove('is-open');
          void stage.offsetWidth; // force reflow
          stage.classList.add('is-open');
        }

        // Trigger on IntersectionObserver
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                triggerOpenSequence();
              }
            });
          }, { threshold: 0.25 });
          obs.observe(stage);
        } else {
          stage.classList.add('is-open');
        }

        // Replay button click
        if (replayBtn) {
          replayBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            triggerOpenSequence();
          });
        }

        // Subtle 3D Parallax tilt on mousemove
        stage.addEventListener('mousemove', function (e) {
          const rect = stage.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          const svg = stage.querySelector('.about-3d-svg');
          if (svg) {
            svg.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.01)`;
          }
        });

        stage.addEventListener('mouseleave', function () {
          const svg = stage.querySelector('.about-3d-svg');
          if (svg) {
            svg.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
          }
        });
      })();
    </script>
  </section>'''

updated_html = html_content[:about_start] + new_about_section + html_content[about_end:]
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(updated_html)
print("Updated index.html successfully with 3D animated visual.")

# 2. Update style.css
css_path = r"c:\Users\Chandresh\Desktop\Work\DemuRup\DemuRup media final\style.css"
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Locate where the srv-cta-section ends
srv_idx = css_content.find('.srv-cta-section')
if srv_idx != -1:
    next_brace = css_content.find('}', srv_idx)
    closing_media = css_content.find('}', next_brace + 1)
    css_base = css_content[:closing_media + 1]
else:
    css_base = css_content

new_about_css = '''

/* ════════════════════════════════════════════════════════════════
   ABOUT SECTION — 3D DECONSTRUCTED BOX & MANIFESTO VISUAL
   Scoped strictly to #about
════════════════════════════════════════════════════════════════ */

#about {
  --about-bg: #ffffff;
  --about-text: #0a0a0a;
  --about-muted: #55564f;
  --about-border: rgba(10, 10, 10, 0.1);
  --about-green: #00cc33;

  background-color: var(--about-bg) !important;
  color: var(--about-text) !important;
  position: relative;
  overflow: hidden;
  padding: 8rem 0;
  border-top: 1px solid var(--about-border);
}

#about * {
  box-sizing: border-box;
}

/* ── Container & Grid Layout ── */
#about .about-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  #about .about-container {
    padding: 0 2.5rem;
  }
}

#about .about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  #about .about-grid {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 3.5rem;
  }
}

@media (min-width: 1280px) {
  #about .about-grid {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4.5rem;
  }
}

/* ══════════════════════════════════════════════════
   LEFT COLUMN: HEADLINE, COPY & CTA
══════════════════════════════════════════════════ */

#about .about-col-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#about .about-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.8rem, 6.2vw, 5.5rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: var(--about-text);
  margin: 0 0 1.75rem 0;
  font-weight: 700;
}

#about .about-heading-accent {
  color: var(--about-green);
  font-weight: 700;
}

#about .about-text {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--about-muted);
  margin: 0 0 1.25rem 0;
  max-width: 34rem;
}

#about .about-text:last-of-type {
  margin-bottom: 0;
}

#about .about-cta-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2.75rem;
}

#about .about-btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--about-text);
  color: var(--about-bg);
  border: 2px solid var(--about-text);
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.875rem 2rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

#about .about-btn-arrow {
  color: var(--about-green);
  transition: transform 0.25s ease, color 0.25s ease;
}

#about .about-btn-cta:hover {
  background-color: var(--about-green);
  border-color: var(--about-green);
  color: var(--about-text);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 204, 51, 0.3);
}

#about .about-btn-cta:hover .about-btn-arrow {
  color: var(--about-text);
  transform: translateX(4px);
}

#about .about-locale {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--about-muted);
  letter-spacing: 0.04em;
}

/* ══════════════════════════════════════════════════
   RIGHT COLUMN: MANIFESTO & 3D ANIMATED STAGE
══════════════════════════════════════════════════ */

#about .about-col-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Manifesto Card ── */
#about .about-manifesto-card {
  background-color: var(--about-bg);
  border: 1px solid var(--about-border);
  border-radius: 0.875rem;
  padding: 1.75rem 2rem;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
}

#about .about-manifesto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(10, 10, 10, 0.05);
  border-color: rgba(10, 10, 10, 0.2);
}

#about .about-manifesto-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
}

#about .about-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--about-green);
}

#about .about-badge-text {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--about-green);
  font-weight: 700;
}

#about .about-manifesto-quote {
  font-family: var(--font-heading);
  font-size: clamp(1.35rem, 2.3vw, 1.85rem);
  line-height: 1.28;
  color: var(--about-text);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.01em;
}

#about .about-quote-accent {
  color: var(--about-green);
}

/* ══════════════════════════════════════════════════
   3D ANIMATED "REDESIGN THE BOX" STAGE
══════════════════════════════════════════════════ */

#about .about-3d-stage {
  position: relative;
  background-color: #fafafa;
  border: 1px solid var(--about-border);
  border-radius: 0.875rem;
  padding: 1.5rem 1.5rem 1.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 380px;
  box-shadow: 0 4px 20px rgba(10, 10, 10, 0.03);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

#about .about-3d-stage:hover {
  border-color: rgba(0, 204, 51, 0.3);
  box-shadow: 0 16px 40px rgba(0, 204, 51, 0.07);
}

/* ── Drafting Grid Backdrop ── */
#about .about-3d-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

#about .about-3d-grid-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(10, 10, 10, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(10, 10, 10, 0.035) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.8;
}

#about .about-3d-tag {
  position: absolute;
  font-family: monospace;
  font-size: 0.625rem;
  letter-spacing: 0.12em;
  color: rgba(10, 10, 10, 0.3);
  text-transform: uppercase;
}

#about .about-3d-tag-tl { top: 12px; left: 16px; }
#about .about-3d-tag-tr { top: 12px; right: 16px; color: var(--about-green); font-weight: 700; }
#about .about-3d-tag-bl { bottom: 44px; left: 16px; }
#about .about-3d-tag-br { bottom: 44px; right: 16px; }

/* ── 3D SVG Canvas ── */
#about .about-3d-svg {
  width: 100%;
  height: 100%;
  min-height: 290px;
  max-height: 330px;
  display: block;
  position: relative;
  z-index: 2;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
}

/* ══════════════════════════════════════════════════
   ANIMATION KEYFRAMES & INTERSECTION OBSERVER STATES
══════════════════════════════════════════════════ */

/* Box Lid Lifting Animation */
#about .dr-box-lid {
  transform-origin: 220px 200px;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(0) rotate(0deg);
}

#about .about-3d-stage.is-open .dr-box-lid {
  transform: translateY(-48px) rotate(-18deg);
  animation: dr-lid-ambient-float 4.5s ease-in-out infinite alternate 1.2s;
}

@keyframes dr-lid-ambient-float {
  0% { transform: translateY(-48px) rotate(-18deg); }
  100% { transform: translateY(-56px) rotate(-22deg); }
}

/* Box Core Pulse */
#about .dr-box-core-pulse {
  animation: dr-core-glow 2.5s ease-in-out infinite alternate;
}

@keyframes dr-core-glow {
  0% { opacity: 0.6; r: 10px; }
  100% { opacity: 1; r: 15px; }
}

/* Exploding Polyhedron Assembly */
#about .dr-polyhedron-assembly {
  transform-origin: 475px 190px;
  opacity: 0.2;
  transform: translate(-100px, 30px) scale(0.35);
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease;
}

#about .about-3d-stage.is-open .dr-polyhedron-assembly {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

/* Continuous 3D Polyhedron Ambient Rotation */
#about .dr-polyhedron-spin {
  transform-origin: 475px 190px;
  animation: dr-poly-float-spin 12s linear infinite;
}

@keyframes dr-poly-float-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.04); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Exploding Shards Cluster */
#about .dr-shards-cluster {
  opacity: 0;
  transform-origin: 270px 270px;
  transform: scale(0.4);
  transition: opacity 1.2s ease 0.2s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

#about .about-3d-stage.is-open .dr-shards-cluster {
  opacity: 1;
  transform: scale(1);
}

/* Floating Orbiting Shards */
#about .dr-shard-1 { animation: dr-shard-float-1 4s ease-in-out infinite alternate; transform-origin: 580px 100px; }
#about .dr-shard-2 { animation: dr-shard-float-2 3.5s ease-in-out infinite alternate; transform-origin: 627px 185px; }
#about .dr-shard-3 { animation: dr-shard-float-3 5s ease-in-out infinite alternate; transform-origin: 550px 305px; }
#about .dr-shard-4 { animation: dr-shard-float-4 4.2s ease-in-out infinite alternate; transform-origin: 445px 56px; }
#about .dr-shard-5 { animation: dr-shard-float-5 6s ease-in-out infinite alternate; }

@keyframes dr-shard-float-1 {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(8px, -12px) rotate(12deg); }
}

@keyframes dr-shard-float-2 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(12px, 6px) scale(1.1); }
}

@keyframes dr-shard-float-3 {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(-6px, 10px) rotate(-10deg); }
}

@keyframes dr-shard-float-4 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(6px, -10px) scale(1.15); }
}

@keyframes dr-shard-float-5 {
  0% { transform: translateY(0); opacity: 0.8; }
  100% { transform: translateY(-8px); opacity: 1; }
}

/* Energy Streams Pulse */
#about .dr-anim-stream-1 { animation: dr-dash-stream 2s linear infinite; }
#about .dr-anim-stream-2 { animation: dr-dash-stream 1.6s linear infinite reverse; }
#about .dr-anim-stream-3 { animation: dr-dash-stream 2.4s linear infinite; }

@keyframes dr-dash-stream {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 30; }
}

/* ── Stage Controls & Status Footer ── */
#about .about-3d-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(10, 10, 10, 0.07);
  position: relative;
  z-index: 3;
}

#about .about-3d-caption {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--about-muted);
}

#about .about-3d-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--about-green);
  box-shadow: 0 0 8px rgba(0, 204, 51, 0.8);
  animation: dr-dot-pulse 1.8s ease-in-out infinite;
}

@keyframes dr-dot-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.4); opacity: 1; }
}

#about .about-3d-replay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: transparent;
  border: 1px solid var(--about-border);
  color: var(--about-text);
  font-family: monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

#about .about-3d-replay-btn:hover {
  background-color: var(--about-green);
  border-color: var(--about-green);
  color: #000000;
  box-shadow: 0 2px 10px rgba(0, 204, 51, 0.3);
}

#about .about-3d-replay-btn svg {
  transition: transform 0.35s ease;
}

#about .about-3d-replay-btn:hover svg {
  transform: rotate(180deg);
}

/* ══════════════════════════════════════════════════
   RESPONSIVE REFINEMENTS
══════════════════════════════════════════════════ */

@media (max-width: 1024px) {
  #about {
    padding: 6rem 0;
  }

  #about .about-heading {
    font-size: clamp(2.5rem, 5.5vw, 4.2rem);
    margin-bottom: 1.5rem;
  }

  #about .about-grid {
    gap: 3rem;
  }

  #about .about-manifesto-card {
    padding: 1.5rem 1.75rem;
  }

  #about .about-3d-stage {
    min-height: 350px;
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  #about {
    padding: 5rem 0;
  }

  #about .about-heading {
    font-size: clamp(2.25rem, 8vw, 3.5rem);
  }

  #about .about-text {
    font-size: 1rem;
  }

  #about .about-cta-group {
    margin-top: 2rem;
    gap: 1.25rem;
  }

  #about .about-btn-cta {
    width: 100%;
    justify-content: center;
  }

  #about .about-manifesto-quote {
    font-size: 1.25rem;
  }

  #about .about-3d-stage {
    min-height: 300px;
    padding: 1rem;
  }

  #about .about-3d-svg {
    min-height: 240px;
  }

  #about .about-3d-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  #about .about-3d-replay-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ── Prefers Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  #about .dr-box-lid,
  #about .dr-polyhedron-assembly,
  #about .dr-polyhedron-spin,
  #about .dr-shards-cluster,
  #about .dr-shard,
  #about .dr-box-core-pulse,
  #about .dr-anim-stream-1,
  #about .dr-anim-stream-2,
  #about .dr-anim-stream-3 {
    animation: none !important;
    transition: none !important;
  }

  #about .about-3d-stage .dr-box-lid {
    transform: translateY(-48px) rotate(-18deg) !important;
  }

  #about .about-3d-stage .dr-polyhedron-assembly {
    opacity: 1 !important;
    transform: translate(0, 0) scale(1) !important;
  }

  #about .about-3d-stage .dr-shards-cluster {
    opacity: 1 !important;
    transform: scale(1) !important;
  }
}
'''

updated_css = css_base + new_about_css
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(updated_css)
print("Updated style.css successfully with 3D animated visual styles.")
