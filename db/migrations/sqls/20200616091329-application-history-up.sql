CREATE TABLE application_history (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    application_state_id  INTEGER REFERENCES application_state(id) NOT NULL,
    date_time_recorded TIMESTAMP DEFAULT NOW(),
    user_recorded VARCHAR NOT NULL,
    comment VARCHAR
);
