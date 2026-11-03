# Bruin-Scheduling-System
CSIS 321 Software Engineering Project

## <ins>**What are you building?**</ins>
A scheduling system for George Fox University.

## <ins>**Why are you building it?**</ins>
Because it is important to have a uniform and organized way 
to schedule meetings and events across the organization.

## <ins>**How is the repository organized?**</ins>
It will be readable, concise, and each file will be labeled with a completion/worked on date.


# Major Components:

**User Interface** - Interacts with the user, built using React.\
**Database** - PostgreSQL: Stores data about user schedules and event details.\
**Calendar API** - Google Calendar API: Used to incorporate the pre-made calendar structure into our project.\
**Authentication Interface** - Ensures only GFU staff and students can log in\
**Backend** - Node.js: A server-side runtime environment that allows us to seamlessly use JavaScript between this and React.

# Interfaces
User Interface interacts with the Backend to change schedules, add events, and do anything else done by the system.\
The Backend interacts with the Database to store and query data needed for its operations.\
The authentication interface interacts with the backend to check if the credentials are valid.\
The user interface interacts with the Calendar API to have clear operations for the user.\
The Calendar API interacts with the backend to help manage schedules and calendar operations.

# What data our system stores and how
For our system, we will be storing user information, event dates and times, collaboration history, and login info. All of our data will be stored in PostgreSQL, which is an open-source database management system. We settled on PostgreSQL because of the ease of use and extensibility, which fits well into the constraints of our project.

# High-Level Database Schema

## Student - Account

| Attribute | Data Type | Constraints |
|---|---|---|
| student_ID | Integer | Primary Key |
| name | String | |
| email | String | |
| major | String | |

## Professor - Account

| Attribute | Data Type | Constraints |
|---|---|---|
| employee_ID | Integer | Primary Key |
| name | String | |
| email | String | |
| coursesTaught | String[] | |
| officeHours | String | |

## TA - Account

| Attribute | Data Type | Constraints |
|---|---|---|
| student_ID | Integer | Primary Key |
| name | String | |
| email | String | |
| major | String | |
| TA_Courses | String[] | |

## Event - Calendar

| Attribute | Data Type | Constraints |
|---|---|---|
| participants | String[] | |
| time | String | |
| location | String | |
| date | String | |

## Calendar

| Attribute | Data Type | Constraints |
|---|---|---|
| events | String[] | |
| dates | String[] | |

George Fox University CS/IS/Cyber Java Coding Style Guidelines\
https://bwilson.cs.georgefox.edu/GFUCodingStyleDoc.pdf \
JavaScript Standard Style\
https://standardjs.com \
PostgreSQL\
React\
Node.js

We chose the first set of guidelines for Java because they are set by the university and fit well with the project we are going for. The guidelines outline a clear path that we can adhere to, so that the code is clear to read and efficient to write.\

We chose the official JavaScript language guidelines because of the streamlined and widely used boundaries it sets. Because so many different companies and people use the official JavaScript style, we decided to also use it. This way, when others read our code and view our project, there will be consistency between our project and other projects.\

We plan to enforce both the Java and JavaScript guidelines by either weekly or bi-weekly combing over the code with the guidelines. This makes sure we adhere as fully as possible to the rules they set.\
