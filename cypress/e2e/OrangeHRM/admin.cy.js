///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage";
import { PostLogin } from "../../Pages/PostLogin";
import { AdminPage } from "../../Pages/AdminPage";

const loginPage = new LoginPage();
const postLogin = new PostLogin();
const adminPage = new AdminPage();

beforeEach(()=>{
    cy.log("Login test is started...")
    cy.viewport(1536, 750);
    loginPage.visitPage();
    loginPage.enterUserName("Admin")
    loginPage.enterPassword("admin123")
    loginPage.clickLoginButton()
    cy.url()
        .should("equal",postLogin.dashboard_url);
    cy.log("Login test completed...")
});

describe("Admin Module", ()=>{
    it("language should be change to English", ()=>{
        cy.log("Test case 1 is started")
        cy.wait(4000)

        postLogin.clickAdminMenu();
        adminPage.clickConfiguration();
        
        cy.wait(2000);
        adminPage.clickLocalization();
        cy.wait(4000);
        adminPage.displayedLanguage()
            .then((currentLanguage) =>{
                if (currentLanguage.trim()!==adminPage.expected_language) {
                    adminPage.clickLanguageDropdown();
                    adminPage.selectLanguage();
                    adminPage.clickSave();
                }
                else{
                    adminPage.checkSelectedLanguage();
                }
            });
        cy.log("Test case 1 is completed...")
    });
});

describe("PIM Module",()=>{
    let employeeId;
    it("Add an Employee",()=>{
        cy.get(':nth-child(2) > .oxd-main-menu-item')
            .click()    // Go to PIM
        cy.get('.oxd-topbar-body-nav > ul > :nth-child(3)')
            .click()    // Click on Add Employee in top Navbar
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input')
            .type("Ethan")  //Enter First Name
        cy.get(':nth-child(2) > :nth-child(2) > .oxd-input')
            .type("James")  // Enter Middle Name
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input')
            .type("Parker") // Enter Last Name

        cy.get('.orangehrm-full-width-grid > div > div > div:nth-child(2) > input').invoke('val').then(value=>{
            employeeId = value;
            cy.log(`Employee ID: ${employeeId}`);
            cy.wrap(employeeId).as('employeeId');
        });
        
        cy.get('.oxd-switch-input')
            .click()    // Toggle for Create Login Details
        cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("Ethan123")   // Enter Username
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("Sunbeam1")   // Enter Password
        cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("Sunbeam1")   // Enter Confirm Password
        cy.get('.orangehrm-employee-image > div > div:nth-child(2) > input')
            .selectFile("cypress/fixtures/profile.png", {force: true})
        cy.get('.oxd-button--secondary')
            .click()    // Click on Save button

        cy.log("Input Date of Birth")
        cy.wait(10000)    
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

        cy.wait(10000)
        cy.get('li.oxd-topbar-body-nav-tab.--visited')
            .click()
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input')
            .type("Ethan")  //Enter name
        cy.wait(2000)
        cy.get('.oxd-autocomplete-option') //Click on Auto Completion
            .click()
        cy.wait(2000)    
        cy.get('.oxd-form-actions > .oxd-button--secondary')
            .click()    //Click on search button
        cy.wait(2000)
        cy.get('@employeeId').then(employeeId=>{
            cy.log(`Outside: ${employeeId}`)
            cy.get('.oxd-table-card > .oxd-table-row > :nth-child(2) > div')
                .should("have.text",employeeId)
        });
        
        cy.get('.oxd-table-card > .oxd-table-row > :nth-child(3) > div')
            .should("have.text", "Ethan James")
        cy.get('.oxd-table-card > .oxd-table-row > :nth-child(4) > div')
            .should("have.text", "Parker")
    });
});