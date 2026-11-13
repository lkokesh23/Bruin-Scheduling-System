/**
 * @file routes/viewcalendar.js
 * @brief Express router for fetching and formatting calendar event data
 * @details Queries the database for events relates to a certain user, and puts the result in a usable format

 * @module routes/viewcalendar
 */

//routes/viewcalendar.js
const express = require('express');
const router = express.Router();
const fetchUserEvents = require('../dbquery')

/**
 * @route GET /api/calendar/:userId
 * @brief Queries the database for all schedules events for a user
 * @details JOINs calendar, event, and account to retrieve event_id, location, time, status, and creator_name
 * @param {string} req.params.userId the calendar owner's account id
 * @returns {Array<Object>} 200 Array of event objects with the necessary information
 * @returns {Object} 500 error message if the query fails
 */
router.get('/:userId', async (req, res) => {
	const {userId} = req.params;
	try {
		const formattedEvents = await fetchUserEvents(userId)
		res.json(formattedEvents);
	} catch(e) {
		console.error(err);
		res.status(500).json({ error: 'Database query failed' });
	}
	
});


module.exports = router;
