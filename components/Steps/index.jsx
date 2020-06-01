import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import Summary from 'components/Steps/Summary';

export const stepPath = '/step/[[...id]]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  summary: Summary
};

export const stepKeys = Object.keys(steps);
