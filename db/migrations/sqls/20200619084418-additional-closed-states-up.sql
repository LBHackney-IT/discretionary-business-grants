INSERT INTO application_state (id, description)
VALUES(14, 'Closed - Duplicate')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state (id, description)
VALUES(15, 'Closed - Resubmitting')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
