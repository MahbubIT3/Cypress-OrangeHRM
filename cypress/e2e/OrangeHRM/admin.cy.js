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
    });
});

describe("PIM Module",()=>{
    let employeeId;
    it.only("Add an Employee",()=>{
        postLogin.clickPimMenu()    // Go to PIM
        adminPage.clickAddEmployee()    // Click on Add Employee in top Navbar
        adminPage.enterFirstname()
        adminPage.enterMiddlename()
        adminPage.enterLastname()

        adminPage.givenEmployeeId().then(value=>{
            employeeId = value;
            cy.log(`Employee ID: ${employeeId}`);
            cy.wrap(employeeId).as('employeeId');
        });
        
        adminPage.clickCredentialToggleSwitch()    // Toggle for Create Login Details
        adminPage.enterUsername() 
        adminPage.enterPassword()
        adminPage.enterConfirmPassword()

        adminPage.uploadProfilePicture()
        adminPage.clickAddEmployeeSaveButton()    // Click on Save button

        cy.log("Input Date of Birth")
        cy.wait(10000)    

        cy.scrollTo(0,200)
        adminPage.clickCalendar()    //Open calendar
        adminPage.clickMonthDropdown()
        adminPage.selectMonth()    //Month January Selected
        adminPage.clickYearDropdown()
        adminPage.selectYear()    //Year 1995 Selected
        adminPage.selectDate()   //Date 7 Selected
        adminPage.clickEmployeeProfileSaveButton()    //Save data
        
        //Assertion for date of birth
        cy.scrollTo(0,200)
        adminPage.clickCalendar()

        adminPage.checkEmployeeBirthMonth()
        adminPage.checkEmployeeBirthYear()
        adminPage.checkEmployeeBirthDate()
        cy.wait(10000)

        adminPage.clickEmployeeListMenu()
        adminPage.enterHintEmployeeName()  //Enter name
        cy.wait(2000)

        adminPage.clickAutocompleteOption()
        cy.wait(2000)    
        
        adminPage.clickSearchButton()
        cy.wait(2000)
        
        adminPage.checkEmployeeId()   
        adminPage.checkEmployeeName()
        adminPage.checkEmployeeLastname()
    });
});