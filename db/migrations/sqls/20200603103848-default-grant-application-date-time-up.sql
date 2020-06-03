ALTER TABLE grant_application ALTER COLUMN date_time_recorded SET NOT NULL;
ALTER TABLE grant_application ALTER COLUMN date_time_recorded SET DEFAULT now();
