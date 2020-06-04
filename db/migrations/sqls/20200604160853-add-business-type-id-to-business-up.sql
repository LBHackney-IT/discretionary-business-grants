ALTER TABLE eligibility_criteria ADD COLUMN business_type_id INTEGER NOT NULL REFERENCES business_type(id);
