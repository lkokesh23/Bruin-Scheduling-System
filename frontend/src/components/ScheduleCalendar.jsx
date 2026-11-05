import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';

export default function ScheduleCalendar({ userId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user schedule from backend
    fetch(`http://localhost:5000/api/calendar/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch schedule data');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Expected array of events but received:', data);
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching calendar events:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div style={{ padding: '20px' }}>Loading calendar...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', height: '85vh' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // Default to weekly view
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        slotMinTime="07:00:00" // Earliest time visible on grid
        slotMaxTime="21:00:00" // Latest time visible on grid
        allDaySlot={false}     // Hides the all-day section at the top
        events={events}        // Array of formatted JSON objects from Express
        
        // Custom rendering for event items inside the calendar cells
        eventContent={(eventInfo) => {
          const {location, creator, status} = eventInfo.event.extendedProps || {};
          const title = eventInfo.event.title || 'Untitled Event';
          return (
            <div style={{ padding: '2px', fontSize: '0.85em' }}>
              <strong>{eventInfo.event.title}</strong>
              {location && <div>📍 {location}</div>}
              {creator && <div>👤 {creator}</div>}
              <small>({status})</small>
            </div>
          );
        }}
      />
    </div>
  );
}