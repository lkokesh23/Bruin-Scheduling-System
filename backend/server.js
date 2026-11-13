/**
 * @file server.js
 * @brief Main entry point for API
 */

// server.js
require('dotenv').config(); // 1. Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetchUserEvents = require('./dbquery')


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

app.get('/add_event', (req, res) => {
  res.render('add_event.ejs')
});

app.get('/create_account', (req, res) => {
  res.render('create_account.ejs')
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
