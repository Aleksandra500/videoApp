require('dotenv').config();
const express = require('express');
const streamRoutes = require('./routes/streamRoutes');
const getAllRoutes = require('./routes/getAllRoutes');

const app = express();

// --- CORS ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://video-app-pdrb.vercel.app',
  'https://video-app-pdrb-git-main-aleksandras-projects-79a46c16.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  } else {
    res.status(403).send('Blocked by CORS');
  }
});

// JSON parser
app.use(express.json());

// --- LOGOVI ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- ROUTES ---
app.use('/api/stream', streamRoutes);
app.use('/api/getAll', getAllRoutes);

// Root
app.get('/', (req, res) => res.send('Backend radi!'));

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err);
  res.status(500).json({ message: 'Server error' });
});

// Start
const PORT = process.env.NODE_PORT || 8100;
const HOST = process.env.IP || '::';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
