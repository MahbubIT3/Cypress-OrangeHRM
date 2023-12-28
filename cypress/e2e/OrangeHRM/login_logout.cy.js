///<reference types = "cypress"/>

describe("Login Test", ()=>{
  it("Invalid Login - User should not be logged in", ()=>{
      cy.visit("https://opensource-demo.orangehrmlive.com");
  
      cy.get('[name="username"]')
          .type("iadmin");
  
      cy.get('[name="password"]')
          .type("ipassword");
  
      cy.get('.oxd-button')
          .click();
      
      cy.get('.oxd-alert-content > .oxd-text')
          .should("contain", "Invalid credentials");
      
  });
  
  it("Valid Login - User should be logged in", ()=>{
      cy.visit("https://opensource-demo.orangehrmlive.com");
  
      cy.get('[name="username"]')
          .type("Admin");
  
      cy.get('[name="password"]')
          .type("admin123");
  
      cy.get('.oxd-button')
          .click();
  
      cy.url()
          .should("equal","https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
      
  });
  
  });
  
  describe("Logout Test", ()=>{
  it("User should be logged out", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com");

    cy.get('[name="username"]')
        .type("Admin");

    cy.get('[name="password"]')
        .type("admin123");

    cy.get('.oxd-button')
        .click();

    cy.wait(2000);

    cy.get('.oxd-userdropdown-tab')
        .click();

    cy.contains('Logout')
        .click();

    cy.wait(4000);

    cy.url()
        .should("equal","https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });
  
  });