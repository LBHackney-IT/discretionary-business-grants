import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BusinessTurnover from 'components/Steps/BusinessTurnover';
import PropertyCost from 'components/Steps/PropertyCost';
import BankDetails from 'components/Steps/BankDetails';
import Declaration from 'components/Steps/Declaration';
import Summary from 'components/Steps/Summary';

import TypeOfBusinessSummary from 'components/Steps/Summaries/TypeOfBusiness';
import BusinessClassificationSummary from 'components/Steps/Summaries/BusinessClassification';
import DeclarationSummary from 'components/Steps/Summaries/Declaration';

import * as options from 'lib/dbMapping';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  'business-turnover': BusinessTurnover,
  'property-costs': PropertyCost,
  'supplementary-information': SupplementaryInformation,
  'bank-details': BankDetails,
  declaration: Declaration,
  summary: Summary
};

export const inputLabels = {
  eligibilityCriteria: {
    tradingInHackney: {
      label: 'Is your business based in and trading in Hackney?',
      validation: { required: true }
    },
    businessSizeId: {
      label: 'Is your business classed as either a micro or small business?',
      children: <BusinessClassificationSummary />,
      options: options.BUSINESS_SIZE,
      validation: { required: true }
    },
    tradingOn20200311: {
      label: 'Was your business trading on the 11th March 2020?',
      validation: { required: true }
    },
    typeOfBusinessId: {
      label: 'Type of business',
      options: options.TYPE_OF_BUSINESS,
      children: <TypeOfBusinessSummary />,
      validation: {
        required: true,
        validate: value => value !== ''
      }
    },
    servedLegalNotices: {
      label:
        'Is your business in administration, insolvent or in receipt of a striking off notice?',
      validation: { required: true }
    },
    receivedOtherGrants: {
      label:
        'Has your business either received or is eligible for either a Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund.',
      hint:
        'Businesses must not be eligible for the existing Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund to be considered for this grant',
      validation: { required: true }
    },
    hasFixedPropertyCost: {
      label:
        'Does your business have fixed property cost of £60,000 per year or below?',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader).',
      validation: { required: true }
    },
    significantIncomeFall: {
      label:
        'Has your business experienced a SIGNIFICANT fall in income as a result of Covid-19?',
      validation: { required: true }
    },
    rateableLimitAnswerId: {
      label:
        'If you have an individual business rates account does your premises have a rateable value of £60,000 or less?',
      options: options.RETEABLE_LIMIT_ANSWER,
      validation: { required: true }
    }
  },
  contact: {
    contactTypeId: {
      label: 'Role/position in organisation:',
      options: options.CONTACT_TYPE,
      validation: {
        required: true,
        validate: value => value !== ''
      }
    },
    firstName: {
      label: 'First Name:',
      validation: {
        required: true
      }
    },
    lastName: {
      label: 'Last Name:',
      validation: {
        required: true
      }
    },
    emailAddress: {
      label: 'Email Address:',
      validation: {
        required: true
      },
      type: 'email'
    },
    telephoneNumber: { label: 'Contact Telephone Number:', type: 'tel' },
    address: { label: 'Address:' }
  },
  business: {
    businessName: {
      label: 'Business name:',
      hint: '(trading name, etc)',
      validation: {
        required: true
      }
    },
    registeredName: { label: 'Registered Name (if applicable):' },
    businessDescription: {
      label: 'Business activity:',
      hint:
        'Please set out what your business does and the service/services it provides.'
    },
    businessAddress: {
      label: 'Business Premises Address:',
      supportManualEntry: false
    },
    siteDescriptionId: {
      label: 'Business description:',
      hint:
        '(e.g shared office, shared workspace, individual shop, individual office, market stall etc)',
      options: options.SITE_DESCRIPTION,
      validation: { required: true, validate: value => value !== '' }
    },
    companyNumber: {
      label: 'Company number (if applicable)',
      type: 'number'
    },
    companyStructureId: {
      label: 'Business Structure:',
      options: options.COMPANY_STRUCTURE,
      validation: { required: true, validate: value => value !== '' }
    },
    ratesAccountNumber: {
      label: 'Business Rates Account Number (if applicable):'
    },
    registeredCharity: {
      label: 'Registered Charity Number (if applicable):',
      type: 'number'
    },
    councilRentAccountNumber: {
      label: 'Council premises rent account number (if applicable):',
      type: 'number'
    },
    councilTaxNumber: {
      label: 'Council tax number (if applicable):',
      hint: '(eg if you are a B&B)',
      type: 'number'
    },
    fullTimeEmployees: {
      label: 'Number of Employees:',
      type: 'number',
      validation: { required: true, min: 0 }
    },
    percentageFallInIncome: {
      label: 'Percentage fall in income due to Covid-19:',
      type: 'number',
      hint:
        'Please give an indication of your percentage fall in income as a result of Covid-19. This should be from March 2020 onwards compared to the previous 3 months e.g 50= 50% fall in income, 70= 75% fall in income.',
      validation: { required: true, min: 0, max: 100 }
    },
    rateableValue: {
      label: 'Business premises rateable value (if applicable):',
      type: 'number',
      validation: { min: 0 }
    }
  },
  turnover: {
    turnover: {
      label: 'Business turnover March to May (inclusive) 2020:',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: true, min: 0 }
    },
    year1819: {
      label: 'Financial Year 18/19',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: true, min: 0 }
    },
    year1920: {
      label: 'Financial Year 19/20',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: true, min: 0 }
    }
  },
  fixedPropertyCosts: {
    year2018To2019: {
      label: 'Financial Year 18/19',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: true, min: 0 }
    },
    year2019To2020: {
      label: 'Financial Year 19/20',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: true, min: 0 }
    },
    itemsIncluded: {
      label: 'Items included:',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader) that is at least 30% of the annual business turnover.',
      validation: { required: true }
    }
  },
  businessBankAccount: {
    bankName: {
      label: 'Bank Name:',
      validation: { required: 'Bank Name is required' }
    },
    accountHolder: {
      label: 'Account Holder Name:',
      validation: { required: 'Account Holder Name is required' }
    },
    accountNumber: {
      inputClassName: 'govuk-input--width-10',
      label: 'Account Number:',
      inputMode: 'numeric',
      validation: {
        required: 'Account Number is required',
        pattern: {
          value: /^[0-9]{8}$/,
          message: 'Account Number must be a 8 digit number'
        }
      }
    },
    accountSortcode: {
      inputClassName: 'govuk-input--width-5',
      label: 'Sort Code:',
      inputMode: 'numeric',
      validation: {
        required: 'Sort Code is required',
        pattern: {
          value: /^[0-9]{6}$/,
          message: 'Sort Code must be a 6 digit number'
        }
      }
    }
  },
  declaration: {
    stateAidOptionId: {
      label: 'State Aid',
      hint:
        '(If relevant to this application, please select whether you the Covid-19 Framework Scheme or the State Aid De Minimus Rule applies.)',
      children: <DeclarationSummary />,
      isRadiosInline: false,
      options: options.STATE_AID_OPTION,
      validation: { required: true }
    },
    dateOfAid: { label: 'Date of aid' },
    stateAidReceived: {
      label:
        'I/we have received the following value of State Aid under above rule',
      type: 'number',
      validation: { required: true }
    },
    organisationProvidingAid: {
      label: 'Organisation/Body providing aid',
      validation: { required: true }
    },
    permittedToAcceptStateAidGrant: {
      label:
        'I/we declare that I/we are permitted to accept the discretionary grant funding and does not exceed the cap under the above relevant state aid rule',
      validation: {
        required: 'You need to agree.',
        validate: value => value === 'Yes' || 'You need to agree.'
      }
    },
    readUnderstoodDeclaration: {
      label: 'Tick to confirm you have read and understood the declaration'
    }
  },
  supplementaryInformation: {
    businessAccounts: {
      label: 'Business Accounts:',
      hint:
        'Please provide a company of the business accounts for the financial year 2018/19 (or your HMRC self assessment tax return for the financial year 2018/19). If not available please provide what is available'
    },
    fixedPropertyCosts: {
      label: 'Fixed Property costs:',
      hint:
        'Please provide evidence of your ongoing fixed property costs (such as the lease, licence, rental agreement or mortgage statement for the business premises)'
    },
    fallInIncome: {
      label: 'Fall in income:',
      hint:
        ' Please provide financial evidence showing the fall in income experienced by your business as a result of Covid-19 (such as; up to date business management accounts for the last 12 months showing profit and loss, turnover, cashflow and balance sheet. Bank statements over the past 6 months)'
    },
    identity: {
      label: 'Identity',
      hint:
        'Please provide a form of photo identification such as a passport or driving licence'
    },
    payrollInformation: {
      label: 'Payroll Information',
      hint:
        'If available please provide your business payroll information for the last 6 months showing the number of people employed and paid by the business'
    }
  }
};

export const getInputProps = (form, name, register, errors) => {
  const { validation, ...props } = inputLabels[form][name];
  return {
    name: `${form}.${name}`,
    ...props,
    register: validation && register ? register(validation) : register,
    error: errors && errors[form] && errors[form][name]
  };
};

export const stepKeys = Object.keys(steps);
