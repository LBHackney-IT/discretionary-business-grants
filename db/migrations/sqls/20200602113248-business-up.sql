 CREATE TABLE business (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    company_structure_id  INTEGER REFERENCES business_structure(id) NOT NULL,
    company_name VARCHAR,
    trading_name VARCHAR,
    company_number VARCHAR,
    nndr_account_number VARCHAR,
    full_time_employees INT NOT NULL,
    annual_turnover INTEGER NOT NULL,
    percent_fall_in_income INTEGER NOT NULL,
    rateable_value DECIMAL,
    fixed_property_cost DECIMAL
 );
 