// cypress/e2e/booking.cy.ts
describe("Booking Flow (SSR + Live Backend)", () => {
  it("navigates from rental page, fills booking form, and posts to backend", () => {
    // Visit rental detail page
    cy.visit("/rental/epson-rental-1080p");

    // ✅ Rental details render via SSR
    cy.contains("Epson Rental 1080p");
    cy.contains("₦");
    cy.contains("per day");

    // ✅ Click Book Now button using test id (should navigate to /booking?projectorId=...)
    cy.get('[data-testid="book-now-link"]').click();

    // ✅ Confirm we are on booking page
    cy.location("pathname", { timeout: 20000 }).should("include", "/booking");

    // Fill the form fields
    cy.get('[data-testid="name"]').type("Cypress Tester");
    cy.get('[data-testid="email"]').type("tester@example.com");
    cy.get('[data-testid="phone"]').type("08011112222");

    // Delivery = DELIVERY (₦3,000)
    cy.get('[data-testid="delivery-type"]').select("DELIVERY");
    cy.get('[data-testid="address"]').type("123 Test Street, Lagos");

    // 🔹 Debug: log all projector options first
    cy.get('[data-testid="projector"] option').then(($options) => {
      const texts = [...$options].map((o) => ({
        value: o.value,
        text: o.textContent,
      }));
      cy.log("Available projectors:", JSON.stringify(texts));
      console.log("Available projectors:", texts);
    });

    // 🔹 Select by ID instead of name (replace "1" with your actual Epson ID)
    cy.get('[data-testid="projector"]').select("1");

    // Quantity = 2
    cy.get('[data-testid="quantity"]').clear().type("2");

    // Booking Days = 1
    cy.get('[data-testid="booking-days"]').select("1");

    // ✅ Expected total
    const dailyPrice = 15000; // seeded backend value
    const expectedTotal = dailyPrice * 2 * 1 + 3000;

    cy.contains(`Total: ₦${expectedTotal}`).should("be.visible");

    // ✅ Stub Paystack redirect
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen"); // intercept window.open if used
      cy.stub(win.location, "assign").as("locationAssign"); // intercept location.href change
    });

    // ✅ Submit booking
    cy.get('[data-testid="book-now"]').click();

    // ✅ Assert backend returned redirect attempt (instead of expecting /thank-you)
    cy.get("@locationAssign").should("have.been.called");
  });
});