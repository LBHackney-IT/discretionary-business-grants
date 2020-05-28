// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
import { DynamoDB } from 'aws-sdk';

const client = new DynamoDB.DocumentClient({
  region: Cypress.env('AWS_REGION'),
  endpoint: 'http://localhost:8000',
  accessKeyId: Cypress.env('AWS_ACCESS_KEY_ID'),
  secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY')
});

const TableName = 'plans';

Cypress.Commands.add('createSharedPlan', plan => {
  return client
    .put({
      TableName,
      Item: plan
    })
    .promise();
});

Cypress.Commands.add('deleteSharedPlan', id => {
  return client
    .delete({
      TableName,
      Key: { id }
    })
    .promise();
});
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  );

  cy.task('table', violationData);
}

Cypress.Commands.add('terminalLog', terminalLog);
