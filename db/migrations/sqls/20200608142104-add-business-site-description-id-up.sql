ALTER TABLE business ADD COLUMN site_description_id INTEGER NOT NULL REFERENCES site_description(id);
