ALTER TABLE grant_application ALTER COLUMN date_time_recorded DROP DEFAULT;
ALTER TABLE grant_application ALTER COLUMN date_time_recorded DROP NOT NULL;
