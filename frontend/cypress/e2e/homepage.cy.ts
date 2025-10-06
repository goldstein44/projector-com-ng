// frontend/cypress/e2e/homepage.cy.ts

// --- Helper to reliably wait for an option and select it (if needed elsewhere) ---
function waitForOptionAndSelect(selectSelector: string, optionText: string, timeout = 30000) {
  const start = Date.now();

  function trySelect() {
    cy.get(selectSelector).then($select => {
      const selectEl = $select[0] as HTMLSelectElement;
      const option = Array.from(selectEl.options).find(o => o.text.includes(optionText));
      if (option) {
        cy.wrap(selectEl).select(option.value);
      } else if (Date.now() - start < timeout) {
        cy.wait(500).then(trySelect); // retry after 500ms
      } else {
        throw new Error(`Option "${optionText}" never appeared in ${timeout}ms`);
      }
    });
  }

  trySelect();
}

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
});