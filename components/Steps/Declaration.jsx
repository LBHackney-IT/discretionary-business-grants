import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Checkbox, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const Declaration = props => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: props.formData
  });
  const onSubmit = data => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Declaration</h1>
      <h2>State Aid</h2>
      <p className="govuk-body">
        Following the outbreak of the Coronavirus, the European Commission has
        approved schemes to aid businesses affected by the Coronavirus outbreak
        on the basis of their Temporary Framework, including the COVID-19
        Temporary Framework scheme for the UK.
      </p>
      <p className="govuk-body">
        The maximum level of aid that a company may receive is €800 000 (€120
        000 per undertaking active in the fishery and aquaculture sector or €100
        000 per undertaking active in the primary production of agricultural
        products). This is across all UK schemes under the terms of the European
        Commission’s Temporary Framework. The Euro equivalent of the Sterling
        aid amount is calculated using the Commission exchange rate applicable
        on the date the aid is offered.
      </p>
      <p className="govuk-body">
        Any aid provided under this scheme will be relevant if you wish to
        apply, or have applied, for any other aid granted on the basis of the
        European Commission’s Temporary Framework. You will need to declare this
        amount to any other aid awarding body who requests information from you
        on how much aid you have received. You must retain evidence of state aid
        for four years after the conclusion of the UK’s transition from the EU
        and produce it on any request from the UK public authorities or the
        European Commission.
      </p>
      <p className="govuk-body">
        Aid may be granted to undertakings that were not in difficulty (within
        the meaning of Article 2(18) of the General Block Exemption Regulation)
        on 31 December 2019, but that faced difficulties or entered in
        difficulty thereafter as a result of the COVID19 outbreak.
      </p>
      <p className="govuk-body">
        This aid is in addition to any aid that you may have received under the
        De Minimis regulation allowing aid of up to €200,000 to any one
        organisation over a three fiscal year period (i.e. your current fiscal
        year and previous two fiscal years), and any other approved aid you have
        received under other State aid rules, such as aid granted under the
        General Block Exemption Regulation.
      </p>
      <p className="govuk-body">
        By ticking the declaration below you are confirming eligibility, in
        principle, for aid."
      </p>
      <p className="govuk-hint">
        Businesses are eligible for grants under the EU State Aid De Minimis
        rules or the COVID-19 Temporary Framework for UK Authorities. The
        Discretionary Grant is considered State Aid and Local Authorities have a
        discretion to make payments to eligible recipients under either the De
        Minimis rules or the COVID-19 Temporary Framework for UK Authorities
        (provided all the relevant conditions are met). London Borough of
        Hackney will be issuing payments of up to and including £10,000 which
        can be provided under the De Minimis rules. Applicants are advised to
        check their position before submitting applications here.
      </p>
      <TextInput
        {...getInputProps('declaration', 'received')}
        register={register}
      />
      <Radios
        {...getInputProps('declaration', 'isAccepted')}
        register={register({
          required: 'You need to agree.',
          validate: value => value === 'Yes' || 'You need to agree.'
        })}
        error={errors.declaration && errors.declaration.isAccepted}
      />
      <Radios
        {...getInputProps('declaration', 'isNotExceedingAidLimit')}
        register={register({
          required: 'You need to agree.',
          validate: value => value === 'Yes' || 'You need to agree.'
        })}
        error={errors.declaration && errors.declaration.isNotExceedingAidLimit}
      />
      <h2>Data Protection</h2>
      <p className="govuk-body">
        The Council will manage the personal information collected on this form
        in line with the General Data Protection Regulation (GDPR) and the Data
        Protection Act 2018 for the purposes outlined within our Privacy Notice
        <a herf="www.hackney.gov.uk/privacy">www.hackney.gov.uk/privacy</a>.
        Your information may be shared internally and with external partners
        purely for these purposes and will not be shared with any other
        organisations unless required to do so by law or for the purposes of
        prevention and detection of crime and/or fraud. We may contact you using
        the details you provide, in connection with this form and the
        information you supply. Your personal information will only be retained
        for as long as is necessary and you may request a copy of the
        information we hold about you.
      </p>
      <h2>How we will use your information</h2>
      <p className="govuk-body">
        The Council will not accept deliberate manipulation and fraud. Any
        business caught falsifying their records to gain additional grant money
        will face prosecution and any funding issued will be subject to
        clawback. We will use your information to assess your application for
        financial support. In doing so we will confirm information about you and
        your account from Council departments and credit reference agencies to
        confirm account validity and your identity. If you provide false or
        inaccurate information, we will record this. If you would like full
        details on how we use your information, please refer to our privacy
        policy.
      </p>
      <h2>Combating fraud</h2>
      <p className="govuk-body">
        The government Grants Management Function and Counter Fraud Function
        will make their digital assurance tool, Spotlight, available to local
        authorities, and will offer support in using the tool and interpreting
        results. Alongside other checks conducted by local authorities, the tool
        can help with pre-payment and post payment assurance. We will work with
        the government and other local authorities in identifying and sharing
        good practice, including protecting eligible businesses which may be
        targeted by fraudsters pretending to be central or local government or
        acting on their behalf.
      </p>
      <h2>Declaration</h2>
      <p className="govuk-body">
        The information provided will be used for the purpose of administering
        the Discretionary Business Support Grant.
      </p>
      <p className="govuk-body">
        I can confirm that the information I have supplied is true and correct,
        to the best of my knowledge, and makes me eligible for Grant funding
        under this scheme.
      </p>
      <p className="govuk-body">
        I understand that should I provide false information, or make a false
        statement, I may be liable to prosecution.
      </p>
      <p className="govuk-body">
        The Local Authority and the Government will review the payments made and
        have the power to recover any wrongly claimed Grants.
      </p>
      <Checkbox
        {...getInputProps('declaration', 'isConfirmed')}
        register={register({ required: 'You need to confirm.' })}
        error={errors.declaration && errors.declaration.isConfirmed}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Declaration;
