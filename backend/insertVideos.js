const fs = require('fs');
const path = require('path');
const db = require('./db'); // koristi konekciju iz db.js

const videoFolder = path.join(__dirname, 'videos');

fs.readdir(videoFolder, (err, files) => {
  if (err) {
    console.error('Greška pri čitanju foldera:', err);
    return;
  }

  const videoFiles = files.filter(file => file.endsWith('.mp4'));

  videoFiles.forEach(filename => {
    const title = path.parse(filename).name;
    const filepath = path.join('videos', filename);

    const sql = 'INSERT INTO videos (title, filename, filepath) VALUES (?, ?, ?)';
    db.query(sql, [title, filename, filepath], (err, result) => {
      if (err) {
        console.error(`Greška za "${filename}":`, err);
      } else {
        console.log(`✅ Dodato: ${title}`);
      }
    });
  });
});
