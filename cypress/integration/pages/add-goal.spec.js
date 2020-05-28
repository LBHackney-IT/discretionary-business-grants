/// <reference types="cypress" />

context('Add-goal page', async () => {
  before(async () => {
    await cy.createSharedPlan({
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      queryFirstName: 'bart',
      queryLastName: 'simpson',
      goal: {
        targetReviewDate: 'some date',
        text: 'some text',
        useAsPhp: false
      }
    });
  });

  after(async () => {
    await cy.deleteSharedPlan('1');
  });

  describe('Add acion', () => {
    describe('Add to plan button', () => {
      it('is disabled until a summary and date is added', () => {
        cy.visit(`http://localhost:3000/plans/1`);
        cy.get('h1').should('have.text', "Bart Simpson's shared plan");

        cy.get('#summary-text.govuk-input')
          .click()
          .type('Summary');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-day.govuk-input')
          .click()
          .type('10');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-month.govuk-input')
          .click()
          .type('5');
        cy.get('button')
          .last()
          .should('have.attr', 'disabled');

        cy.get('#due-date-year.govuk-input')
          .click()
          .type('2010');
        cy.get('button')
          .last()
          .click();
      });
    });
    it('Adds an action to a goal', () => {
      cy.visit(`http://localhost:3000/plans/1`);
      cy.get('h1').should('have.text', "Bart Simpson's shared plan");

      cy.get('#summary-text.govuk-input')
        .click()
        .type('Summary');

      cy.get('#full-description.govuk-textarea')
        .click()
        .type('Description');

      cy.get('#due-date-day.govuk-input')
        .click()
        .type('10');
      cy.get('#due-date-month.govuk-input')
        .click()
        .type('5');
      cy.get('#due-date-year.govuk-input')
        .click()
        .type('2010');
      cy.get('button')
        .last()
        .click();
      //check if it then gets displayed when the action part of the UI is done
    });
  });
});
