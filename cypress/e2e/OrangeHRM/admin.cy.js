///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage"
const loginPage = new LoginPage()

describe("Admin Module", ()=>{
    beforeEach(()=>{
        cy.log("Login test is started...")
        cy.viewport(1536, 750);
        cy.visit("https://opensource-demo.orangehrmlive.com")
        loginPage.enterUserName("Admin")
        loginPage.enterPassword("admin123")
        loginPage.clickLoginButton()
        cy.url()
            .should("equal","https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.log("Login test completed...")
    });


    it("language should be change to English", ()=>{
        cy.log("Test case 1 is started")
        cy.wait(4000)
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
        cy.log("Test case 1 is completed...")
    });

    it("name should be changed", ()=>{
        cy.log("Test case 2 is started")
        cy.wait(4000)
        cy.get(':nth-child(6) > .oxd-main-menu-item').click()
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').clear().type("TestF")
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').clear().type("TestL")
        cy.get(':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type("TestN")
        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()
        cy.wait(4000)
        cy.reload();
        cy.get('.oxd-userdropdown-name')
            .should("have.text", "TestF TestL")
        cy.log("Test case 2 is completed...")
    
    });

    it.only("attachment should be uploaded",()=>{
        cy.log("Test case 3 is started")
        cy.get(':nth-child(6) > .oxd-main-menu-item').click()
        cy.scrollTo(0,500)
        cy.get('.orangehrm-action-header > .oxd-button')
            .click()
        cy.wait(4000)
        cy.get('.oxd-file-input').selectFile("cypress/fixtures/sample.txt", {force: true})
        cy.get("h6").contains("Add Attachment").siblings("form").find("div>button[type='submit']").click()
    });

});