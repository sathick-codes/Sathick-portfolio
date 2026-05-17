const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const imageMap = {
  // MARS Hackathon
  '1T4IoTHMzytihrC6_J1Ifsr__QU3S4bcF': 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
  // Tesla Hobby
  '1KWYrGWFK3f0faACHedMnhKrbWGpGbq1F': 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80',
  // Tesla PBL
  '1aSfpTqa83zwpi_3Jwt5aiS-JzyVHnVPZ': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
  // SIH Challenge
  '1UUBo49-5dQ0ArXf0G9Pla3VHX2GKHWzT': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  // Automatic Door
  '1g00Ooq5X_4NAfa_Z_TP9ZOi4Uq62bVN9': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  // RideFar
  '1T46xW-KgUL1UxwnnD8eaSy6xeoHbyVlA': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
  // Comfeasy
  '1vE0gZ1UCQbP6YASufA6EPbrbOaKx9eD1': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  // Hyundai
  '1z6Atx0MX_J6w-k4C6MMN0qoAP6IX9l6k': 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80'
};

for (const [id, url] of Object.entries(imageMap)) {
  const target800 = 'https://drive.google.com/thumbnail?id=' + id + '&sz=w800';
  html = html.split(target800).join(url);
  
  const target1000 = 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1000';
  const url1000 = url.replace('w=800', 'w=1000');
  html = html.split(target1000).join(url1000);
}

fs.writeFileSync('index.html', html);
console.log('Update 5 completed');
