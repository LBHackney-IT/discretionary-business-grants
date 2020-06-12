import isValid from 'date-fns/isValid';
import isPast from 'date-fns/isPast';

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
        required: 'Role/position in organisation is required',
        validate: value => value !== ''
      }
    },
    firstName: {
      label: 'First Name:',
      validation: {
        required: 'First Name is required'
      }
    },
    lastName: {
      label: 'Last Name:',
      validation: {
        required: 'Last Name is required'
      }
    },
    emailAddress: {
      label: 'Email Address:',
      validation: {
        required: 'Email Address is required'
      },
      type: 'email'
    },
    telephoneNumber: { label: 'Contact Telephone Number:', type: 'tel' },
    address: { label: 'Address:' }
  },
  business: {
    businessName: {
      label: 'Business Name:',
      hint: '(trading name, etc)',
      validation: {
        required: 'Business Name is required'
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
      hint:
        "Please provide your business address in Hackney. For those in shared workspace/offices please provide the address of your shared workspace/office. For market traders please provide the most accurate  address for your market stall if you're unable to provide your exact market pitch address.",
      supportManualEntry: false
    },
    siteDescriptionId: {
      label: 'Business Premises Description:',
      hint:
        '(e.g shared office, shared workspace, individual shop, individual office, market stall etc)',
      options: options.SITE_DESCRIPTION,
      validation: {
        required: 'Business description is required',
        validate: value => value !== ''
      }
    },
    companyNumber: {
      label: 'Company Number (if applicable)',
      type: 'number'
    },
    companyStructureId: {
      label: 'Business Structure:',
      hint:
        'If your business structure is not listed below please pick the closest description.',
      options: options.COMPANY_STRUCTURE,
      validation: {
        required: 'Business Structure is required',
        validate: value => value !== ''
      }
    },
    ratesAccountNumber: {
      label: 'Business Rates Account Number (if applicable):'
    },
    registeredCharity: {
      label: 'Registered Charity Number (if applicable):',
      type: 'number'
    },
    councilRentAccountNumber: {
      label: 'Council Premises Rent Account Number (if applicable):',
      type: 'number'
    },
    councilTaxNumber: {
      label: 'Council Tax Number (if applicable):',
      hint: '(eg if you are a B&B)',
      type: 'number'
    },
    fullTimeEmployees: {
      label: 'Number of Employees:',
      type: 'number',
      validation: { required: 'Number of Employees is required', min: 0 }
    },
    percentageFallInIncome: {
      label: 'Percentage fall in income due to Covid-19:',
      type: 'number',
      hint:
        'Please give an indication of your percentage fall in income as a result of Covid-19. This should be from March 2020 onwards compared to the previous 3 months e.g 50= 50% fall in income, 75= 75% fall in income.',
      validation: {
        required: 'Percentage fall in income is required',
        min: { value: 0, message: 'Must be a number between 0 and 100' },
        max: {
          value: 100,
          message: 'Must be a number between 0 and 100'
        }
      }
    },
    rateableValue: {
      label: 'Business Premises Rateable Value (if applicable):',
      type: 'number',
      validation: {
        min: { value: 0, message: 'Must be a postive number' }
      }
    }
  },
  turnover: {
    turnover: {
      label: 'Business turnover March to May (inclusive) 2020:',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 }
    },
    year1819: {
      label: 'Financial Year 18/19',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 }
    },
    year1920: {
      label: 'Financial Year 19/20',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 }
    }
  },
  fixedPropertyCosts: {
    year2018To2019: {
      label: 'Financial Year 18/19',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 }
    },
    year2019To2020: {
      label: 'Financial Year 19/20',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 }
    },
    itemsIncluded: {
      label: 'Items included:',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader).',
      validation: { required: 'Items included is required' }
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
      validation: { required: "It's required" }
    },
    dateOfAid: {
      label: 'Date of aid',
      validation: {
        required: 'Date of aid is required',
        validate: {
          valid: value => isValid(new Date(value)) || 'Must be a is valid Date',
          past: value => isPast(new Date(value)) || 'Must be a past Date'
        }
      }
    },
    stateAidReceived: {
      label:
        'I/we have received the following value of State Aid under above rule',
      type: 'number',
      validation: { required: "It's required" }
    },
    organisationProvidingAid: {
      label: 'Organisation/Body providing aid',
      validation: { required: 'Organisation/Body providing aid' }
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
      label: 'Tick to confirm you have read and understood the declaration',
      validation: { required: 'You need to confirm.' }
    }
  },
  supplementaryInformation: {
    businessAccounts: {
      label: 'Business Accounts:',
      hint:
        'Please provide a company of the business accounts for the financial year 2018/19 (or your HMRC self assessment tax return for the financial year 2018/19). If not available please provide what is available',
      validation: {
        validate: value => value.length > 0 || 'Document required'
      }
    },
    fixedPropertyCosts: {
      label: 'Fixed Property costs:',
      hint:
        'Please provide evidence of your ongoing fixed property costs (such as the lease, licence, rental agreement or mortgage statement for the business premises)',
      validation: {
        validate: value => value.length > 0 || 'Document required'
      }
    },
    fallInIncome: {
      label: 'Fall in income:',
      hint:
        'Fall in income: please provide financial evidence showing the fall in income experienced by your business as a result of Covid-19 (such as; up to date business management accounts for the last 12 months showing profit and loss, turnover, cashflow and balance sheet, bank statements over the past 6 months, a brief written statement (no more than one side of A4) setting out the financial impact that Covid-19 has had on your business and why, and how this grant will support your business to trade beyond the current crisis)',
      validation: {
        validate: value => value.length > 0 || 'Document required'
      }
    },
    identity: {
      label: 'Identity',
      hint:
        'Please provide a form of photo identification such as a passport or driving licence',
      validation: {
        validate: value => value.length > 0 || 'Document required'
      }
    },
    payrollInformation: {
      label: 'Payroll Information',
      hint:
        'If available please provide your business payroll information for the last 6 months showing the number of people employed and paid by the business'
    }
  }
};

export const getInputProps = (
  form,
  name,
  { register, control } = {},
  errors
) => {
  const { validation, ...props } = inputLabels[form][name];
  return {
    name: `${form}.${name}`,
    ...props,
    register: validation && register ? register(validation) : register,
    control: control,
    rules: control && validation,
    error: errors && errors[form] && errors[form][name]
  };
};

export const stepKeys = Object.keys(steps);
