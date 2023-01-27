import { getGreeting } from '../support/app.po';

describe('next-pokemon', () => {
  beforeEach(() => cy.visit('/'));

  it('should display correct pokemons', () => {
    cy.get('input').first().type('bulb');
    cy.get('li').first().should('have.text', 'Bulbasaur');
    // TODO: fix screenshot, its failing the test
    // cy.viewport(1280, 720);
    // cy.get('body').screenshot();
  });
});
