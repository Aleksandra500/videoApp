const db = require('../db');

exports.getAllVideos = (req, res) => {
	const sql = 'SELECT * FROM videos';
	db.query(sql, (err, result) => {
		if (err)
			return res.status(500).json({ message: 'Greska na serveru' });

		if (result.length === 0)
			return res
				.status(409)
				.json({ message: 'Nema nijednog videa u bazi' });

		return res.status(200).json({
			result: result,
		});
	});
};
