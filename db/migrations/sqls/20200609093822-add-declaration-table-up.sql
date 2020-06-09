CREATE TABLE declaration (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    state_aid_received DECIMAL(11,2),
    state_aid_cap_not_exceeded BOOLEAN NOT NULL,
    permitted_to_accept_state_aid_grant BOOLEAN NOT NULL,
    read_understood_declaration BOOLEAN NOT NULL
);
