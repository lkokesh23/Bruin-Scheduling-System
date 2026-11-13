// basic learning foundation.

/*
 * @determineAccountType find wether the user is a teacher or student
 * @param users email
 * @return account type
 */
function determineAccountType(email)
{
    // Declare before 
    let account_Type
    let email_Name
    let last_Two_Characters

    // Verify GFU email
    if (!email.endsWith('@georgefox.edu'))
    {
        throw new Error('Must be GFU email')
    }

    // Split email before the @ symbol
    email_Name = email.split('@')[0];

    // Splice string for the last 2 characters of the email
    last_Two_Characters = email_Name.slice(-2);

    // Check to see if number 
    if (Number.isInteger(Number(last_Two_Characters)))
    {
        account_Type = 'Student';
    }

    // Else is a proffessor 
    else
    {
        account_Type = 'Professor'
    }

    return account_Type;
}


/*
 * @createAccount checks for valid inputs and assigns account information
 * @PARAM first_Name first name of user
 * @PARAM last_Name last name of user 
 * @PARAM email user email
 * @return account information
 */
export function createAccount(username, first_Name, last_Name, email, password)
    {
        let accountType;
        if(!username || !first_Name || !last_Name || !email || !password)
        {
            throw new Error ("First name, last name, and email required")
        }

        accountType = determineAccountType(email);

        return{   
            // Assign all information for user
            username: username,
            first_Name: first_Name,
            last_Name: last_Name,
            email: email,
            password: password,
            accountType: accountType
        }
    }

