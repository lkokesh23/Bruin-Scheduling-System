
/*
 * Events.js
 * University Scheduling System
 * Events management section
 * I used about 25% ai, to learn javascript and organize what I need to get done, along with ideas for the code.
 */

// Stores all university events
let events = [
    {
        id: 1,
        title: "Computer Science Study Group",
        description: "Meet up to study for our upcoming exam.",
        date: "2026-11-05",
        startTime: "15:00",
        endTime: "16:30",
        location: "Library Room 201",
        organizer: "Kaeden",
        attendees: ["Kaeden", "bob"],
        maxAttendees: 10,
        category: "Study Group"
    },
];


// Creates a new event
function createEvent(title, description, date, startTime,
                     endTime, location, organizer,
                     maxAttendees, category) {

    let newEvent = {
        id: Date.now(),
        title: title,
        description: description,
        date: date,
        startTime: startTime,
        endTime: endTime,
        location: location,
        organizer: organizer,
        attendees: [organizer],
        maxAttendees: maxAttendees,
        category: category
    };

    events.push(newEvent);

    return newEvent;
}


// Returns all events
function getAllEvents() {
    return events;
}


// Finds an event by its ID
function getEventById(id) {

    for (let event of events) {
        if (event.id === id) {
            return event;
        }
    }

    return null;
}


// Searches events by title
function searchEvents(searchText) {

    let results = [];

    for (let event of events) {

        if (event.title.toLowerCase()
            .includes(searchText.toLowerCase())) {

            results.push(event);
        }
    }

    return results;
}


// Filters events by category
function filterEvents(category) {

    let results = [];

    for (let event of events) {

        if (event.category === category) {
            results.push(event);
        }
    }

    return results;
}


// Adds a student to an event
function joinEvent(eventId, studentName) {

    let event = getEventById(eventId);

    if (event === null) {
        return "Event not found.";
    }

    if (event.attendees.includes(studentName)) {
        return "You are already attending this event.";
    }

    if (event.attendees.length >= event.maxAttendees) {
        return "This event is full.";
    }

    event.attendees.push(studentName);

    return "Successfully joined the event!";
}


// Removes a student from an event
function leaveEvent(eventId, studentName) {

    let event = getEventById(eventId);

    if (event === null) {
        return "Event not found.";
    }

    let index = event.attendees.indexOf(studentName);

    if (index === -1) {
        return "You are not attending this event.";
    }

    event.attendees.splice(index, 1);

    return "Successfully left the event.";
}


// Deletes an event
function deleteEvent(eventId, currentUser) {

    let index = events.findIndex(
        event => event.id === eventId
    );

    if (index === -1) {
        return "Event not found.";
    }

    // Only the organizer can delete the event
    if (events[index].organizer !== currentUser) {
        return "You cannot delete someone else's event.";
    }

    events.splice(index, 1);

    return "Event successfully deleted.";
}


// Returns events a student is attending
function getMyEvents(studentName) {

    let results = [];

    for (let event of events) {

        if (event.attendees.includes(studentName)) {
            results.push(event);
        }
    }

    return results;
}


// Returns events happening on a specific date
function getEventsByDate(date) {

    let results = [];

    for (let event of events) {

        if (event.date === date) {
            results.push(event);
        }
    }

    return results;
}


// Checks if two events overlap
//gives a message if this happens.
function eventsOverlap(event1, event2) {

    if (event1.date !== event2.date) {
        return false;
    }

    return event1.startTime < event2.endTime &&
           event2.startTime < event1.endTime;
}
