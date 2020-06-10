const path = require('path');

const publicList = [
  { path: '/api/applications', methods: ['POST'] },
  { path: '/api/postcode', methods: ['GET'] },
  { path: '/api/urls', methods: ['POST'] }
];

const isChildPath = (parentPath, childPath) => {
  const relative = path.relative(parentPath, childPath);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const isAllowedMethod = (allowedMethodList, authorizeEvent) => {
  return allowedMethodList.includes(authorizeEvent.requestContext.httpMethod);
};

const customAuthorize = (decodedToken, authorizeEvent) => {
  return publicList.some(publicMethod => {
    return (
      isChildPath(publicMethod.path, authorizeEvent.path) &&
      isAllowedMethod(publicMethod.methods, authorizeEvent)
    );
  });
};

module.exports = customAuthorize;
