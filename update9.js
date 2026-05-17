const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace uc?export=view&id=FILE_ID
html = html.replace(/https:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/g, 'https://lh3.googleusercontent.com/d/$1');

// Replace thumbnail?id=FILE_ID&sz=...
html = html.replace(/https:\/\/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)(?:&sz=w\d+)?/g, 'https://lh3.googleusercontent.com/d/$1');

fs.writeFileSync('index.html', html);
console.log('Update 9 completed');
