-----------------------------------------------------------------------------
-- Dev helper script to delete all entered records
-- This will help re-running of migrations when constraint violations occur.
--
-- Does not remove seed data
-- Documents in s3 will still exist!
-----------------------------------------------------------------------------

DELETE FROM document_upload;
DELETE FROM declaration;
DELETE FROM business_bank_account;
DELETE FROM business_address;
DELETE FROM business;
DELETE FROM contact_address;
DELETE FROM contact;
DELETE FROM eligibility_criteria;
DELETE FROM grant_application;
