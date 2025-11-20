// const express = require('express')
// const cors = require('cors')
// const streamRoutes = require('./routes/streamRoutes')
// const getAllRoutes = require('./routes/getAllRoutes')
// const db = require('./db');
// require('dotenv').config();


// const app = express()
// const PORT = process.env.NODE_PORT || 8100
// const HOST = process.env.IP || '::';

// app.use(cors())
// app.use(express.json())

// app.use((req, res, next) => {
//   console.log(`Zahtev pristigao: ${req.method} ${req.url}`);
//   next();
// });


// app.use('/api/stream', streamRoutes)
// app.use('/api/getAll', getAllRoutes)

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(PORT, HOST, () => {
//   console.log(`Server pokrenut na portu ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const streamRoutes = require('./routes/streamRoutes');
const getAllRoutes = require('./routes/getAllRoutes');
const db = require('./db'); // tvoj konektor ka MySQL

const app = express();

// CORS podešavanje (ako imaš frontend na Vercel-u ili lokalno)
const allowedOrigins = [
  'http://localhost:5173', // lokalni frontend
  'https://tvoj-vercel-frontend.vercel.app', // frontend na Vercel
  'https://aleksandra-videoapp.vercel.app' // eventualno drugi domen
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Logger za sve zahteve
app.use((req, res, next) => {
  console.log(`Zahtev pristigao: ${req.method} ${req.url}`);
  next();
});

// REST API rute
app.use('/api/stream', streamRoutes);
app.use('/api/getAll', getAllRoutes);

// Test ruta
app.get('/', (req, res) => res.send('Hello World!'));
