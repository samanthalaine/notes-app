CREATE DATABASE notes_app;

CREATE TABLE notes(
    note_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);