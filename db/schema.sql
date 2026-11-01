CREATE TABLE account (
	ID INT PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100)
);

CREATE TABLE professor (
	ID INT PRIMARY KEY,
	courses_taught TEXT[],
	office_hours VARCHAR(255),
	department VARCHAR(50),
	FOREIGN KEY (ID) REFERENCES account(ID)
);

CREATE TABLE ta (
	ID INT PRIMARY KEY,
	professor_ID INT FOREIGN KEY,
	course_ID INT,
	FOREIGN KEY (ID) REFERENCES account(ID)
);

CREATE TABLE student (
	ID INT PRIMARY KEY,
	class_schedule TEXT[],
	major VARCHAR(50),
	FOREIGN KEY (ID) REFERENCES account(ID)
);

CREATE TABLE event (
	creator_ID INT FOREIGN KEY,
	event_id INT PRIMARY KEY,
	participants TEXT[],
	time DATETIME,
	location VARCHAR(100)
);

CREATE TABLE calendar (
	events TEXT[],
	dates TEXT[]
};