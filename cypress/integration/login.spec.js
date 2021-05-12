describe('login tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    cy.getCookies({ log: false }).then((cookies) => {
      cookies.forEach((cookie) => cy.clearCookie(cookie.name, { log: false }));
    });
    cy.log('clearCookies');
  });

  it('redirects to /login when user is not logged-in', () => {
    cy.url().should('include', '/login');
  });

  it('should have login tab selected by-default', () => {
    cy.get('#pane-login').should('have.class', 'active');
  });

  it('should display client-side error when user hits Login without entering email/password', () => {
    cy.get('#pane-login [type=submit]').click();

    cy.get('#email-error').contains('A valid email is required');
    cy.get('#password-error').contains('Password is required');
  });

  it('tests login with invalid credentials', () => {
    cy.intercept('POST', '/auth/login', (req) => {
      req.reply({
        statusCode: 404,
        body: {
          error: 'invalid_user',
          message: 'Bad Request'
        },
        delay: 5000
      })
    }).as('login');

    cy.get('#email').type('user@policyinpractice.co.uk');
    cy.get('#password').type('12345678');
    cy.get(`#pane-login [type=submit]`).click();

    cy.get('ucc-login-form p:first').contains('Trying to log in ...');

    cy.wait('@login');

    cy.get('ucc-login-form p:first').contains('Invalid username or password');

  });

  it('tests login with valid credentials', () => {
    cy.intercept('POST', '/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            user: {
              customization: {},
              id: 1,
              name: 'Policy in Practice user',
              organization: { id: 1, name: 'Policy in Practice' },
              role: { id: 2, title: 'super_admin' }
            }
          },
          error: false
        },
        delay: 5000
      });
    }).as('login');

    cy.get('#email').type('user@policyinpractice.co.uk');
    cy.get('#password').type('12345678');
    cy.get('#pane-login [type=submit]').click();

    cy.get('ucc-login-form p:first').contains('Trying to log in ...');

    cy.wait('@login');

    cy.url().should('include', '/calculator/new/step1');
  })

});
