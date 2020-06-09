ALTER TABLE eligibility_criteria ADD COLUMN business_size_id INTEGER NOT NULL REFERENCES business_size(id);
