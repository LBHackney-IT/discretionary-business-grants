import ExpandableDetails from 'components/ExpandableDetails/ExpandableDetails';

export default () => (
  <ExpandableDetails summary="Types of businesses eligible">
    <ol className="govuk-list govuk-list--number govuk-body govuk-list--spaced">
      <li>
        Small and micro businesses in shared offices or workspaces without their
        own business rates assessment. Business must use a commercial space
        where an all-inclusive rent, license or similar fee is paid, and occupy
        this space on a regular basis (primary business premises). NB. Offices/
        workspaces in domestic dwellings are not classed as shared offices or
        shared workspace.
      </li>
      <li>
        Small and micro businesses in the retail, hospitality and leisure sector
        with a rateable value of between £51,000-£60,000 (inclusive). Business
        has been unable to benefit from the existing Retail, Hospitality and
        Leisure Grant, but are classified as a Retail, Hospitality or Leisure
        business (as defined in the Retail, Hospitality and Leisure Grant Fund).
      </li>
      <li>
        Small and micro businesses whose income and turnover is directly related
        to the Retail, Hospitality and Leisure sector: Businesses must
        demonstrate clearly in their application how their business is related
        to the Retail, Hospitality and Leisure sector (as defined in the Retail,
        Hospitality and Leisure Grant Fund).
      </li>
      <li>
        Regular market traders with fixed building costs who do not have their
        own business rates assessment. A regular market trader is defined as a
        market trader with a permanent licence who trades 5 or more days per
        week in the London Borough of Hackney. A fixed building cost for a
        market trader includes ongoing pitch fees and storage fees.
      </li>
      <li>
        5.Bed & Breakfasts who pay Council Tax instead of business rates.
        Business must provide visitor accommodation on a per night basis
        including at least one meal per day. NB ‘Air B&B’ style accommodation,
        Houses in Multiple Occupation, or other forms of short term lets are
        excluded from this category.
      </li>
      <li>
        Charity properties who occupy a commercial property with a rateable
        value of £15,000 or less. Business is in receipt of charitable business
        rates relief, and without this would have otherwise have been eligible
        for Small Business Rates Relief or Rural Rate Relief.
      </li>
      <li>Ofsted registered nurseries (not within a domestic premises).</li>
    </ol>
  </ExpandableDetails>
);
