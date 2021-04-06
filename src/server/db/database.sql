CREATE DATABASE quiz_database;

-- CREATE DATABASE quiz_database;
CREATE TABLE quiz (
    quiz_id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE answer (
    answer_id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quiz (quiz_id) ON DELETE CASCADE,
    answer_text VARCHAR(255) NOT NULL
);

CREATE TABLE solution (
    quiz_id INTEGER REFERENCES quiz ON DELETE CASCADE,
    answer_id INTEGER REFERENCES answer,
    PRIMARY KEY (quiz_id, answer_id)
);

INSERT INTO quiz (quiz_id, question)
VALUES (DEFAULT, 'Which of these is an African country?'),
(DEFAULT, 'How many centilitres in a litre?'),
(DEFAULT, '3x - 7 = 92 // What is x?'),
(DEFAULT, 'How many colors are there in a rainbow?'),
(DEFAULT, 'Which of these colours is NOT featured in the logo for Google?'),
(DEFAULT, 'What is the name of the three headed dog in Harry Potter and the Sorcerers Stone?');

INSERT INTO answer (answer_id, quiz_id, answer_text)
VALUES (DEFAULT, 1, 'Bolivia'),
(DEFAULT, 1, 'Myanmar'),
(DEFAULT, 1, 'Mozambique'),
(DEFAULT, 1, 'Curiba'),

(DEFAULT, 2, '100'),
(DEFAULT, 2, '10'),
(DEFAULT, 2, '10000'),
(DEFAULT, 2, '1000'),

(DEFAULT, 3, '33'),
(DEFAULT, 3, '14'),
(DEFAULT, 3, '30'),
(DEFAULT, 3, '41'),

(DEFAULT, 4, '6'),
(DEFAULT, 4, '7'),
(DEFAULT, 4, '9'),
(DEFAULT, 4, '11'),

(DEFAULT, 5, 'Yellow'),
(DEFAULT, 5, 'Blue'),
(DEFAULT, 5, 'Green'),
(DEFAULT, 5, 'Orange'),

(DEFAULT, 6, 'Fluffy'),
(DEFAULT, 6, 'Spoofy'),
(DEFAULT, 6, 'Spotty'),
(DEFAULT, 6, 'Poofy');

INSERT INTO solution (quiz_id, answer_id)
VALUES (1, 3),
(2, 5),
(3, 9),
(4, 14),
(5, 20),
(6, 21);