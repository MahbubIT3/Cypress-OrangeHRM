export class MyInfoPage{
    //Element locators
    my_info_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    firstname_input = '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input'
    lastname_input = ':nth-child(3) > :nth-child(2) > .oxd-input'
    nickname_input = ':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'
    personal_details_save_button = ':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'

    //General Variables
    firstname = 'Lawrence';
    lastname = 'Griffin';
    nickname = 'Larry';

    enterFirstname(){
        cy.get(this.firstname_input)
            .clear()
            .type(this.firstname);
    }
    enterLastName(){
        cy.get(this.lastname_input)
            .clear()
            .type(this.lastname);
    }
    enterNickname(){
        cy.get(this.nickname_input)
            .clear()
            .type(this.nickname);
    }
    clickSavePersonalDetails(){
        cy.get(this.personal_details_save_button)
            .click()
    }
}