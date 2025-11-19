const path = require('path');
const fs = require('fs');
const db = require('../db');

exports.stream = (req, res) => {
  const id = req.params.id; // recimo "video1.mp4"
  console.log(req.params, 'req.params');
  console.log('Stream request za video ID:', id);

  // Ako koristiš ime fajla direktno
  const videoPath = path.resolve(__dirname, '..', 'videos', id);
  console.log('Video putanja:', videoPath);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Fajl ne postoji');
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  const file = fs.createReadStream(videoPath, { start, end });

  const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, head);
  file.pipe(res);
};
