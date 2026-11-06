// basic learning foundation.

/*
 * @createAccount checks for valid inputs and assigns account information
 * @PARAM first_Name first name of user
 * @PARAM last_Name last name of user 
 * @PARAM email user email
 * @return filled variables
 */
export function createAccount(first_Name, last_Name, email)
    {
        if(!first_Name || !last_Name || !email)
        {
            throw new Error ("First name, last name, and email required")
        }

        
        return
        {
            this.email = email;
            this.username = username;
            this.password = password;
            // still need account type between ta/prof/student
            // as well as if username should differentiated. 
            // TO-DO talk with team on how differentiate going forward.
        }
    }

