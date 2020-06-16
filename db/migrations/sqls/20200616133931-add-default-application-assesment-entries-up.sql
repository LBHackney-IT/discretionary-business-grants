INSERT INTO application_assessment
(grant_application_id, application_state_id, validations)
SELECT ga.id, 1, '{}'
FROM grant_application ga
WHERE ga.id NOT IN (SELECT DISTINCT grant_application_id FROM application_assessment)
ORDER BY ga.id;
