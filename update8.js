const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Image URLs from thumbnail to uc?export=view
html = html.replace(/https:\/\/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)&sz=w[0-9]+/g, 'https://drive.google.com/uc?export=view&id=$1');

// 2. Remove Automatic Door project (proj4) from proj-grid
html = html.replace(/<div class="proj-card"[^>]*onclick="openDrawer\('proj4'\)"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<div class="proj-card"/, '<div class="proj-card"');
// Wait, safer to remove it via a targeted regex.
html = html.replace(/<div class="proj-card" data-cat="academic" onclick="openDrawer\('proj4'\)">[\s\S]*?<span class="proj-arrow">↗<\/span>\s*<\/div>\s*<\/div>/, '');

// Also remove proj4 from projects object
html = html.replace(/\bproj4\s*:\s*\{[\s\S]*?\},(?=\s*proj5)/, '');

// 3. Update Project Titles in HTML Grid & Projects Object
const titleUpdates = [
  { old: 'M.A.R.S Hackathon \\(Habitat &amp; Shelter Design\\)', new: 'M.A.R.S. Challenge - Site Selection and Shelter Design' },
  { old: 'M.A.R.S Hackathon \\(Habitat & Shelter Design\\)', new: 'M.A.R.S. Challenge - Site Selection and Shelter Design' },
  
  { old: 'Usage of Tesla Turbine for Domestic Wind Energy', new: 'Usage of Tesla Turbine for Domestic Wind Energy Generation' },
  // the h2 inside content
  { old: 'Usage of Tesla Turbine for Domestic Wind Energy Generation', new: 'Usage of Tesla Turbine for Domestic Wind Energy Generation' },
  
  { old: 'Smart India Hackathon \\(SIH\\) Project', new: 'Tension-Based Fault Alert System for LV Power Transmission Lines (SIH2025)' },
  { old: 'Smart India Hackathon \\(SIH\\) Challenge', new: 'Tension-Based Fault Alert System for LV Power Transmission Lines (SIH2025)' },
  
  { old: 'RideFar', new: 'RideFar - Fuel Monitoring Device' },
  { old: 'RideFar Business Model', new: 'RideFar - Fuel Monitoring Device' },
  
  { old: 'Comfeasy', new: 'ComfEasy - Ergonomic Modular Massager' },
  { old: 'Comfeasy Business Project', new: 'ComfEasy - Ergonomic Modular Massager' },
  
  { old: 'Hyundai Motors India Ltd. Internship', new: 'Ergonomic and Process Optimisation @ HMIL' }
];

for (const t of titleUpdates) {
  html = html.replace(new RegExp(t.old, 'g'), t.new);
}

// 4. Update Mobile Menu CSS (Solid background, separation lines, rack and pinion animation)
const mobileCSSUpdate = `
@media(max-width:900px){
  .menu-toggle{display:block; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index:100; position:relative;}
  .nav-links{display:flex;flex-direction:column;align-items:flex-end;text-align:right;position:fixed;top:64px;right:0;width:65%;bottom:0;background:#0c0c0e !important;z-index:99;padding:2rem;gap:1rem;transform:translateX(100%);pointer-events:none;transition:transform .4s cubic-bezier(.4,0,.2,1);border-left:1px solid var(--line);box-shadow:-5px 0 20px rgba(0,0,0,0.5);}
  .nav-links > a, .nav-links .has-dropdown > a { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; width: 100%; display: block; }
  .nav-links.active{transform:translateX(0);pointer-events:all}
  #cursorDot{display:none !important}
  .has-dropdown{position:static; width:100%;}
  .dropdown{position:static;opacity:1;pointer-events:all;transform:none;border:none;background:transparent;padding-right:0;border-right:none;border-left:none;border-radius:0;margin-top:0.5rem;display:none;align-items:flex-end;text-align:right}
  .dropdown a { padding: 0.5rem 0; font-size: 0.85rem; color: var(--text2); }
  .has-dropdown.open .dropdown{display:flex;flex-direction:column}
`;
html = html.replace(/@media\(max-width:900px\)\{[\s\S]*?\.has-dropdown\.open \.dropdown\{display:flex;flex-direction:column\}/, mobileCSSUpdate.trim());

// 5. Update toggleMenu logic & scroll logic for rack and pinion
const oldScriptToggle = /function toggleMenu\(\)\{([\s\S]*?)\}/;
const newScriptToggle = `function toggleMenu(){
  const nav = document.querySelector('.nav-links');
  const btn = document.querySelector('.menu-toggle');
  nav.classList.toggle('active');
  if(nav.classList.contains('active')){
    btn.style.transform = 'rotate(-180deg)';
  } else {
    btn.style.transform = 'rotate(0deg)';
  }
}

// Close menu on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-links');
  const btn = document.querySelector('.menu-toggle');
  if(nav && nav.classList.contains('active')){
    nav.classList.remove('active');
    btn.style.transform = 'rotate(0deg)';
  }
});`;
html = html.replace(oldScriptToggle, newScriptToggle);

fs.writeFileSync('index.html', html);
console.log('Update 8 completed');
