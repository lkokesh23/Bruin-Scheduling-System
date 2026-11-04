// server.js
require('dotenv').config(); // 1. Load environment variables from .env file
const express = require('express');
const cors = require('cors');

// 2. Import route modules
const calendarRouter = require('./routes/viewcalendar');

const app = express();
const PORT = process.env.PORT || 5000;

// 3. Attach global middleware
app.use(cors());          // Allows your React frontend to send requests to this server
app.use(express.json());  // Parses incoming JSON request bodies

// 4. Register API route handlers
app.use('/api/calendar', calendarRouter);

// Basic health check route
app.get('/', (req, res) => {
  res.send('College Scheduling API is running...');
});

// 5. Start listening for network requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});