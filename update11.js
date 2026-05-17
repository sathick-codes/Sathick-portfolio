const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\\n\\s*<img src="https:\/\/(drive\.google\.com|lh3\.googleusercontent\.com)[^"]*" alt="Detail" style="margin-top:1\.5rem;">/g, '');

const mappings = [
  { key: 'proj0', cover: 'images/1zaVdkcfQu7SrxGBto3n7mWdK-jbTNQu6.jpg', details: ['images/mars site selection.png', 'images/mars detail.jpeg'] },
  { key: 'proj1', cover: 'images/tesla turbine cover.jpg', details: ['images/tesla turbine 1.jpg'] },
  { key: 'proj2', cover: 'images/domestic wind energy turbine cover.jpeg', details: ['images/tesla wind turbine design.png'] },
  { key: 'proj3', cover: 'images/sih cover.png', details: ['images/1ylC_H_uvafs057VxlkleXQSO5qSbaSAC.jpg'] },
  { key: 'proj5', cover: 'images/ridefar cover.png', details: ['images/ridefar result.png'] },
  { key: 'proj6', cover: 'images/Comfeasy cover.jpeg', details: ['images/1v7FXkAUqlBxSR7wmJQ0bCPkWt74G9avC.jpg'] },
  { key: 'proj7', cover: 'images/hyundai intern cover.jpg', details: ['images/1JzVe5du8qopOL2brRH03kBUwCX3SdPg1.jpg'] }
];

function replaceCover(projKey, newImgSrc) {
  const marker = "onclick=\\"openDrawer('" + projKey + "')\\"";
  const clickIndex = html.indexOf(marker);
  if (clickIndex === -1) return;
  const cardStart = html.lastIndexOf('<div class="proj-card"', clickIndex);
  if (cardStart === -1) return;
  const imgStart = html.indexOf('<img src="', cardStart);
  if (imgStart === -1 || imgStart > clickIndex + 100) return;
  const imgEnd = html.indexOf('"', imgStart + 10);
  html = html.substring(0, imgStart + 10) + newImgSrc + html.substring(imgEnd);
  
  const objStart = html.indexOf(projKey + ': {');
  if (objStart === -1) return;
  const contentStart = html.indexOf('content:', objStart);
  const imgInObj = html.indexOf('<img src="', contentStart);
  if (imgInObj === -1) return;
  const imgInObjEnd = html.indexOf('"', imgInObj + 10);
  html = html.substring(0, imgInObj + 10) + newImgSrc + html.substring(imgInObjEnd);
}

for (const m of mappings) {
  replaceCover(m.key, m.cover);
  
  let detailsHtml = '';
  for (const d of m.details) {
    detailsHtml += '\\n      <img src="' + d + '" alt="Detail" style="margin-top:1.5rem;">';
  }
  
  const objStart = html.indexOf(m.key + ':');
  if (objStart !== -1) {
    const contentStart = html.indexOf('content:', objStart);
    let backtickStart = html.indexOf('\`', contentStart);
    let backtickEnd = html.indexOf('\`', backtickStart + 1);
    
    if (backtickEnd !== -1) {
      html = html.substring(0, backtickEnd) + detailsHtml + '\\n    ' + html.substring(backtickEnd);
    }
  }
}

const mediaStart = html.indexOf('@media(max-width:900px){');
const dropdownEnd = html.indexOf('.has-dropdown.open .dropdown{display:flex;flex-direction:column}', mediaStart);

if (mediaStart !== -1 && dropdownEnd !== -1) {
  const newCss = "@media(max-width:900px){\\n" +
  "  .menu-toggle{display:block; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index:1000; position:relative;}\\n" +
  "  .nav-links{display:flex;flex-direction:column;align-items:flex-end;text-align:right;position:fixed;top:64px;right:0;width:70%;bottom:0;background:#050505 !important;z-index:999;padding:2rem;gap:1rem;transform:translateX(100%);pointer-events:none;transition:transform 0.4s cubic-bezier(.4,0,.2,1);border-left:1px solid #333;box-shadow:-10px 0 30px rgba(0,0,0,0.8);}\\n" +
  "  .nav-links > a, .nav-links .has-dropdown > a { border-bottom: 1px solid #222; padding-bottom: 1rem; width: 100%; display: block; }\\n" +
  "  .nav-links.active{transform:translateX(0);pointer-events:all}\\n" +
  "  #cursorDot{display:none !important}\\n" +
  "  .has-dropdown{position:static; width:100%;}\\n" +
  "  .dropdown{position:static;opacity:1;pointer-events:all;transform:none;border:none;background:transparent;padding-right:0;border-right:none;border-left:none;border-radius:0;margin-top:0.5rem;display:none;align-items:flex-end;text-align:right}\\n" +
  "  .dropdown a { padding: 0.5rem 0; font-size: 0.85rem; color: var(--text2); }\\n" +
  "  .has-dropdown.open .dropdown{display:flex;flex-direction:column}\\n";

  html = html.substring(0, mediaStart) + newCss + html.substring(dropdownEnd + 64);
}

fs.writeFileSync('index.html', html);
console.log('Update 11 completed');
