CREATE TABLE student_account (
	student_ID INT PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
	major VARCHAR(50)
);

CREATE TABLE professor_account (
	employee_ID INT PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
);

CREATE TABLE professor (
	professor_ID INT FOREIGN KEY,
	courses_taught TEXT[],
	office_hours VARCHAR(255)
);

CREATE TABLE ta (
	student_ID INT FOREIGN KEY,
	professor_ID INT FOREIGN KEY,
	course_ID INT
);

CREATE TABLE student (
	student_ID INT FOREIGN KEY,
	class_schedule TEXT[]
);

CREATE TABLE event (
	event_id INT PRIMARY KEY,
	participants TEXT[],
	time DATETIME,
	location VARCHAR(100)
);

CREATE TABLE calendar (
	events TEXT[],
	dates TEXT[]
};