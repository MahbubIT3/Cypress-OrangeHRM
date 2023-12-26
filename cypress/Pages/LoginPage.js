export class LoginPage{
    enterUserName(username){
        cy.get('[name="username"]')
            .type(username);
    }

    enterPassword(password){
        cy.get('[name="password"]')
        .type(password);
    }

    clickLoginButton(){
        cy.get('.oxd-button')
        .click();

    }
}