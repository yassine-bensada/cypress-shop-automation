export abstract class BasePage {
    protected readonly baseUrl: string

    protected get(selector: string) {
        return cy.get(`[data-cy="${selector}"]`)
    }

    navigate(){
        cy.visit(this.baseUrl)
        this.waitForLoad()
        return this
    }

    waitForLoad(){
        cy.get('[data-cy="app-loaded"]', { timeout: 10000 }).should('exist')
    }
}