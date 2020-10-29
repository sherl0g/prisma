// https://docs.cypress.io/api/introduction/api.html

describe('Dashboard test', () => {
  it('check for title value is @sherlog/prisma', () => {
    cy.visit('/');
    cy.title().should('eq', '@sherlog/prisma');
  });

  it('dashboard default background color is white', () => {
    cy.visit('/');
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('play button is visible', () => {
    cy.visit('/');
    cy.get('.btn-play').should('be.visible');
  });

  it('slider track  is visible', () => {
    cy.visit('/');
    cy.get('.vue-slider').should('be.visible');
  });

  it('slider thumb is visible', () => {
    cy.visit('/');
    cy.get('.vue-slider-dot-handle').should('be.visible');
  });

  it('slider track has initial state', () => {
    cy.visit('/');
    cy.get('.vue-slider-rail').should('have.css', 'background-color', 'rgb(204, 204, 204)');
  });

  it('duration contains 0:00/0:00', () => {
    cy.visit('/');
    cy.get('.duration').contains('0:00/0:00');
  });

  it('zoom button is hidden', () => {
    cy.visit('/');
    cy.get('.btn-zoom').should('be.hidden');
  });

  it('status message contains text "connecting..."', () => {
    cy.visit('/');
    cy.get('.status-message').contains('connecting...');
  });

  it('clicking the logo should toggle themes', () => {
    cy.visit('/');
    cy.get('.logo').click();
    cy.get('body.darkTheme').should('have.css', 'background-color', 'rgb(41, 41, 41)');
    cy.get('.logo').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});

// TODO test zoom button is visible
// TODO test play button is hidden while track is playing
// TODO test play button renders logs and charts
// TODO test pause button is visible while track is playing
// TODO test pause button is hidden after clicking it
// TODO test duration no longer contains 0:00/0:00
