CREATE DATABASE osuji_chioma;

CREATE TABLE candidates(user_id SERIAL PRIMARY KEY,
firstname VARCHAR(100) NOT NULL,
surname VARCHAR(100) NOT NULL,
phone_number VARCHAR(50) NOT NULL,
email_address VARCHAR(100) NOT NULL,
state_of_origin VARCHAR(50) NOT NULL,
local_government VARCHAR(50) NOT NULL,
passport_photograph VARCHAR(255) NOT NULL
);

CREATE table adminPage(user_id SERIAL,
email VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL
);

INSERT INTO adminPage(email, password) VALUES('admin@hicad.com', 'password1');