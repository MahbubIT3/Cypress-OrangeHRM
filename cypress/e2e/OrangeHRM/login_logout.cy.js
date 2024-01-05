///<reference types = "cypress"/>
import { LoginPage } from "../../Pages/LoginPage";
import { PostLogin } from "../../Pages/PostLogin";

const loginPage = new LoginPage();
const postLogin = new PostLogin();

beforeEach(()=>{
    loginPage.visitPage();
});

describe("Login Test", ()=>{
  it("Invalid Login - User should not be logged in", ()=>{
      loginPage.enterUserName("iadmin");
      loginPage.enterPassword("ipassword");
      loginPage.clickLoginButton();
      loginPage.checkInvalidLogin();
  });
  
  it("Valid Login - User should be logged in", ()=>{
      loginPage.enterUserName("Admin");
      loginPage.enterPassword("admin123");
      loginPage.clickLoginButton();
  
      cy.url()
          .should("equal",postLogin.dashboard_url);
    });
});
  
  describe("Logout Test", ()=>{
  it("User should be logged out", ()=>{
    loginPage.enterUserName("Admin");
    loginPage.enterPassword("admin123");
    loginPage.clickLoginButton();

    cy.wait(2000);

    postLogin.clickUserDropdown();
    postLogin.clickLogout();

    cy.wait(4000);

    cy.url()
        .should("equal",loginPage.login_page_url);
  });
  
  });