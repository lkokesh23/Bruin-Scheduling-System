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
    for(let user of users) {
        if(user.username === username){
            return user;
        }
    }
    return null;
}

//Updates the user info
funcion updateUser(username,email,major){
    let user = getUser(username);
    if(user === null){
        return "User not found.";
    }
    user.email = email;
    user.major=major;

    return "Account updated";
}
//change a users password
function changePassword(username, oldPassword, newPassword){
    let user = getUser(username);
    if(user ===null){
        return "User not found.";
    }
    if(user.password!== oldPassword){
        return "Wrong Password)
    }
    user.password=newPassword;
    return "Password is now changd.";
