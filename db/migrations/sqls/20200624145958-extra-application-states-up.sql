INSERT INTO application_state (id, description)
VALUES(16, 'Exported for Payment')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state (id, description)
VALUES(17, 'Declined - Test')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
