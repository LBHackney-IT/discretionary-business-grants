const SummaryList = ({ list }) => (
  <dl className="govuk-summary-list">
    {list &&
      list.map(({ title, value, href }) => (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{title}</dt>
          <dd className="govuk-summary-list__value">{value}</dd>
          {href && (
            <dd className="govuk-summary-list__actions">
              <a className="govuk-link" href="#">
                Change<span className="govuk-visually-hidden"> {title}</span>
              </a>
            </dd>
          )}
        </div>
      ))}
  </dl>
);

export default SummaryList;
