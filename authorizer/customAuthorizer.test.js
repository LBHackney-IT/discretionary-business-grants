import customAuthorize from './customAuthorizer';

describe('customAuthorizer', () => {
  it('allows an unauthenticated request to a whitelisted endpoint and method', () => {
    const authorizeEvent = {
      path: '/api/postcode/e82ns',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize(undefined, authorizeEvent);
    expect(isAllowed).toBeTruthy();
  });

  it('reject an unauthenticated request to a whitelisted endpoint with an incorrect method', () => {
    const authorizeEvent = {
      path: '/api/applications',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize(undefined, authorizeEvent);
    expect(isAllowed).not.toBeTruthy();
  });

  it('rejects a request to a non-whitelisted endpoint', () => {
    const authorizeEvent = {
      path: '/api/secret/admin',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize(undefined, authorizeEvent);
    expect(isAllowed).not.toBeTruthy();
  });
});
