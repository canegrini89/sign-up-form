describe("ConfirmationPage", () => {
  it("ConfirmationPage shows the confirmation message", () => {
    cy.visit("http://localhost:5173/confirmation");
    cy.get("p").should(
      "contain.text",
      "Congratulations! You have signed up successfully."
    );
  });

  it("ConfirmationPage redirects to SignUpPage when user click in the button", () => {
    cy.visit("http://localhost:5173/confirmation");
    cy.get("button").click();
    cy.url().should("include", "/");
    cy.get('input[name="userName"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="confirmPassword"]').should("exist");
  });
});
