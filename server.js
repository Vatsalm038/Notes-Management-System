const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up CORS for handling cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/', (req, res) => {
    res.send('Welcome to the Notes Management App');
  });
  
// User registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Implement user registration logic and save to the database
  // For simplicity, we'll assume a 'users' table with columns 'username' and 'password'
  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(`User ${username} registered successfully`);
  });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Implement user login logic and return a token
  // For simplicity, we'll just check against the database
  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(200).send(`Welcome, ${username}!`);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Notes creation endpoint
app.post('/notes', (req, res) => {
  const { username, note } = req.body;

  // Implement notes creation logic and save to the database
  // For simplicity, we'll assume a 'notes' table with columns 'username' and 'note'
  pool.query('INSERT INTO notes (username, note) VALUES ($1, $2)', [username, note], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(`Note added for ${username}`);
  });
});

// Notes viewing endpoint
app.get('/notes', (req, res) => {
  const { username } = req.query;

  // Implement notes retrieval logic from the database
  // For simplicity, we'll assume a 'notes' table with columns 'username' and 'note'
  pool.query('SELECT * FROM notes WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
