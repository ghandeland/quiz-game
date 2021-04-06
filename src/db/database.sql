CREATE DATABASE quiz_database;

-- CREATE DATABASE quiz_database;
CREATE TABLE quiz (
    quiz_id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE answer (
    answer_id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quiz (quiz_id) ON DELETE CASCADE,
    answer_text VARCHAR(255) NOT NULL,
    question VARCHAR(255) NOT NULL
);

CREATE TABLE solution (
    quiz_id INTEGER REFERENCES quiz ON DELETE CASCADE,
    answer_id INTEGER REFERENCES answer,
    PRIMARY KEY (quiz_id, answer_id)
);


