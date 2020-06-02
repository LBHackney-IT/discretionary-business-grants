CREATE TABLE contact (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    contact_type_id INTEGER REFERENCES contact_type(id) NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email_address VARCHAR NOT NULL,
    telephone_number VARCHAR NOT NULL
);
