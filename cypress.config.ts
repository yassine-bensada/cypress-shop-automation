// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://conduit.bonfire.qase.io',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,              // enable only in CI
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,              // CI: retry flaky tests up to 2x
      openMode: 0              // local: fail fast
    },
    experimentalMemoryManagement: true,   // reduce RAM usage
    numTestsKeptInMemory: 5,
    setupNodeEvents(on, config) {
      // plugins go here
    }
  },
  env: {
    apiUrl: 'https://conduit.bonfire.qase.io/api',
    testUser: 'cypress_user@test.com',
    testPassword: 'Test1234!'
  }
})