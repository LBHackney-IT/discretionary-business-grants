ALTER TABLE eligibility_criteria ADD COLUMN rateable_limit_answer_id INTEGER NOT NULL REFERENCES rateable_limit_answer(id);
