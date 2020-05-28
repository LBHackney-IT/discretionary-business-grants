const SummaryList = ({ name, listObject }) => (
  <div className="govuk-form-group">
    <dl className="govuk-summary-list" id={name}>
      {Object.entries(listObject).map(([key, value], index) => {
        return (
          <div className="govuk-summary-list__row" key={index}>
            <dt className="govuk-summary-list__key">{key}</dt>
            <dd className="govuk-summary-list__value">{value}</dd>
            {/* <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">
              Change<span className="govuk-visually-hidden"> blah</span>
            </a>
          </dd> */}
          </div>
        );
      })}
    </dl>
  </div>
);

export default SummaryList;
