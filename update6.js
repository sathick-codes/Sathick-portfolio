const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const changes = [
  {
    unsplash: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9',
    cover: '1zaVdkcfQu7SrxGBto3n7mWdK-jbTNQu6',
    others: ['14kixiQ1IOq9Y-kLsGZLIMYENQZhyKVB8', '1oZug9_fao3xkFABU3jJ1X760U7dsKwCK'],
    projKey: 'proj0'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51',
    cover: '1ab3yJXnzvlYFvaEBCzgw1TWMmlmySpm2',
    others: ['1_5JdRQ0SABQ5NlgMBz-ea6lohPD7ktna'],
    projKey: 'proj1'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
    cover: '1pEbywOn4qv3Ov77EmklVF2VtDQapwoG',
    others: ['1234XFm9K-jDe5CUj7XNkuZYONVVjT3Uq'],
    projKey: 'proj2'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    cover: '1Dig6jetkv658KlokDooq3ylIPxNOOlpt',
    others: ['1ylC_H_uvafs057VxlkleXQSO5qSbaSAC'],
    projKey: 'proj3'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7',
    cover: '14iSsovoFkjqLMLiaKU28OPplSGc6E2lT',
    others: ['1SqsnlkPYSGXIFOybiTMYUxI64jgD2fss4', '1p7J4fY7xlaCeJex2RvubH61axl_el3Mx'],
    projKey: 'proj5'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    cover: '1yQXnOqhRjAblDC8uW5wZ6dv10JmKqzYY',
    others: ['1v7FXkAUqlBxSR7wmJQ0bCPkWt74G9avC'],
    projKey: 'proj6'
  },
  {
    unsplash: 'https://images.unsplash.com/photo-1565043666747-69f6646db940',
    cover: '1mtkjQNVNCgNGCJn6c0CX2Pm4FDdFOS98',
    others: ['1JzVe5du8qopOL2brRH03kBUwCX3SdPg1'],
    projKey: 'proj7'
  }
];

for (const c of changes) {
  // Replace the card images (sz=w800)
  html = html.split(c.unsplash + '?w=800&q=80').join('https://drive.google.com/thumbnail?id=' + c.cover + '&sz=w800');
  // Replace the drawer images (sz=w1000)
  html = html.split(c.unsplash + '?w=1000&q=80').join('https://drive.google.com/thumbnail?id=' + c.cover + '&sz=w1000');
  
  // Inject the "other" images at the end of the project's content
  let otherImagesHTML = '';
  for (const oid of c.others) {
    otherImagesHTML += '\\n      <img src="https://drive.google.com/thumbnail?id=' + oid + '&sz=w1000" alt="Detail" style="margin-top:1.5rem;">';
  }
  
  const blockRegex = new RegExp('(\\\\b' + c.projKey + '\\\\s*:\\\\s*\\\\{[\\\\s\\\\S]*?content\\\\s*:\\\\s*`[\\\\s\\\\S]*?)(\\\\s*`\\\\s*\\\\})');
  html = html.replace(blockRegex, '$1' + otherImagesHTML + '$2');
}

// Mobile dropdown background
html = html.split('background:rgba(15,15,18,0.98)').join('background:rgba(12,12,14,0.95)');

fs.writeFileSync('index.html', html);
console.log('Update 6 completed');
