const customAuthorize = require('./customAuthorizer');

const authorizer = require('node-lambda-authorizer')({
  jwtSecret: process.env.JWT_SECRET,
  customAuthorize: customAuthorize
});

exports.handler = authorizer.handler;
