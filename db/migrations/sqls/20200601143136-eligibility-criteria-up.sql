CREATE TABLE eligibility_criteria (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id),
    trading_in_hackney BOOLEAN NOT NULL,
    small_micro_business BOOLEAN NOT NULL,
    trading_on_20200311 BOOLEAN NOT NULL,
    served_legal_notices BOOLEAN NOT NULL,
    received_other_grants BOOLEAN NOT NULL,
    has_fixed_property_cost BOOLEAN NOT NULL,
    rateable_limit rateable_limit_repsonse NOT NULL
);
