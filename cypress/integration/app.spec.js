describe("First test in Cypress", () => {

  afterEach(() => {
    cy.clearCookiesCustom();
  });

  it('visit app', () => {
    cy.visit('/');
    // cy.get('.app-title').contains('angular-cypress app is running');
    // cy.get('.terminal').contains('ng generate component xy');
  });
});
