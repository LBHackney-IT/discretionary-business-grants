import customAuthorize from './customAuthorizer';

describe('customAuthorizer', () => {
  it('allows an unauthenticated request to exactly a whitelisted endpoint and method', () => {
    const authorizeEvent = {
      path: '/api/urls',
      requestContext: { httpMethod: 'POST' }
    };
    const isAllowed = customAuthorize('')(undefined, authorizeEvent);
    expect(isAllowed).toBeTruthy();
  });

  it('allows an unauthenticated request to a child of a whitelisted endpoint and method', () => {
    const authorizeEvent = {
      path: '/api/postcode/e82ns',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize('')(undefined, authorizeEvent);
    expect(isAllowed).toBeTruthy();
  });

  it('reject an unauthenticated request to a whitelisted endpoint with an incorrect method', () => {
    const authorizeEvent = {
      path: '/api/applications',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize('')(undefined, authorizeEvent);
    expect(isAllowed).not.toBeTruthy();
  });

  it('rejects an unauthenticated request to a non-whitelisted endpoint', () => {
    const authorizeEvent = {
      path: '/api/secret/admin',
      requestContext: { httpMethod: 'GET' }
    };
    const isAllowed = customAuthorize('')(undefined, authorizeEvent);
    expect(isAllowed).not.toBeTruthy();
  });

  it('allows authenticated requests from users in the correct group', () => {
    const authorizeEvent = {
      path: '/api/secret/admin',
      requestContext: { httpMethod: 'GET' }
    };
    const decodedToken = { groups: ['ALLOWED'] };
    const allowedGroups = 'ALLOWED';
    const isAllowed = customAuthorize(allowedGroups)(
      decodedToken,
      authorizeEvent
    );
    expect(isAllowed).toBeTruthy();
  });

  it('rejects authenticated requests from users not in the correct group', () => {
    const authorizeEvent = {
      path: '/api/secret/admin',
      requestContext: { httpMethod: 'GET' }
    };
    const decodedToken = { groups: ['NOT_ALLOWED'] };
    const allowedGroups = 'ALLOWED';
    const isAllowed = customAuthorize(allowedGroups)(
      decodedToken,
      authorizeEvent
    );
    expect(isAllowed).not.toBeTruthy();
  });
});
