import Router from 'next/router';

import { stepPath, stepKeys } from 'components/Steps';
import WarningText from 'components/WarningText/WarningText';

export default function Home() {
  return (
    <div>
      <h1>Apply for the COVID-19 Local Authority Discretionary Grants Fund</h1>
      <p className="govuk-body">
        The Discretionary Grant Fund supports small and micro businesses that
        are not eligible for other grant schemes.
      </p>
      <p className="govuk-body">
        For further information please go to{' '}
        <a
          className="govuk-link"
          href="https://hackney.gov.uk/support-for-business#financial"
        >
          https://hackney.gov.uk/support-for-business#financial
        </a>
      </p>
      <button
        href="#"
        role="button"
        draggable="false"
        className="govuk-button govuk-button--start govuk-!-margin-top-3"
        data-module="govuk-button"
        onClick={() => Router.push(stepPath, `/step/${stepKeys[0]}`)}
      >
        Start now
        <svg
          className="govuk-button__start-icon"
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
      <WarningText>
        Please note that applications for the Discretionary Business Grant close
        at 23.59 on 26 June 2020. Any applications submitted after this time
        will be invalid.
      </WarningText>
    </div>
  );
}
