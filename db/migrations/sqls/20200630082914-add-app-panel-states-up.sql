INSERT INTO application_state(id, description)
VALUES(18, 'Panel Approved - Tier 2')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(19, 'Panel - Awaiting info')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
