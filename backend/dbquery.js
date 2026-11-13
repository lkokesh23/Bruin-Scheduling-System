const db = require('./db');


async function fetchUserEvents(userId) {
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

	return formattedEvents;
}


module.exports = fetchUserEvents