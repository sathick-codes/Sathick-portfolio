const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
const mapFile = path.join(__dirname, 'cdn_mappings.json');

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
  let mappings = {};
  if (fs.existsSync(mapFile)) {
    try {
      mappings = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch(e) {}
  }

  const files = fs.readdirSync(imgDir);
  console.log(`Found ${files.length} files in images directory.`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      if (mappings[file]) {
        console.log(`Already uploaded ${file} -> ${mappings[file]}`);
        continue;
      }
      console.log(`Uploading ${file}...`);
      try {
        const url = await uploadImage(path.join(imgDir, file));
        console.log(` -> Success: ${url}`);
        mappings[file] = url;
        fs.writeFileSync(mapFile, JSON.stringify(mappings, null, 2));
      } catch (e) {
        console.error(` -> Failed to upload ${file}: ${e.message}`);
      }
    }
  }
  console.log('All uploads finished. cdn_mappings.json updated.');
}

run();
