// server/index.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const gamesRouter = require('./routes/games');

const app  = express();
const PORT = process.env.PORT || 5000;

// CORS — in production, Railway sets FRONTEND_URL so only your Vercel app can call the API.
// In development, all origins are allowed for convenience.
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/games', gamesRouter);

// Health check — Railway pings this to confirm the service is alive
app.get('/', (req, res) => res.json({ status: 'ok', service: 'game-library-api' }));

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
