const express = require('express');
const router = express.Router();
const db = require('../db');

let users = [];


// Creates a new user account
function createAccount(username, email, password, major) {

    let newUser = {
        id: users.length + 1,
        username: username,
        email: email,
        password: password,
        major: major,
        events: []
    };

    users.push(newUser);
	
	router.post('/', async(req, res) => {
		const {username, email} = req.body;
		
		if (!username || !email) {
			return res.status(400).json({error: 'Username and email are required.'});
		}
		
		try {
			const query = `
				INSERT INTO account (account_id, last_name, email)
				VALUES ($1, $2) RETURNING *;
			`;
			
			const values = [id, username, email];
			
			const {rows} = await db.query(query, values);
			
			res.status(201).json(rows[0]);
		} catch (err) {
			console.error('Error inserting user:', err.stack);
			
			res status(500).json({ error: 'Internal Server Error' });
		}
	});

    return newUser;
}


// Finds a user by username
function getUser(username) {
    for(let user of users) {
        if(user.username === username){
            return user;
        }
    }
    return null;
}

//Updates the user info
funcion updateUser(userId,email,major){
    let user = getUser(username);
    if(user === null){
        return "User not found.";
    }
    user.email = email;
    user.major=major;
	
	router.patch('/users/:id', async (req, res) => {
		try {
			const query = `
				UPDATE account
				SET email = $1,
				WHERE account_id = userId;
			`;
			
			const values = [email];
			const {rows} = await db.query(query, values);
			
			res.status(201).json(rows[0]);
		} catch (err){
			console.error('Error updating user:', err.stack);
			res.status(500).json({error: 'Internal Server Error'});
		}
	});

    return "The accound has been correctly updated";
}
//change a users password
function changePassword(username, oldPassword, newPassword){
    let user = getUser(username);
    if(user ===null){
        return "User not found.";
    }
    if(user.password!== oldPassword){
        return "Wrong Password")
    }
    if(user.password==oldPassword{
        return "You already used this password, enter a new one!"
    }
    user.password=newPassword;
    return "Password is now changd.";
}

//delete the account
function deleteAccount(userId){
    let index = users.findIndex(
        user => user.username === username
        );
    if(index === -1){
        return "The user hasn't been found.";
    }
    users.splice(index,1);
	
	router.delete('/users/:id', async (req, res) => {
		try {
			const query = `
				DELETE FROM account
				WHERE account_id = $1;
			`;
			const values = [userId];
			
			const {rows} = await db.query(query, values);
			
			res.status(201).json(rows[0]);
		} catch (err){
			console.error('Error deleting user:', err.stack);
			
			res.status(500).json({error: 'Internal Server Error'});
		}
	});

    return "Account deleted.";
}

//retunrs the users
function getAllUsers(){
    return users;
}

//adds an event
function addUserEvent(username, eventId){
    let user = getUser(username);
    if(user === null){
        return "User not found.";
    }
    if(user.events.include(eventId)){
        return "The even has already been added.";
    }
    user.events.push(eventId);
	
	router.post('/users/:id', async (req, res) => {
		const {accountId, eventId} = req.body;
		if (!accountId || !eventId)
		{
			return res.status(400).json({error: 'Account id and event id are required.'});
		}
		try {
			const query = `
				INSERT INTO calendar (owner_id, event_id)
				VALUES ($1, $2);
			`;
			const values = [accountId, eventId];
			
			const {rows} = await db.query(query, values);
			res.status(201).json(rows[0]);
		} catch (err) {
			console.error('Error adding event:', err.stack);
			res.status(500).json({error: 'Internal Server Error'});
		}
	});

    return "Events added to the schedule.";
}

//removes an event
function removeUserEvent(username eventId){
let user = getUser(username);
    if(user ===null){
        return "User not found.";
    }
    let index = user.events.indexOf(eventId);
    if(index === -1){
        return "Event isn't found";
    }
    user.events.splice(index,1);
	
	router.delete('/users/:id', async (req, res) => {
		const {accountId, eventId} = req.body;
		if (!accountId || !eventId)
		{
			return res.status(400).json({error: 'Account id and event id are required.'});
		}
		try {
			const query = `
				DELETE FROM calendar
				WHERE owner_id = $1 AND event_id = $2;
			`;
			const values = [accountId, eventId];
			
			const {rows} = await db.query(query, values);
			res.status(201).json(rows[0]);
		} catch (err) {
			console.error('Error deleting event:', err.stack);
			res.status(500).json({error: 'Internal Server Error'});
		}
	});
	
    return "Event removed from schedule.";
}

module.exports = router;