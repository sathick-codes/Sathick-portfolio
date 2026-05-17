const https = require('https');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir);
}

const fileIds = [
  '1zaVdkcfQu7SrxGBto3n7mWdK-jbTNQu6', '14kixiQ1IOq9Y-kLsGZLIMYENQZhyKVB8', '1oZug9_fao3xkFABU3jJ1X760U7dsKwCK',
  '1ab3yJXnzvlYFvaEBCzgw1TWMmlmySpm2', '1_5JdRQ0SABQ5NlgMBz-ea6lohPD7ktna',
  '1pEbywOn4qv3Ov77EmklVF2VtDQapwoG', '1234XFm9K-jDe5CUj7XNkuZYONVVjT3Uq',
  '1Dig6jetkv658KlokDooq3ylIPxNOOlpt', '1ylC_H_uvafs057VxlkleXQSO5qSbaSAC',
  '14iSsovoFkjqLMLiaKU28OPplSGc6E2lT', '1SqsnlkPYSGXIFOybiTMYUxI64jgD2fss4', '1p7J4fY7xlaCeJex2RvubH61axl_el3Mx',
  '1yQXnOqhRjAblDC8uW5wZ6dv10JmKqzYY', '1v7FXkAUqlBxSR7wmJQ0bCPkWt74G9avC',
  '1mtkjQNVNCgNGCJn6c0CX2Pm4FDdFOS98', '1JzVe5du8qopOL2brRH03kBUwCX3SdPg1'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to get status 200: ' + response.statusCode));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const id of fileIds) {
    const url = 'https://drive.google.com/uc?export=download&id=' + id;
    const dest = path.join(imgDir, id + '.jpg');
    console.log('Downloading', id);
    try {
      await download(url, dest);
    } catch (e) {
      console.error('Failed', id, e.message);
    }
  }
  console.log('All done');
}
run();
