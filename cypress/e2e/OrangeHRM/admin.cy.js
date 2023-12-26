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



    it.skip("language should be change to English", ()=>{
        cy.get(':nth-child(1) > .oxd-main-menu-item').click();
        cy.get('.oxd-topbar-body-nav > ul > :nth-child(7)').click();

        cy.wait(2000);
        cy.get('.oxd-dropdown-menu > :nth-child(3)').click();

        cy.wait(4000);
        
        cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input')
            .invoke('text')
                .then((currentLanguage) =>{
                    if (currentLanguage.trim()!=="English (United States)") {
                        cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
                            .click();
                        cy.get('.oxd-select-dropdown > :nth-child(4)').click();
                        cy.get('.oxd-button').click();
                    }
                    else{
                        cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input')
                            .should("have.text","English (United States)");
                    }
            });
        
    });

    it("name should be changed", ()=>{
        cy.get(':nth-child(6) > .oxd-main-menu-item').click()
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').clear().type("TestF")
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').clear().type("TestL")
        cy.get(':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type("TestN")
        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()
        cy.reload();

        cy.get('.oxd-userdropdown-name')
            .should("have.text", "TestF TestL")
    });

});