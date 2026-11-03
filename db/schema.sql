CREATE TABLE account (
	account_id INT PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100)
);

CREATE TABLE professor (
	account_id INT PRIMARY KEY,
	office_hours VARCHAR(255),
	department VARCHAR(50),
	FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE ta (
	account_id INT PRIMARY KEY,
	professor_id INT,
	course_id INT,
	FOREIGN KEY (account_id) REFERENCES account(account_id),
	FOREIGN KEY (professor_id) REFERENCES professor(account_id)
);

CREATE TABLE student (
	account_id INT PRIMARY KEY,
	major VARCHAR(50),
	FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE event (
	event_id INT PRIMARY KEY,
	creator_id INT,
	time TIMESTAMP,
	location VARCHAR(100),
	
	FOREIGN KEY (creator_id) REFERENCES account(account_id)
);

CREATE TABLE calendar (
	owner_id INT,
	event_id INT,
	status VARCHAR(20) DEFAULT 'Pending',
	
	PRIMARY KEY (owner_id, event_id),
	
	FOREIGN KEY (owner_id) REFERENCES account(account_id),
	FOREIGN KEY (event_id) REFERENCES event(event_id)
);