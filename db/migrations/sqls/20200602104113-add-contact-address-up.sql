CREATE TABLE contact_address (
    id serial PRIMARY KEY,
    contact_id INTEGER REFERENCES contact(id) NOT NULL,
    uprn VARCHAR,
    first_line VARCHAR NOT NULL,
    second_line VARCHAR,
    third_line VARCHAR,
    postcode VARCHAR,
    ward VARCHAR
);
