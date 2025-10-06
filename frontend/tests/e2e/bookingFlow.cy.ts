// frontend/tests/e2e/bookingFlow.cy.ts
describe('Booking Flow', () => {
  it('books a rental', () => {
    cy.visit('/booking');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('08012345678');
    cy.get('select[name="deliveryType"]').select('DELIVERY');
    cy.get('input[name="address"]').type('123 Lekki Phase 1, Lagos');
    cy.get('select[name="projectorId"]').select(1); // Assuming ID 1 exists
    cy.contains('Book Now').click();
    // Mock Paystack redirect
  });

  it('shows error for missing address on delivery', () => {
    cy.visit('/booking');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('08012345678');
    cy.get('select[name="deliveryType"]').select('DELIVERY');
    cy.contains('Book Now').click();
    cy.contains('Address is required for delivery');
  });
});
