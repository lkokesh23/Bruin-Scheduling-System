/**
 * @file server.js
 * @brief Main entry point for API
 */

// server.js
require('dotenv').config(); // 1. Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetchUserEvents = require('./dbquery');
const db = require('./db');
const bcrypt = require('bcrypt');


// 2. Import route modules
const calendarRouter = require('./routes/viewcalendar');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('view cache');

app.use(express.static(
  'public',
  {
    maxAge: '1d',
    etag: true
  }
));

/**
 * Server listening port
 * @type {number|string}
 */
const PORT = process.env.PORT || 5000;

// 3. Attach global middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 4. Register API route handlers
app.use('/api/calendar', calendarRouter);

let counter = 1

app.get('/', (req, res) => {
  res.render('home.ejs')
});

app.get('/login', (req, res) => {
  res.render('login.ejs')
});

app.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      `SELECT account_id, password_hash
      FROM account
      WHERE email = $1`,
      [email]
    );

    if (result.rows.lenth === 0) {
      return res.status(401).send('Invalid email or password.');
    }

    const account = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      account.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).send('Invalid email or password.');
    }

    res.redirect(`/calendar/${account.account_id}`);
  }

  catch(err) {
    console.error(err);
    res.status(500).send('Something went wrong logging in.');
  }
})

app.get('/add_event', (req, res) => {
  res.render('add_event.ejs')
});

app.get('/create_account', (req, res) => {
  res.render('create_account.ejs')
});

app.post('/create_account', async(req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.')
  }

  try {
    const existingAccount = await db.query(
      `SELECT account_id FROM account WHERE email = $1`,
      [email]
    );
    if (existingAccount.rows.length > 0) {
      return res.status(400).send('That email is already registered.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO account (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, email, passwordHash]
    );

    return res.redirect('/login');
  }

  catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong creating your account.');
  }
});

app.get('/public_event_dir', (req, res) => {
  res.render('public_event_dir.ejs')
});

app.get('/forgot_password', (req, res) => {
  res.render('forgot_password.ejs')
});

app.get('/calendar/:userId', async (req, res) => {
  const {userId} = req.params
  try {
    const userEvents = await fetchUserEvents(userId) || []

    console.log(userEvents, userId)

    res.render('userevents', {userEvents})
  } catch (err) {
    console.error(err)
    res.status(500).send("Oh Noes")
  }
})

app.get('/test', (req, res) => {
  res.send('You are running the updated server.js!');
});

// 5. Start listening for network requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
