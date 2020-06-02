import Router from 'next/router';

import { stepPath, stepKeys } from 'components/Steps';

export default function Home() {
  return (
    <div>
      <h1>
        COVID-19 Business Support Grants: Local Authority Discretionary Grant
        Fund
      </h1>
      <p className="govuk-body">
        <strong>
          The government has introduced measures in support of Small Businesses,
          as the country experiences the COVID-19 pandemic.
        </strong>{' '}
        The grants scheme is fully funded by central government and the funds
        will be administered by Hackney Council in accordance with the{' '}
        <a
          className="govuk-link"
          href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/887310/local-authority-discretionary-fund-la-guidance-v2.pdf"
        >
          guidance issued by the Department for Business, Energy and Industrial
          Strategy (BEIS)
        </a>
      </p>
      <p className="govuk-body govuk-!-font-weight-bold">
        The discretionary grants fund for businesses is now live and open for
        applications. Please follow the link to the application to apply.
      </p>
      <button
        href="#"
        role="button"
        draggable="false"
        class="govuk-button govuk-button--start"
        data-module="govuk-button"
        onClick={() => Router.push(stepPath, `/step/${stepKeys[0]}`)}
      >
        Start now
        <svg
          class="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      </button>
      <h2 className="govuk-heading-m">Priority funding</h2>
      <p className="govuk-body">
        Based on the economic profile of the London Borough of Hackney, and
        evidence of businesses in need who have not been able to access existing
        government funding, we will prioritise the following businesses to
        receive funding;
      </p>
      <ol class="govuk-list govuk-list--number govuk-list--spaced">
        <li>
          Small businesses in shared offices or other flexible workspaces which
          do not have their own business rates assessment
        </li>
        <li>
          Small and micro business in the retail, leisure and hospitality
          sectors with a rateable value between £51-60k (inclusive); and{' '}
        </li>
        <li>
          Small and micro business whose income and turnover is related to the
          retail, hospitality and leisure sectors
        </li>
      </ol>
      <p className="govuk-body">
        However, we will consider applications from other types of small and
        micro business identified as a priority business type in the government
        guidance, provided they meet the eligibility criteria set out below:
      </p>
      <ul class="govuk-list govuk-list--bullet govuk-list--spaced">
        <li>
          Regular market traders with fixed property costs who do not have their
          own business rates assessment
        </li>
        <li>
          Bed & Breakfasts which pay council tax instead of business rates
        </li>
        <li>
          Charity properties in receipt of charitable business rates relief
          Businesses outside this above list, are invited to apply through the
          relevant option in the application form.
        </li>
      </ul>
      <h2 className="govuk-heading-m">Grant eligibility and levels</h2>
      <p className="govuk-body">
        The eligibility criteria for this Fund have been set by Central
        Government. Grants awarded by London Borough of Hackney from this Fund
        will be amounts of up to £5,000 for Micro businesses and up to £10,000
        for small businesses.
      </p>
      <p className="govuk-body">
        Your business must fall into all of the following categories. Any
        submission of this form must be accompanied by evidence in support;
      </p>
      <ul class="govuk-list govuk-list--bullet govuk-list--spaced">
        <li>Must be based in and trading in Hackney</li>
        <li>Was trading on 11 March 2020</li>
        <li>
          Is not in administration, insolvent, or in receipt of a striking off
          notice
        </li>
        <li>
          Has not either received nor eligible for a Small Business Grant or a
          Retail, Hospitality and Leisure Grant
        </li>
        <li>
          Have an annual fixed property cost (this could be annual rent, annual
          mortgage, annual market pitch fee, annual storage cost)
        </li>
        <li>
          If you have an individual business rates account does your premises
          have a rateable value of £60k or less?
        </li>
        <li>
          Demonstrate that you have suffered a significant fall in income due to
          the Covid-19 crisis
        </li>
        <li>Have fewer than 50 employees</li>
      </ul>
      <p className="govuk-body">
        The application process will be open from 8 June 2020 for a 2-week
        period and will close 23.59 on 21 June 2020. Other small businesses will
        be able to apply for grants where they have fixed property costs and
        have suffered a significant fall in income due to the Covid-19 crisis,
        but will only receive funding once the Priority 1 grants have been paid
        and if sufficient funding is still available
      </p>
      <h2 className="govuk-heading-m">Businesses not eligible</h2>
      <p className="govuk-body">
        Businesses who are eligible and/or have received financial support from
        the Small Business Grant Fund, Retail, Hospitality, Leisure Grant Fund,
        The Fisheries Response Fund, Domestic Seafood Supply Scheme, The Zoos
        Support Scheme, The Dairy Hardship Fund are NOT eligible to receive a
        Grant from this Discretionary Fund
      </p>
      <h2 className="govuk-heading-m">State Aid</h2>
      <p className="govuk-body">
        Businesses are eligible for grants under the EU State Aid De Minimis
        rules or the COVID-19 Temporary Framework for UK Authorities. The
        Discretionary Grant is considered State Aid and Local Authorities have a
        discretion to make payments to eligible recipients under either the De
        Minimis rules or the COVID-19 Temporary Framework for UK Authorities
        (provided all the relevant conditions are met). London Borough of
        Hackney will be issuing payments of up to and including £10,000 which
        can be provided under the De Minimis rules.
      </p>
      <p className="govuk-body">
        As these grants are deemed State Aid there is a possible impact on a
        company’s tax relief, which each company will need to consider prior to
        an application being submitted. State Aid has been increased although
        there is no opportunity to reverse the grant payment once made, so
        please check your position before submitting your application.
      </p>
      <h2 className="govuk-heading-m">How we will use your information</h2>
      <p className="govuk-body">
        The Council will not accept deliberate manipulation and fraud. Any
        business caught falsifying their records to gain additional grant money
        will face prosecution and any funding issued will be subject to
        clawback.
      </p>
      <p className="govuk-body">
        We will use your information to assess your application for financial
        support. In doing so we will confirm information about you and your
        account from Council departments and credit reference agencies to
        confirm account validity and your identity. If you provide false or
        inaccurate information, we will record this. If you would like full
        details on how we use your information, please refer to our{' '}
        <strong>privacy policy</strong>.
      </p>
    </div>
  );
}
