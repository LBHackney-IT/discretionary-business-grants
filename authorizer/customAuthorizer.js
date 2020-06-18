const path = require('path');

const publicList = [
  { path: '/api/applications', methods: ['POST'] },
  { path: '/api/postcode', methods: ['GET'] },
  { path: '/api/urls', methods: ['POST'] }
];

const isChildPath = (parentPath, childPath) => {
  const relative = path.relative(parentPath, childPath);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
};

const isAllowedMethod = (allowedMethodList, authorizeEvent) => {
  return allowedMethodList.includes(authorizeEvent.requestContext.httpMethod);
};

const userInAllowedGroup = (userGroups, allowedGroups) => {
  return userGroups && userGroups.some(g => allowedGroups.includes(g));
};

const customAuthorize = allowedGroups => (decodedToken, authorizeEvent) => {
  if (decodedToken && userInAllowedGroup(decodedToken.groups, allowedGroups)) return true;
  return publicList.some(publicMethod => {
    return isChildPath(publicMethod.path, authorizeEvent.path) && isAllowedMethod(publicMethod.methods, authorizeEvent);
  });
};

module.exports = customAuthorize;
