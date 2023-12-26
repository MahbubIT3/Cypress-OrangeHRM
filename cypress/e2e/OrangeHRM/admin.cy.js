///<reference types = "cypress"/>

describe("Admin Module", ()=>{
    beforeEach(()=>{
        cy.viewport(1536, 750);
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



    it("language should be change to English", ()=>{
        cy.get(':nth-child(1) > .oxd-main-menu-item').click();
        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should("have.text","Admin");
        cy.get('.oxd-topbar-body-nav > ul > :nth-child(7)').click();

        cy.wait(2000);
        cy.get('.oxd-dropdown-menu > :nth-child(3)').click();

        cy.wait(4000);
        
        cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input')
                                .should("have.text","English (United States)");
        
    });

});