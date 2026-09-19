import { Template } from '../types';

/**
 * Generates rich, complete, interactive HTML for the live preview iframe.
 * Renders an authentic website mockup matching the template's theme, industry, and style.
 */
export function generateTemplatePreviewHtml(template: Template): string {
  const isDark = template.colorTheme === 'Dark' || template.style === 'Dark';
  const bg = isDark ? '#0d0f12' : '#ffffff';
  const text = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#4b5563';
  const cardBg = isDark ? '#16191f' : '#f9fafb';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const accent = '#023331';
  const highlight = '#fb3640';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name} - Live Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: ${bg};
      color: ${text};
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    h1, h2, h3, .brand-font {
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.02em;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: ${isDark ? 'rgba(13, 15, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
      backdrop-filter: blur(12px);
      border-bottom: 1px solid ${border};
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-weight: 800;
      font-size: 1.25rem;
      color: ${text};
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo-dot {
      width: 10px;
      height: 10px;
      background: ${highlight};
      border-radius: 50%;
    }
    nav {
      display: flex;
      gap: 24px;
      align-items: center;
    }
    nav a {
      color: ${secondaryText};
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    nav a:hover {
      color: ${text};
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 22px;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      border: none;
    }
    .btn-primary {
      background: ${isDark ? '#f3f4f6' : '#023331'};
      color: ${isDark ? '#0d0f12' : '#ffffff'};
    }
    .btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .btn-outline {
      background: transparent;
      color: ${text};
      border: 1px solid ${border};
    }
    .btn-outline:hover {
      background: ${cardBg};
    }
    .hero {
      padding: 80px 24px 60px;
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      padding: 4px 14px;
      border-radius: 9999px;
      background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(2,51,49,0.06)'};
      color: ${isDark ? '#e5e7eb' : '#023331'};
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero h1 {
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    .hero p {
      font-size: 1.15rem;
      color: ${secondaryText};
      max-width: 680px;
      margin: 0 auto 36px;
    }
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }
    .hero-image {
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: 16px;
      border: 1px solid ${border};
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.25);
    }
    .features-section {
      padding: 80px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      margin-bottom: 48px;
    }
    .section-title h2 {
      font-size: 2rem;
      margin-bottom: 12px;
    }
    .section-title p {
      color: ${secondaryText};
      font-size: 1rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .card {
      background: ${cardBg};
      border: 1px solid ${border};
      border-radius: 14px;
      padding: 32px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
    }
    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: ${highlight};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .card h3 {
      font-size: 1.25rem;
      margin-bottom: 10px;
    }
    .card p {
      color: ${secondaryText};
      font-size: 0.95rem;
    }
    .banner {
      margin: 60px auto;
      max-width: 1200px;
      padding: 60px 32px;
      background: ${isDark ? '#14181f' : '#023331'};
      color: #ffffff;
      border-radius: 20px;
      text-align: center;
    }
    .banner h2 {
      font-size: 2.2rem;
      margin-bottom: 16px;
    }
    .banner p {
      color: rgba(255,255,255,0.8);
      max-width: 600px;
      margin: 0 auto 28px;
    }
    footer {
      border-top: 1px solid ${border};
      padding: 40px 24px;
      text-align: center;
      color: ${secondaryText};
      font-size: 0.85rem;
    }
    @media (max-width: 640px) {
      header { padding: 14px 16px; }
      nav { display: none; }
      .hero { padding: 40px 16px; }
      .hero-image { height: 260px; }
    }
  </style>
</head>
<body>
  <header>
    <a href="#" class="logo">
      <span class="logo-dot"></span>
      ${template.name}
    </a>
    <nav>
      <a href="#about">About</a>
      <a href="#features">Features</a>
      <a href="#showcase">Showcase</a>
      <a href="#contact">Contact</a>
    </nav>
    <div>
      <button class="btn btn-primary" onclick="alert('Simulated Action: Starting with ${template.name}')">Get Started</button>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="badge">${template.category} • ${template.style}</div>
      <h1>${template.name}</h1>
      <p>${template.description}</p>
      <div class="hero-actions">
        <a href="#features" class="btn btn-primary">Explore Features</a>
        <a href="#contact" class="btn btn-outline">Schedule Consultation</a>
      </div>
      <img src="${template.previewImage}" alt="${template.name}" class="hero-image" />
    </section>

    <section class="features-section" id="features">
      <div class="section-title">
        <h2>Engineered for ${template.industry}</h2>
        <p>A comprehensive design system tailored to elevate your presence.</p>
      </div>
      <div class="grid">
        ${template.features.map((feat, idx) => `
          <div class="card">
            <div class="card-icon">0${idx + 1}</div>
            <h3>${feat} Architecture</h3>
            <p>Seamlessly integrated ${feat.toLowerCase()} implementation built according to strict baseline typography and accessibility standards.</p>
          </div>
        `).join('')}
      </div>
    </section>

    <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
      <div class="banner">
        <h2>Launch with ${template.name} Today</h2>
        <p>Built with ${template.technologies.join(', ')}. Clean code, fast loading speeds, and responsive viewports guaranteed.</p>
        <button class="btn" style="background: #fb3640; color: #fff; padding: 14px 32px; font-size: 1rem;" onclick="alert('Simulated: Template selected!')">Use This Template</button>
      </div>
    </div>
  </main>

  <footer>
    <p>&copy; 2026 ${template.name}. Crafted by ${template.author.name}. All rights reserved.</p>
  </footer>
</body>
</html>`;
}
