/**
 * @file routes/viewcalendar.js
 * @brief Express router for fetching and formatting calendar event data
 * @details Queries the database for events relates to a certain user, and puts the result in a usable format

 * @module routes/viewcalendar
 */

//routes/viewcalendar.js
const express = require('express');
const router = express.Router();
const db = require('../db');

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
		const query = `
			SELECT 
				e.event_id,
				e.location,
				e.time AS start_time,
				c.status,
				acc.first_name || ' ' || acc.last_name AS creator_name
			FROM calendar c
			JOIN event e ON c.event_id = e.event_id
			JOIN account acc ON e.creator_id = acc.account_id
			WHERE c.owner_id = $1
			ORDER BY e.time ASC;
		`;
		
		const { rows } = await db.query(query, [userId]);
		const formattedEvents = rows.map((row) => {
	
			const startDate = new Date(row.start_time);
			  
			  
			const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
		
			return {
				id: String(row.event_id),
				title: `Event at ${row.location}`, 
				start: startDate.toISOString(),   
				end: endDate.toISOString(),
				
				
				extendedProps: {
				  location: row.location,
				  status: row.status,
				  creator: row.creator_name,
				},
				
				
				backgroundColor: row.status === 'Accepted' ? '#28a745' : '#ffc107',
				borderColor: row.status === 'Accepted' ? '#1e7e34' : '#d39e00'
			  };
		});
	
		
		res.json(formattedEvents);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Database query failed' });
	}
});

module.exports = router;
