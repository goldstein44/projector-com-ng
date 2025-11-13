// frontend/cypress/e2e/homepage.cy.ts

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the hero offer section correctly', () => {
    cy.contains(
      'Bright, Reliable Projectors – Delivered Exactly When You Need Them.',
      { timeout: 20000 }
    ).should('be.visible');

    cy.contains(
      'Projector online makes it effortless to rent or buy projectors in Lekki Ajah',
      { timeout: 20000 }
    ).should('be.visible');
  });

  it('has functional CTA buttons (Rent, Buy, WhatsApp)', () => {
    cy.get('a[href="/rental"]').should('exist');
    cy.get('a[href="/shop"]').should('exist');
    cy.get('a[href="https://wa.me/+2348125146666"]').should('exist');
  });

  it('displays How It Works section', () => {
    cy.contains('How It Works', { timeout: 20000 }).should('be.visible');
    cy.contains('Buy a Projector', { timeout: 20000 }).should('be.visible');
    cy.contains('Rent a Projector', { timeout: 20000 }).should('be.visible');
    cy.contains('Need Help?', { timeout: 20000 }).should('be.visible');
  });

  it('shows featured products section (SSR)', () => {
    cy.contains('Featured Projectors for Sale', { timeout: 20000 }).should('be.visible');
  });

  it('shows featured rentals section (SSR)', () => {
    cy.contains('Featured Projectors for Rent', { timeout: 20000 }).should('be.visible');
  });

  it('has Book on WhatsApp in Why Choose Us section', () => {
    cy.contains('Why Choose Projector online?', { timeout: 20000 }).should('be.visible');
    cy.contains('Book on WhatsApp', { timeout: 20000 }).should('exist');
  });

  it('renders testimonials', () => {
    cy.contains('What Our Customers Say', { timeout: 20000 }).should('be.visible');
    cy.contains('Rented a projector for our event', { timeout: 20000 }).should('exist');
    cy.contains('Bought a projector for my office', { timeout: 20000 }).should('exist');
  });

  it('renders call-to-action section at the bottom', () => {
    cy.contains('Ready to Get Started?', { timeout: 20000 }).should('be.visible');
    cy.get('a[href="/shop"]').should('exist');
    cy.get('a[href="/rental"]').should('exist');
    cy.get('a[href="https://wa.me/+2348125146666"]').should('exist');
  });

  // ✅ New filter dropdown test
  it('filters products correctly when selecting Brand New or Tokunbo', () => {
    cy.get('[data-testid="filter-dropdown"]').should('be.visible');

    // Default should show all items
    cy.get('[data-testid="product-item"]').its('length').should('be.greaterThan', 0);

    // Select Brand New
    cy.get('[data-testid="filter-dropdown"]').select('brand_new');
    cy.get('[data-testid="product-item"]').each(($el) => {
      cy.wrap($el).should('contain.text', 'brand new');
    });

    // Select Tokunbo
    cy.get('[data-testid="filter-dropdown"]').select('tokunbo');
    cy.get('[data-testid="product-item"]').each(($el) => {
      cy.wrap($el).should('contain.text', 'tokunbo');
    });
  });
});