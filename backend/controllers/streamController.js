const path = require('path');
const fs = require('fs');
const db = require('../db'); // <-- ispravno importovanje modula

exports.stream = (req, res) => {
	const id = req.params.id;
	console.log(req.params, 'req.params');

	console.log('Stream request za video ID:', id);

	db.query(
		'SELECT * FROM videos WHERE id = ?',
		[id],
		(err, results) => {
			if (err) {
				console.error('DB error:', err);
				return res.status(500).send('Greška u bazi');
			}

			if (!results.length) {
				return res.status(404).send('Video nije pronađen');
			}

			const videoPath = path.resolve(
				__dirname,
				'..',
				results[0].filepath
			);
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

			console.log(`Streaming bytes ${start}-${end} of ${fileSize}`);

			const file = fs.createReadStream(videoPath, { start, end });

			console.log(`Streaming bytes ${start}-${end} of ${fileSize}`);

			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunkSize,
				'Content-Type': 'video/mp4',
			};

			res.writeHead(206, head);
			file.pipe(res);
		}
	);
};
