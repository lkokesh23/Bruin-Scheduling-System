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

    return newUser;
}


// Finds a user by username
function getUser(username) {
