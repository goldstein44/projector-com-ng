// frontend/cypress/e2e/cart.cy.ts

describe('Cart Page', () => {
  const backendUrl = Cypress.env('backendUrl') // ✅ Django API

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('shows empty cart message when no items in localStorage', () => {
    cy.visit('/cart')
    cy.get('[data-testid="cart-empty"]').should('be.visible')
  })

  it('fetches seeded cart orders from API', () => {
    cy.request(`${backendUrl}orders/`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.greaterThan(0)

      const rentalOrder = response.body.find((o: any) => o.order_type === 'RENTAL')
      expect(rentalOrder).to.exist
      expect(rentalOrder.rental_items.length).to.be.greaterThan(0)

      const saleOrder = response.body.find((o: any) => o.order_type === 'SALE')
      expect(saleOrder).to.exist
      expect(saleOrder.sale_items.length).to.be.greaterThan(0)
    })
  })

  it('verifies seeded rental product exists in API', () => {
    cy.request(`${backendUrl}rentals/`).then((response) => {
      expect(response.status).to.eq(200)
      const rental = response.body.find((p: any) => p.slug === 'epson-rental-1080p')
      expect(rental).to.exist
      expect(Number(rental.price_per_day)).to.eq(15000)
    })
  })

  // ✅ UI tests with clean localStorage seeding

  it('displays cart items from fixture via localStorage injection', () => {
    cy.fixture('cart.json').then((data) => {
      cy.visit('/cart', {
        onBeforeLoad(win) {
          win.localStorage.setItem('cart', JSON.stringify(data.cartItems))
        },
      })

      cy.get('[data-testid="cart-item"]').should('have.length.at.least', 1)
      cy.contains(data.cartItems[0].name).should('exist')
    })
  })

  it('fills checkout form fields', () => {
    cy.fixture('cart.json').then((data) => {
      cy.visit('/cart', {
        onBeforeLoad(win) {
          win.localStorage.setItem('cart', JSON.stringify(data.cartItems))
        },
      })

      const form = data.checkoutForm
      cy.get('[data-testid="cart-input-name"]').type(form.name)
      cy.get('[data-testid="cart-input-email"]').type(form.email)
      cy.get('[data-testid="cart-input-phone"]').type(form.phone)
      cy.get('[data-testid="cart-input-delivery"]').select(form.deliveryType)

      // confirm values
      cy.get('[data-testid="cart-input-name"]').should('have.value', form.name)
      cy.get('[data-testid="cart-input-email"]').should('have.value', form.email)
      cy.get('[data-testid="cart-input-phone"]').should('have.value', form.phone)
      cy.get('[data-testid="cart-input-delivery"]').should('have.value', form.deliveryType)
    })
  })

  it('submits checkout form (mock alert)', () => {
    cy.fixture('cart.json').then((data) => {
      cy.visit('/cart', {
        onBeforeLoad(win) {
          win.localStorage.setItem('cart', JSON.stringify(data.cartItems))
        },
      })

      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert')
      })

      const form = data.checkoutForm
      cy.get('[data-testid="cart-input-name"]').clear().type(form.name)
      cy.get('[data-testid="cart-input-email"]').clear().type(form.email)
      cy.get('[data-testid="cart-input-phone"]').clear().type(form.phone)
      cy.get('[data-testid="cart-input-delivery"]').select(form.deliveryType)

      cy.get('[data-testid="cart-checkout-button"]').click()

      cy.get('@alert').should('have.been.calledWith', 'Form submitted!')
    })
  })
})