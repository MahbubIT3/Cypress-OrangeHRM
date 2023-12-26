export class LoginPage{
    //Element locators
    username_textbox = '[name="username"]'
    password_textbox = '[name="password"]'
    login_button = '.oxd-button'
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
}