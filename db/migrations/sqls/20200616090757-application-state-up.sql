CREATE TABLE application_state (
    id INTEGER PRIMARY KEY,
    description VARCHAR NOT NULL
);


INSERT INTO application_state(id, description) VALUES(1, 'Unprocessed');
INSERT INTO application_state(id, description) VALUES(2, 'Pre-processing');
INSERT INTO application_state(id, description) VALUES(3, 'Pre-processing - Awaiting info');
INSERT INTO application_state(id, description) VALUES(4, 'Pre-processed');
INSERT INTO application_state(id, description) VALUES(5, 'Pre-processing - Rejected');
INSERT INTO application_state(id, description) VALUES(6, 'Processing');
INSERT INTO application_state(id, description) VALUES(7, 'Refer to Finance');
INSERT INTO application_state(id, description) VALUES(8, 'Refer to Manager');
INSERT INTO application_state(id, description) VALUES(9, 'Processing - Awaiting info');
INSERT INTO application_state(id, description) VALUES(10, 'Processed - Panel Review');
INSERT INTO application_state(id, description) VALUES(11, 'Processed - Rejected');
INSERT INTO application_state(id, description) VALUES(12, 'Panel Approved');
INSERT INTO application_state(id, description) VALUES(13, 'Panel Rejected');
