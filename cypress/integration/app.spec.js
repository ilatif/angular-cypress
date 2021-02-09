describe("First test in Cypress", () => {
  it('visit app', () => {
    cy.visit('/');
    cy.get('.app-title').contains('Imran');
  });
});
