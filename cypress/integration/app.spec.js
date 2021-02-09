describe("First test in Cypress", () => {
  it('visit app', () => {
    cy.visit('/');
    cy.get('.app-title').contains('angular-cypress app is running');
  });
});
