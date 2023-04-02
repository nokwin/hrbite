describe('Login flow', () => {
  it('should redirect to login page', () => {
    cy.visit('http://localhost:5173/');

    cy.wait(1000);

    cy.url().should('include', '/login');
  });

  it('should able to login', () => {
    cy.visit('http://localhost:5173/login');

    cy.wait(1000);

    cy.get('#email').type('hr@test.com');
    cy.get('#password').type('test');

    cy.get('form').submit();

    cy.url().should('not.include', '/login');
  });

  it('should able to logout', () => {
    cy.visit('http://localhost:5173/');

    cy.wait(1000);

    cy.get('#email').type('hr@test.com');
    cy.get('#password').type('test');

    cy.get('form').submit();

    cy.wait(1000);

    cy.get('button').contains('Log out').click();

    cy.url().should('include', '/login');
  });
});
