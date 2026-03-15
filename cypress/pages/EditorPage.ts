// cypress/pages/EditorPage.ts
import { BasePage } from './BasePage'

export class EditorPage extends BasePage {
  readonly url = '/editor'

  private selectors = {
    title:       'editor-title',
    description: 'editor-description',
    body:        'editor-body',
    tagInput:    'editor-tag-input',
    tagItem:     'editor-tag-item',
    publishBtn:  'editor-publish',
  }

  publishArticle(data: {
    title: string
    description: string
    body: string
    tags?: string[]
  }) {
    this.get(this.selectors.title).type(data.title)
    this.get(this.selectors.description).type(data.description)
    this.get(this.selectors.body).type(data.body)

    data.tags?.forEach(tag => {
      this.get(this.selectors.tagInput).type(`${tag}{enter}`)
    })

    // Intercept BEFORE the click, alias it for later assertion
    cy.intercept('POST', '**/api/articles').as('createArticle')
    this.get(this.selectors.publishBtn).click()

    return this
  }

  waitForPublish() {
    cy.wait('@createArticle').then(({ response }) => {
      expect(response?.statusCode).to.equal(201)
    })
    return this
  }
}