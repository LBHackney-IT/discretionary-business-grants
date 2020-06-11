const customAuthorize = require('./customAuthorizer');

const allowedGroups = process.env.ALLOWED_GROUPS.split(',');

const authorizer = require('node-lambda-authorizer')({
  jwtSecret: process.env.JWT_SECRET,
  customAuthorize: customAuthorize(allowedGroups)
});

exports.handler = authorizer.handler;
