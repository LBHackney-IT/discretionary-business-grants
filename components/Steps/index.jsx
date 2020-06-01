import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import Result from 'components/Steps/Result';

export const stepPath = '/step/[[...id]]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  result: Result
};

export const stepKeys = Object.keys(steps);
