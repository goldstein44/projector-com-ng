// frontend/cypress/support/e2e.ts
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Hydration failed') ||
    err.message.includes('There was an error while hydrating')
  ) {
    return false
  }
})