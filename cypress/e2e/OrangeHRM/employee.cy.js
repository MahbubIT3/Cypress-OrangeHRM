///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage"
const loginPage = new LoginPage()
beforeEach("Employee Login Test",()=>{
    cy.log("Login test is started...")
    cy.viewport(1536, 750);
    cy.visit("https://opensource-demo.orangehrmlive.com")
    loginPage.enterUserName("Ethan123")
    loginPage.enterPassword("Sunbeam1")
    loginPage.clickLoginButton()
    cy.url()
        .should("equal","https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    cy.log("Login test completed...")
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