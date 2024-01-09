///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage";
import { PostLogin } from "../../Pages/PostLogin";
import { MyInfoPage } from "../../Pages/MyInfoPage";

const loginPage = new LoginPage();
const postLogin = new PostLogin();
const myInfoPage = new MyInfoPage();

beforeEach("Employee Login Test",()=>{
    cy.log("Login test is started...")
    cy.viewport(1536, 750);
    cy.visit("https://opensource-demo.orangehrmlive.com")
    loginPage.enterUserName("Ethan123")
    loginPage.enterPassword("Sunbeam1")
    loginPage.clickLoginButton()
    cy.url()
        .should("equal",postLogin.dashboard_url)
    cy.log("Login test completed...")
});



describe("My Info Module", ()=>{
    it("name should be changed", ()=>{
        cy.log("Test case 2 is started")
        cy.wait(4000)
        postLogin.clickMyInfoMenu()

        myInfoPage.enterFirstname();
        myInfoPage.enterLastName();
        myInfoPage.enterNickname();

        myInfoPage.clickSavePersonalDetails();
        cy.wait(4000)
        cy.reload();
        postLogin.checkName();
        cy.log("Test case 2 is completed...")
    
    });

    it("attachment should be uploaded, edited, downloaded and deleted",()=>{
        cy.log("Test case 3 is started")
        cy.get(':nth-child(3) > .oxd-main-menu-item')   //click on My Info
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

});
    it("Punch In or Out",()=>{
        cy.wait(5000)
        let punchInDate;
        let punchInTime;
        let punchType;
        cy.get('div.orangehrm-attendance-card-bar > button')
            .click()
        cy.wait(10000)
        cy.get('.orangehrm-card-container > .oxd-text--h6').invoke('text').then((text)=>{
            punchType = text;
            if (punchType == "Punch In") {
                cy.get('.oxd-date-input > .oxd-input').invoke('val').then(value=>{
                    punchInDate = value;
                    cy.log(`Punched in Date: ${punchInDate}`);
                    cy.wrap(punchInDate).as('punchInDate');
                });
        
                cy.get('.oxd-time-input > .oxd-input').invoke('val').then(value=>{
                    punchInTime = value;
                    cy.log(`Punched in Time: ${punchInTime}`);
                    cy.wrap(punchInTime).as('punchInTime');
                });
        
                cy.get('.oxd-button')
                    .click();
                cy.wait(5000)
                cy.get('@punchInDate').then(punchInDate => {
                    cy.get('@punchInTime').then(punchInTime => {
                    cy.get(':nth-child(2) > .oxd-text--p')
                        .should("contain.text", punchInDate)
                        .should("contain.text", punchInTime);
                });
            });
                cy.log("You are punched in. You can now punch out");
            } 
            else {
                cy.log("Please punch out");
                cy.get('.oxd-time-input > .oxd-input')
                    .click()
                for(let i=0; i<=5; i++){
                cy.get('.oxd-time-minute-input > .bi-chevron-up')
                    .click()
                }
                cy.get(':nth-child(2) > input')
                    .click()
                cy.get('.oxd-button')
                    .click()
            }
        });
        

});