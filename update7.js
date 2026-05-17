const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const changes = [
  {
    others: ['14kixiQ1IOq9Y-kLsGZLIMYENQZhyKVB8', '1oZug9_fao3xkFABU3jJ1X760U7dsKwCK'],
    projKey: 'proj0'
  },
  {
    others: ['1_5JdRQ0SABQ5NlgMBz-ea6lohPD7ktna'],
    projKey: 'proj1'
  },
  {
    others: ['1234XFm9K-jDe5CUj7XNkuZYONVVjT3Uq'],
    projKey: 'proj2'
  },
  {
    others: ['1ylC_H_uvafs057VxlkleXQSO5qSbaSAC'],
    projKey: 'proj3'
  },
  {
    others: ['1SqsnlkPYSGXIFOybiTMYUxI64jgD2fss4', '1p7J4fY7xlaCeJex2RvubH61axl_el3Mx'],
    projKey: 'proj5'
  },
  {
    others: ['1v7FXkAUqlBxSR7wmJQ0bCPkWt74G9avC'],
    projKey: 'proj6'
  },
  {
    others: ['1JzVe5du8qopOL2brRH03kBUwCX3SdPg1'],
    projKey: 'proj7'
  }
];

// Helper to inject HTML just before the closing backtick of a project's content
for (const c of changes) {
  let otherImagesHTML = '';
  for (const oid of c.others) {
    otherImagesHTML += '\\n      <img src="https://drive.google.com/thumbnail?id=' + oid + '&sz=w1000" alt="Detail" style="margin-top:1.5rem;">';
  }

  // Find where this projKey starts
  let startIndex = html.indexOf(c.projKey + ':');
  if (startIndex === -1) continue;

  // Find the content backticks
  let contentIndex = html.indexOf('content:', startIndex);
  if (contentIndex === -1) continue;

  let backtickStart = html.indexOf('\`', contentIndex);
  let backtickEnd = html.indexOf('\`', backtickStart + 1);

  if (backtickEnd !== -1) {
    // Insert before backtickEnd
    html = html.substring(0, backtickEnd) + otherImagesHTML + '\\n    ' + html.substring(backtickEnd);
  }
}

fs.writeFileSync('index.html', html);
console.log('Update 7 completed');
