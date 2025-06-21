const express = require('express')
const cors = require('cors')
const streamRoutes = require('./routes/streamRoutes')
const db = require('./db');
require('dotenv').config();


const app = express()
const PORT = process.env.NODE_PORT || 5000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Zahtev pristigao: ${req.method} ${req.url}`);
  next();
});


app.use('/api/stream', streamRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server ovajje pokrenut na http://localhost:${PORT}`))