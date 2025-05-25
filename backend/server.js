const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // Allow both origins
    methods: ["GET", "POST"]
  }
});

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.run(`
      CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

app.use(cors({ 
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"] // Allow both origins
}));
app.use(express.json());
app.use(express.static('public'));

app.post('/api/report', (req, res) => {
  const { type, location, description } = req.body;
  if (!type || !location || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = `INSERT INTO alerts (type, location, description) VALUES (?, ?, ?)`;
  db.run(sql, [type, location, description], function(err) {
    if (err) {
      console.error('Error saving report:', err);
      return res.status(500).json({ error: 'Failed to save report' });
    }
    const newAlert = { id: this.lastID, type, location, description, timestamp: new Date().toISOString() };
    io.emit('newAlert', newAlert);
    res.status(201).json({ message: 'Report submitted successfully' });
  });
});

io.on('connection', (socket) => {
  console.log('A user connected');
  db.all('SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 10', [], (err, rows) => {
    if (err) {
      console.error('Error fetching recent alerts:', err);
    } else {
      socket.emit('recentAlerts', rows);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});