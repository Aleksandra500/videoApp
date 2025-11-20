const db = require('../db');

exports.getAllVideos = (req, res) => {
  const sql = 'SELECT * FROM videos';
  console.log(`[${new Date().toISOString()}] GET /api/getAll pozvan`); // log poziva rute

  db.query(sql, (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Greška u getAllVideos:`, err);
      return res.status(500).json({ message: 'Greška na serveru' });
    }

    if (result.length === 0) {
      console.log(`[${new Date().toISOString()}] Nema video zapisa u bazi`);
      return res.status(409).json({ message: 'Nema nijednog videa u bazi' });
    }

    console.log(`[${new Date().toISOString()}] Poslato ${result.length} video zapisa`);
    return res.status(200).json({ result: result });
  });
};
