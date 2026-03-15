// cypress/pages/LoginPage.ts
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly url = '/login'

  // Selectors are encapsulated — one place to update if the DOM changes
  private selectors = {
    emailInput:    'login-email',
    passwordInput: 'login-password',
    submitBtn:     'login-submit',
    errorMsg:      'login-error',
  }

  // Method names describe USER INTENT, not DOM actions
  loginAs(email: string, password: string) {
    this.get(this.selectors.emailInput).type(email)
    this.get(this.selectors.passwordInput).type(password)
    this.get(this.selectors.submitBtn).click()
    return this  // fluent API — enables chaining
  }

  assertLoginError(message: string) {
    this.get(this.selectors.errorMsg)
      .should('be.visible')
      .and('contain.text', message)
    return this
  }

  assertRedirectedToDashboard() {
    cy.url().should('include', '/')
    cy.get('[data-cy="navbar-username"]').should('be.visible')
    return this
  }
}