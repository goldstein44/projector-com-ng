// frontend/tests/e2e/purchaseFlow.cy.ts
describe('Purchase Flow', () => {
  it('adds to cart and checks out', () => {
    cy.visit('/shop');
    cy.contains('View Details').click();
    cy.contains('Add to Cart').click();
    cy.visit('/cart');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('08012345678');
    cy.get('select[name="deliveryType"]').select('DELIVERY');
    cy.get('input[name="address"]').type('123 Lekki Phase 1, Lagos');
    cy.contains('Checkout').click();
    // Mock Paystack redirect
  });

  it('shows error for missing address on delivery', () => {
    cy.visit('/cart');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('08012345678');
    cy.get('select[name="deliveryType"]').select('DELIVERY');
    cy.contains('Checkout').click();
    cy.contains('Address is required for delivery');
  });
});
