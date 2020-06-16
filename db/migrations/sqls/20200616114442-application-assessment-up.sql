CREATE TABLE application_assessment (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    application_state_id  INTEGER REFERENCES application_state(id) NOT NULL,
    validations TEXT
);

CREATE UNIQUE INDEX grant_application_id_idx ON application_assessment(grant_application_id);
