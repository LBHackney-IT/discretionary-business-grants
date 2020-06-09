/* eslint-disable no-unused-vars */

const isYes = value => Boolean(value === 'Yes');

const mapEligibility = ({
  rateableLimitAnswerId,
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
  ...obj
}) => ({
  eligibilityCriteria: mapEligibility(eligibilityCriteria),
  declaration: mapDeclaration(declaration),
  documents: mapDocuments(supplementaryInformation),
  ...obj
});

export default mapAPI;
