INSERT INTO application_history
(grant_application_id, date_time_recorded, user_recorded, notes)
SELECT ga.id, ga.date_time_recorded, 'system', 'Application Received'
FROM grant_application ga
WHERE ga.id NOT IN (SELECT DISTINCT grant_application_id FROM application_history)
ORDER BY ga.id;
