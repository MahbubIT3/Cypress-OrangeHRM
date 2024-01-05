export class LoginPage{
    //Element locators
    page_url = 'https://opensource-demo.orangehrmlive.com'
    login_page_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    username_textbox = '[name="username"]'
    password_textbox = '[name="password"]'
    login_button = '.oxd-button'
    invalid_login_alert_location = '.oxd-alert-content > .oxd-text'
    invalid_login_alert = 'Invalid credentials'

    visitPage(){
        cy.visit(this.page_url);
    }

    enterUserName(username){
        cy.get(this.username_textbox)
            .type(username);
    }

    enterPassword(password){
        cy.get(this.password_textbox)
        .type(password);
    }

    clickLoginButton(){
        cy.get(this.login_button)
        .click();
    }

    checkInvalidLogin(){
        cy.get(this.invalid_login_alert_location)
          .should("contain", this.invalid_login_alert);
    }
}