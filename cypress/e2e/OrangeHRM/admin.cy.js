///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage"
const loginPage = new LoginPage()

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

describe("Admin Module", ()=>{
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
                        cy.get('.oxd-select-dropdown > :nth-child(4)')
                            .click();
                        cy.get('.oxd-button').click();
                    }
                    else{
                        cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input')
                            .should("have.text","English (United States)");
                    }
            });
        cy.log("Test case 1 is completed...")
    });
});

describe("My Info Module", ()=>{
    it("name should be changed", ()=>{
        cy.log("Test case 2 is started")
        cy.wait(4000)
        cy.get(':nth-child(6) > .oxd-main-menu-item').click()
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input')
            .clear()
            .type("Lawrence")
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input')
            .clear()
            .type("Griffin")
        cy.get(':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input')
            .clear()
            .type("TestN")
        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button')
            .click()
        cy.wait(4000)
        cy.reload();
        cy.get('.oxd-userdropdown-name')
            .should("have.text", "Lawrence Griffin")
        cy.log("Test case 2 is completed...")
    
    });

    it("attachment should be uploaded, edited, downloaded and deleted",()=>{
        cy.log("Test case 3 is started")
        cy.get(':nth-child(6) > .oxd-main-menu-item')   //click on My Info
            .click()
        cy.scrollTo(0,500)
        cy.get('.orangehrm-action-header > .oxd-button')    //Click on Add Attachment
            .click()
        cy.wait(4000)
        cy.get('.oxd-file-input')
            .selectFile("cypress/fixtures/sample.txt", {force: true}) //Upload an Attachment
        
        cy.get('.oxd-textarea')
            .type("This is sample file")    //Comment about the attachment
        cy.get("h6")                        //Save the attachment
            .contains("Add Attachment")
            .siblings("form")
            .find("div>button[type='submit']")
            .click()
        cy.get('.oxd-table-row > :nth-child(2) > div')  //Check the file name in table
            .should("have.text","sample.txt")
        cy.get('.oxd-table-row > :nth-child(3) > div')  //Check the comment about the file
            .should("have.text","This is sample file")
        cy.wait(2000)
        cy.get('.oxd-table-cell-actions > :nth-child(3)')   //Download the attachment
            .click()
        //=================================//
        cy.get('.oxd-table-cell-actions > :nth-child(1)').click()   //Edit Attachment
        cy.get('div.orangehrm-card-container > form > div:nth-child(2) > div:nth-child(1) label')
            .should("have.text", "Replace With")
        cy.get('.oxd-file-div')    //Click on Add Attachment
            .click()
        cy.wait(4000)
        cy.get('.oxd-file-input')
            .selectFile("cypress/fixtures/sample2.txt", {force: true}) //Upload an Attachment
        cy.get('.oxd-textarea')
            .clear()
            .type("This is replaced sample 2 file")    //Comment about the attachment
        cy.get("h6")                        //Save the attachment
            .contains("Edit Attachment")
            .siblings("form")
            .find("div>button[type='submit']")
            .click()
        cy.get('.oxd-table-cell-actions > :nth-child(3)')   //Download the attachment
            .click()
        cy.readFile('cypress/downloads/sample.txt').then((file1Content) => {    //Comparing two files
            cy.readFile('cypress/downloads/sample2.txt').then((file2Content) => {
                  expect(file1Content).to.not.equal(file2Content);
                });
              });
        cy.get('.oxd-table-cell-actions > :nth-child(2)')   //Click on the delete icon to delete the uploaded attachment
            .click()
        cy.get('.oxd-button--label-danger')                 //Confirm Delete
            .click()
        cy.wait(4000)
        cy.get('div>span.oxd-text--span')
            .should("have.text", "No Records Found")   //Assert no records found
    });

    it("date of birth should be updated", ()=>{
        cy.log("Test case 3 is started")
        cy.get(':nth-child(6) > .oxd-main-menu-item')   //click on My Info
            .click()
        cy.scrollTo(0,200)
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon')
            .click()    //Open calendar
        cy.get('.oxd-calendar-selector-month')
            .click()
        cy.get('.oxd-calendar-dropdown > :nth-child(1)')
            .click()    //Month January Selected
        cy.get('.oxd-calendar-selector-year')
            .click()
        cy.contains('1995')
            .click()    //Year 1995 Selected
        cy.get(':nth-child(7) > .oxd-calendar-date')
            .click()    //Date 7 Selected
        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button')
            .click()    //Save data
        
        //Assertion for date of birth
        cy.scrollTo(0,200)
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon')
            .click()
        cy.get('.oxd-calendar-selector-month-selected > .oxd-text')
            .should("have.text","January")
        cy.get('.oxd-calendar-selector-year-selected > .oxd-text')
            .should("have.text","1995")
        cy.get('.--selected')
            .should("have.text","7")
        
    });

});