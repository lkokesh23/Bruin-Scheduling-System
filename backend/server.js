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
app.use(cors());          // Allows React frontend to send requests to this server
app.use(express.json());  // Parses incoming JSON request bodies

// 4. Register API route handlers
app.use('/api/calendar', calendarRouter);

let counter = 1

// Basic health check route
app.get('/', (req, res) => {
  counter++
  res.render('index', {counter})
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


// 5. Start listening for network requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
