/// <reference types="cypress" />

describe("SignUpPage", () => {
  it("SignUpPage shows the form", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="userName"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="confirmPassword"]').should("exist");
    cy.get('button[type="submit"]').should("exist").should("be.disabled");
  });

  it("SignUpPage redirects to ConfirmationPage when user fill and submit the form with no errors", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="userName"]').type("test@test.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('input[name="confirmPassword"]').type("Password1!");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/confirmation");
  });

  it("SignUpPage shows error messages when user submit invalid form", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="userName"]').type("test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="confirmPassword"]').type("password1");

    cy.get('button[type="submit"]').click();

    cy.get('input[name="userName"] + p').should(
      "have.text",
      "Invalid email address"
    );
    cy.get('input[name="password"] + p').should(
      "have.text",
      "Password must have at least one capital letter, one numeric character, and one special character"
    );
    cy.get('input[name="confirmPassword"] + p').should(
      "have.text",
      "Passwords do not match"
    );
  });
});
