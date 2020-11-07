const path = require('path');

const config = path.normalize(`${path.resolve(__dirname)}/../fixtures/.sherlog`);

describe('Dashboard test', () => {
  it('check for title value matches @sherlog/prisma', () => {
    cy.visit('/');
    cy.title().should('eq', '@sherlog/prisma');
  });

  it('dashboard default background color is white', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('play button is visible', () => {
    cy.get('.btn-play').should('be.visible');
  });

  it('slider track  is visible', () => {
    cy.get('.vue-slider').should('be.visible');
  });

  it('slider thumb is visible', () => {
    cy.get('.vue-slider-dot-handle').should('be.visible');
  });

  it('slider track has initial state', () => {
    cy.get('.vue-slider-rail').should('have.css', 'background-color', 'rgb(204, 204, 204)');
  });

  it('duration contains 0:00/0:00', () => {
    cy.get('.duration').contains('0:00/0:00');
  });

  it('nginx:http filter should not be visible', () => {
    cy.get('input[type=\'checkbox\']:first').should('not.be.visible');
  });

  it('nginx:error filter should not be visible', () => {
    cy.get('input[type=\'checkbox\']:last').should('not.be.visible');
  });

  it('zoom button should be hidden', () => {
    cy.get('.btn-zoom').should('be.hidden');
  });

  it('Line chart should not be visible', () => {
    cy.get('#chart').should('be.empty');
  });

  it('horizontal bar chart should not be visible', () => {
    cy.get('#h-chart-count').should('be.empty');
  });

  it('Logs grid should not be visible', () => {
    cy.get('#logs-grid').should('not.be.visible');
  });

  it('status message contains text "connecting..."', () => {
    cy.get('.status-message').contains('connecting...');
  });

  it('clicking the logo should toggle themes', () => {
    cy.get('.logo').click();
    cy.get('body.darkTheme').should('have.css', 'background-color', 'rgb(41, 41, 41)');
    cy.get('.logo').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('should start sherlog service', () => {
    const kill = 'xargs kill -9';
    cy.exec(`ps aux | grep -v grep | grep 'slg' | awk '{print $2}' | ${kill}`, { log: true, failOnNonZeroExit: false });
    cy.exec(`slg start --port 8083 --config .${config} >/dev/null 2>&1 </dev/null &`, { log: true, failOnNonZeroExit: false }).its('code').should('eq', 0);
    cy.wait(13000);
  });

  it('status message contains text connected', () => {
    cy.get('.status-message').contains('connected');
  });

  it('duration should not be 0:00/0:00', () => {
    cy.get('.duration').should('not.contain', '0:00/0:00');
  });

  it('clicking the play button should hide it shelf and display the pause button', () => {
    cy.get('.btn-play').click();
    cy.get('.btn-pause').should('be.visible');
    cy.get('.btn-play').should('not.be.visible');
  });

  it('nginx:http filter should be visible', () => {
    cy.get('input[type=\'checkbox\']:first').should('be.visible');
  });

  it('nginx:error filter should be visible', () => {
    cy.get('input[type=\'checkbox\']:last').should('be.visible');
  });

  it('zoom button should be visible', () => {
    cy.get('.btn-zoom').should('be.visible');
  });

  it('Line chart should be rendered', () => {
    cy.get('#chart').children('svg').should('have.length', 1);
  });

  it('horizontal bar chart should be rendered', () => {
    cy.get('#h-chart-count').contains('nginx:http');
    cy.get('#h-chart-count').contains('nginx:error');
  });

  it('Logs grid should be rendered', () => {
    cy.get('#logs-grid').contains('metric: nginx');
  });

  it('clicking the pause button should hide it shelf and display the play button', () => {
    cy.get('.btn-pause').click();
    cy.get('.btn-pause').should('not.be.visible');
    cy.get('.btn-play').should('be.visible');
  });

  it('unchecking all filters should not render any data', () => {
    cy.get('input[type=\'checkbox\']').uncheck();
    cy.get('#h-chart-count').should('not.contain', 'nginx:http');
    cy.get('#h-chart-count').should('not.contain', 'nginx:error');
  });

  it('checking nginx:http should not contain nginx:error', () => {
    cy.get('input[type=\'checkbox\']:first').check();
    cy.get('#h-chart-count').should('not.contain', 'nginx:error');
  });

  it('checking nginx:error should not contain nginx:http', () => {
    cy.get('input[type=\'checkbox\']').uncheck();
    cy.get('input[type=\'checkbox\']:last').check();
    cy.get('#h-chart-count').should('not.contain', 'nginx:http');
  });

  it('checking all filters should display all data', () => {
    cy.get('input[type=\'checkbox\']').uncheck();
    cy.get('input[type=\'checkbox\']:first').check();
    cy.get('input[type=\'checkbox\']:last').check();
    cy.get('#h-chart-count').contains('nginx:http');
    cy.get('#h-chart-count').contains('nginx:error');
  });

  it('should stop sherlog service', () => {
    cy.exec('ps aux | grep -v grep | grep \'slg\' | awk \'{print $2}\' | xargs kill -9', { log: true, failOnNonZeroExit: false }).its('code').should('eq', 0);
    cy.wait(5000);
  });

  it('status message contains text "connecting..."', () => {
    cy.get('.status-message').contains('connecting...');
  });
});

// TODO test chart hover interaction
// TODO test zoom feature
