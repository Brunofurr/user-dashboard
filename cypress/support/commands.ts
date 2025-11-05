declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    waitForLoad(): Chainable<void>;
    selectUser(userId: number): Chainable<void>;
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('waitForLoad', () => {
  cy.get('.loading-spinner').should('not.exist');
});

Cypress.Commands.add('selectUser', (userId) => {
  cy.get(`[data-user-id="${userId}"]`).click();
});