// options references in db/seeds.sql

export const BUSINESS_SIZE = ['Micro', 'Small', 'Other'];
export const VALID_BUSINESS_SIZE = ['Micro', 'Small'];

export const TYPE_OF_BUSINESS = [
  'Business in shared offices or workspaces without business rates assessment',
  'Business in RHL sector with a rateable value of between £51,000-£60,000 ',
  'Business whose income is directly related to RHL sector',
  'Regular market trader with fixed building costs',
  'Bed & Breakfast who pay Council Tax',
  'Charity properties who occupy a commercial property with a rateable value of £15,000 or less',
  'Ofsted registered nurseries (not within a domestic premises)'
];

export const RATEABLE_LIMIT_ANSWERS = ['Yes', 'No', 'Not Applicable'];

export const CONTACT_TYPE = [
  'Agent (Authorised to act)',
  'Owner (Sole Trader)',
  'Partner / Employee (Acting for)',
  'PSC of Registered Company (Person with significant control)',
  'Trustee (Charity)',
  'Other'
];

export const COMPANY_STRUCTURE = [
  'Charity',
  'Partnership',
  'Registered company',
  'Social enterprise',
  'Sole trader'
];

export const SITE_DESCRIPTION = [
  'Individual Office',
  'Individual Shop',
  'Market Stall',
  'Office in a Shared Workspace',
  'B&B',
  'Nursery',
  'Other'
];

export const STATE_AID_OPTION = [
  'Not Applicable',
  'Covid 19 Temporary Framework Scheme',
  'State Aid De Minimis Rule'
];

export const STATE_AID_OPTION_WITH_MORE_Q = [
  'Covid 19 Temporary Framework Scheme',
  'State Aid De Minimis Rule'
];

export const APPLICATION_STATE = [
  'Unprocessed',
  'Pre-processing',
  'Pre-processing - Awaiting info',
  'Pre-processed',
  'Pre-processing - Rejected',
  'Processing',
  'Refer to Finance',
  'Refer to Manager',
  'Processing - Awaiting info',
  'Processed - Panel Review',
  'Processed - Rejected',
  'Panel Approved',
  'Panel Rejected'
];
