CREATE TABLE business_bank_account (
    id serial PRIMARY KEY,
    business_id INTEGER REFERENCES business(id) NOT NULL,
    bank_name VARCHAR NOT NULL,
    account_holder VARCHAR NOT NULL,
    account_number VARCHAR  NOT NULL,
    account_sortcode VARCHAR NOT NULL
);
