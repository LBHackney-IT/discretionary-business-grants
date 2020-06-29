INSERT INTO application_state(id, description)
VALUES(7, 'Panel Approved - Waiting for Bank Statement')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
