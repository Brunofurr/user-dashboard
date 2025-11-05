describe('User Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', { 
      fixture: 'users.json' 
    }).as('getUsers');
  });

  describe('User List', () => {
    it('should display users on page load', () => {
      cy.visit('/');
      cy.wait('@getUsers');
      cy.get('app-card').should('have.length.at.least', 1);
      cy.contains('John Doe').should('be.visible');
    });

    it('should search for users', () => {
      cy.visit('/');
      cy.wait('@getUsers');
      cy.get('input[type="text"]').type('John');
      cy.wait(500);
      cy.get('app-card').should('have.length', 1);
      cy.contains('John Doe').should('be.visible');
    });

    it('should navigate to user details', () => {
      cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', { 
        fixture: 'user.json' 
      }).as('getUser');
      
      cy.visit('/');
      cy.wait('@getUsers');
      cy.get('app-card').first().click();
      cy.url().should('include', '/user/1');
      cy.wait('@getUser');
      cy.contains('John Doe').should('be.visible');
      cy.contains('john@example.com').should('be.visible');
    });
  });


});