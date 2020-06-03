CREATE TABLE document_upload (
    id serial PRIMARY KEY,
    grant_application_id INTEGER REFERENCES grant_application(id) NOT NULL,
    s3_path VARCHAR NOT NULL,
    document_type VARCHAR NOT NULL
);
