// https://docs.cypress.io/api/introduction/api.html

describe('Dashboard test', () => {
  it('Check for title value', () => {
    cy.visit('/');
    cy.title().should('eq', '@sherlog/prisma');
  });

  it('Dashboard default background color is white', () => {
    cy.visit('/');
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('slider-track  is visible', () => {
    cy.visit('/');
    cy.get('.vue-slider').should('be.visible');
  });

  it('slider-thumb is visible', () => {
    cy.visit('/');
    cy.get('.vue-slider-dot-handle').should('be.visible');
  });

  it('slider-track has initial state', () => {
    cy.visit('/');
    cy.get('.vue-slider-rail').should('have.css', 'background-color', 'rgb(204, 204, 204)');
  });

  it('Duration is 0:00/0:00', () => {
    cy.visit('/');
    cy.get('.duration').contains('0:00/0:00');
  });

  it('Clicking the logo should toggle themes', () => {
    cy.visit('/');
    cy.get('.logo').click();
    cy.get('body.darkTheme').should('have.css', 'background-color', 'rgb(41, 41, 41)');
    cy.get('.logo').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
