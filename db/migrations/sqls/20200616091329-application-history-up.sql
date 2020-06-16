CREATE TABLE application_history (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    date_time_recorded TIMESTAMP DEFAULT NOW(),
    user_recorded VARCHAR NOT NULL,
    notes VARCHAR
);
