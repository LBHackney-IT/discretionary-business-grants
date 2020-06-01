CREATE TABLE contact (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id),
    authority contact_type NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email_address VARCHAR NOT NULL,
    telephone_number VARCHAR NOT NULL
    -- Seperate table?????
    /*
    uprn
    address first_line VARCHAR NOT NULL,
    address second_line VARCHAR NULL,
    address third_line VARCHAR NULL,
    postcode VARCHAR NOT NULL
    ward
    */
);