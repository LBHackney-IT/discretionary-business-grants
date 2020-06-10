/* eslint-disable no-unused-vars */

const isYes = value => Boolean(value === 'Yes');

const filterEmptyValues = data =>
  Object.entries(data).reduce(
    (acc, [key, value]) => (value === '' ? acc : { ...acc, [key]: value }),
    {}
  );

const mapEligibility = ({
  rateableLimitAnswerId,
  businessSizeId,
  typeOfBusinessId,
  ...otherEntries
}) => {
  return {
    ...Object.entries(otherEntries).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: isYes(value)
      }),
      {}
    ),
    businessSizeId,
    rateableLimitAnswerId,
    typeOfBusinessId
  };
};

const mapDeclaration = ({
  stateAidCapNotExceeded,
  permittedToAcceptStateAidGrant,
  ...other
}) => ({
  ...other,
  stateAidCapNotExceeded: isYes(stateAidCapNotExceeded),
  permittedToAcceptStateAidGrant: isYes(permittedToAcceptStateAidGrant)
});

const mapDocuments = supplementaryInformation =>
  Object.entries(supplementaryInformation).reduce(
    (acc, [key, value]) => [
      ...acc,
      ...value.map(file => ({ s3Path: file, documentType: key }))
    ],
    []
  );

const mapAPI = ({
  eligibilityCriteria,
  declaration,
  supplementaryInformation,
  business,
  turnover,
  ...obj
}) => ({
  eligibilityCriteria: mapEligibility(eligibilityCriteria),
  declaration: filterEmptyValues(mapDeclaration(declaration)),
  documents: mapDocuments(supplementaryInformation),
  business: filterEmptyValues(business),
  turnover: filterEmptyValues(turnover),
  ...obj
});

export default mapAPI;
