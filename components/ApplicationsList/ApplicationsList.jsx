import PropTypes from 'prop-types';

const ApplicationsList = ({ applications }) => (
  <table class="govuk-table">
    <caption class="govuk-table__caption">Applications</caption>
    <thead class="govuk-table__head">
      <tr class="govuk-table__row">
        <th scope="col" class="govuk-table__header">
          Business Name
        </th>
        <th
          scope="col"
          class="govuk-table__header govuk-table__header--numeric"
        >
          Date
        </th>
        <th scope="col" class="govuk-table__header">
          Status
        </th>
      </tr>
    </thead>
    <tbody class="govuk-table__body">
      {applications.length > 0 &&
        applications.map(({ businessName, applicationDate, status }) => (
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              {businessName}
            </th>
            <td class="govuk-table__cell govuk-table__cell--numeric">
              {new Date(applicationDate).toLocaleString()}
            </td>
            <td class="govuk-table__cell">{status}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

ApplicationsList.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      businessName: PropTypes.string.isRequired,
      applicationDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default ApplicationsList;
