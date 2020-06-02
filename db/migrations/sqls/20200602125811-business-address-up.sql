CREATE TABLE business_address (
    id serial PRIMARY KEY,
    business_id INTEGER REFERENCES business(id) NOT NULL,
    uprn VARCHAR NOT NULL,
    first_line VARCHAR NOT NULL,
    second_line VARCHAR,
    third_line VARCHAR,
    postcode VARCHAR NOT NULL
);
