INSERT INTO application_history
(grant_application_id, application_state_id, date_time_recorded, user_recorded, notes)
SELECT ga.id, 1, ga.date_time_recorded, 'system', 'Application Received'
FROM grant_application ga
WHERE ga.id NOT IN (select distinct grant_application_id from application_history)
ORDER BY ga.id;
