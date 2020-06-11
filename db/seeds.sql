INSERT INTO rateable_limit_answer (description) VALUES('Yes');
INSERT INTO rateable_limit_answer (description) VALUES('No');
INSERT INTO rateable_limit_answer (description) VALUES('Not Applicable');

INSERT INTO contact_type (description) VALUES ('Agent (Authorised to act)');
INSERT INTO contact_type (description) VALUES ('Owner (Sole Trader)');
INSERT INTO contact_type (description) VALUES ('Partner / Employee (Acting for)');
INSERT INTO contact_type (description) VALUES ('PSC of Registered Company (Person with significant control)');
INSERT INTO contact_type (description) VALUES ('Trustee (Charity)');
INSERT INTO contact_type (description) VALUES ('Other');

INSERT INTO business_structure (description) VALUES('Charity');
INSERT INTO business_structure (description) VALUES('Partnership');
INSERT INTO business_structure (description) VALUES('Registered company');
INSERT INTO business_structure (description) VALUES('Social enterprise');
INSERT INTO business_structure (description) VALUES('Sole trader');

INSERT INTO business_type(id, description) VALUES(1, 'Small or micro business in shared offices or workspaces without town business rates assessment');
INSERT INTO business_type(id, description) VALUES(2, 'Small or micro businesses in the retail, hospitality and leisure sector with a rateable value of between £51,000-£60,000 (inclusive)');
INSERT INTO business_type(id, description) VALUES(3, 'Small or micro business whose income and turnover is directly related to the Retail, Hospitality and Leisure sector');
INSERT INTO business_type(id, description) VALUES(4, 'Regular market trader with fixed building costs');
INSERT INTO business_type(id, description) VALUES(5, 'Bed & Breakfast who pay Council Tax');
INSERT INTO business_type(id, description) VALUES(6, 'Charity properties who occupy a commercial property with a rateable value of £15,000 or less');
INSERT INTO business_type(id, description) VALUES(7, 'Ofsted registered nurseries (not within a domestic premises)');


INSERT INTO site_description(id, description) VALUES(1, 'Individual Office');
INSERT INTO site_description(id, description) VALUES(2, 'Individual Shop');
INSERT INTO site_description(id, description) VALUES(3, 'Market Stall');
INSERT INTO site_description(id, description) VALUES(4, 'Office in a Shared Workspace');
INSERT INTO site_description(id, description) VALUES(5, 'B&B');
INSERT INTO site_description(id, description) VALUES(6, 'Nursery');
INSERT INTO site_description(id, description) VALUES(7, 'Other');

INSERT INTO business_size(id, description) VALUES(1, 'Micro');
INSERT INTO business_size(id, description) VALUES(2, 'Small');
