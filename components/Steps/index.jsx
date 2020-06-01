import Step1 from 'components/Steps/1';
import Step2 from 'components/Steps/2';
import Step3 from 'components/Steps/3';
import Result from 'components/Steps/result';

export const stepPath = '/step/[[...id]]';

export const steps = {
  'eligibility-criteria': Step1,
  'your-details': Step2,
  'business-details': Step3,
  result: Result
};

export const stepKeys = Object.keys(steps);
