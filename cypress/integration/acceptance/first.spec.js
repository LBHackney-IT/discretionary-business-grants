/// <reference types="cypress" />
context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.injectAxe();
  });

  describe('Loads page', () => {
    it('has shared plan heading', () => {
      cy.get('h1').should(
        'have.text',
        'Apply for the COVID-19 Local Authority Discretionary Grants Fund'
      );
      cy.checkA11y('#content h1', null, cy.terminalLog);
    });
  });
});
