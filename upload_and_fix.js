const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
const htmlPath = path.join(__dirname, 'index.html');

async function uploadImage(filePath) {
  const base64 = fs.readFileSync(filePath, 'base64');
  const data = new URLSearchParams();
  data.append('key', '6d207e02198a847aa98d0a2a901485a5');
  data.append('action', 'upload');
  data.append('source', base64);
  data.append('format', 'json');

  return new Promise((resolve, reject) => {
    const req = https.request('https://freeimage.host/api/1/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.status_code === 200) {
            resolve(json.image.url);
          } else {
            reject(new Error(json.status_txt || 'Upload failed'));
          }
        } catch(e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(data.toString());
    req.end();
  });
}

async function run() {
  const files = fs.readdirSync(imgDir);
  let html = fs.readFileSync(htmlPath, 'utf8');
  let replacements = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      console.log('Uploading', file);
      try {
        const url = await uploadImage(path.join(imgDir, file));
        console.log(' ->', url);
        
        // The HTML might have "images/file.jpg"
        const searchStr = 'images/' + file;
        // Escape for regex just in case
        const regex = new RegExp('images/' + file.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
        
        html = html.replace(regex, url);
        
        // Also check if they used URL encoded spaces
        const encodedStr = 'images/' + encodeURIComponent(file);
        const regexEncoded = new RegExp(encodedStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
        html = html.replace(regexEncoded, url);
        
        replacements++;
      } catch (e) {
        console.error('Failed to upload', file, e.message);
      }
    }
  }

  fs.writeFileSync(htmlPath, html);
  console.log('Updated index.html with new URLs.');
  
  // Check for remaining Google Drive links
  const driveLinks = html.match(/https:\/\/lh3\.googleusercontent\.com\/d\/[a-zA-Z0-9_-]+/g);
  if (driveLinks) {
    console.log('\nWARNING: There are still ' + new Set(driveLinks).size + ' unique Google Drive links in index.html.');
    console.log('These links might be broken (404/403). The user needs to provide the actual images or fix permissions.');
  }
}

run();
