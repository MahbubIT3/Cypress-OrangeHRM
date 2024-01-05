export class AdminPage{
    //Element locators
    configuration_dropdown = '.oxd-topbar-body-nav > ul > :nth-child(7)'
    localization = '.oxd-dropdown-menu > :nth-child(3)'
    language_dropdown = ':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
    current_language = this.language_dropdown+' > .oxd-select-text-input'
    select_language = '.oxd-select-dropdown > :nth-child(4)'
    language_save_button = '.oxd-button'
    //General variables
    expected_language = 'English (United States)'
    admin_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'

    clickConfiguration(){
        cy.get(this.configuration_dropdown)
            .click();
    }

    clickLocalization(){
        cy.get(this.localization)
            .click();
    }

    displayedLanguage(){
        cy.get(this.current_language).invoke('text')
    }

    clickLanguageDropdown(){
        cy.get(this.language_dropdown)
            .click();
    }

    selectLanguage(){
        cy.get(this.select_language)
            .click();
    }

    clickSave(){
        cy.get(this.language_save_button)
            .click();
    }

    checkSelectedLanguage(){
        cy.get(this.current_language).should('have.text',this.expected_language)
    }
}