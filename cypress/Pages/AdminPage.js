export class AdminPage{
    //Element locators
    configuration_dropdown = '.oxd-topbar-body-nav > ul > :nth-child(7)'
    localization = '.oxd-dropdown-menu > :nth-child(3)'
    language_dropdown = ':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
    current_language = ':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'
    select_language = '.oxd-select-dropdown > :nth-child(4)'
    language_save_button = '.oxd-button'
    add_employee_menu = '.oxd-topbar-body-nav > ul > :nth-child(3)'
    firstname_input = '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input'
    middlename_input = ':nth-child(2) > :nth-child(2) > .oxd-input'
    lastname_input = ':nth-child(3) > :nth-child(2) > .oxd-input'
    employee_id_input = '.orangehrm-full-width-grid > div > div > div:nth-child(2) > input'
    credential_toggle_switch = '.oxd-switch-input'
    username_input = ':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'
    password_input = '.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input'
    confirm_password_input = '.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
    profile_picture_input = '.orangehrm-employee-image > div > div:nth-child(2) > input'
    add_employee_save_button = '.oxd-button--secondary'
    calendar = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon'
    month_dropdown = '.oxd-calendar-selector-month'
    month = '.oxd-calendar-dropdown > :nth-child(1)'
    year_dropdown = '.oxd-calendar-selector-year'
    date_grid = ':nth-child(7) > .oxd-calendar-date'
    employee_profile_save_button = ':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'
    employee_list_menu = 'li.oxd-topbar-body-nav-tab:nth-child(2)'
    employee_name_search_input = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'
    autocomplete_option = '.oxd-autocomplete-option'
    search_button = '.oxd-form-actions > .oxd-button--secondary'
    employeeIdOnList = '.oxd-table-card > .oxd-table-row > :nth-child(2) > div'
    employeeNameOnList = '.oxd-table-card > .oxd-table-row > :nth-child(3) > div'
    employeeLastnameOnList = '.oxd-table-card > .oxd-table-row > :nth-child(4) > div'
    toaster = '.oxd-text--toast-title'
    //General variables
    expected_language = 'English (United States)'
    admin_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'
    firstname = 'Ethan'
    middlename = 'James'
    lastname = 'Hunt'
    username = 'Ethan123'
    password = 'Sunbeam1'
    profile_picture_file = 'cypress/fixtures/profile.png'
    selected_month = 'January'
    year = '1995' 
    date = '7'

    clickConfiguration(){
        cy.get(this.configuration_dropdown)
            .click();
    }

    clickLocalization(){
        cy.get(this.localization)
            .click();
    }

    displayedLanguage(){
       return cy.get(this.current_language)
        .invoke('text');
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

    clickAddEmployee(){
        cy.get(this.add_employee_menu)
            .click();
    }

    enterFirstname(){
        cy.get(this.firstname_input)
            .type(this.firstname);
    }

    enterMiddlename(){
        cy.get(this.middlename_input)
            .type(this.middlename);
    }

    enterLastname(){
        cy.get(this.lastname_input)
            .type(this.lastname);
    }

    givenEmployeeId(){
        return cy.get(this.employee_id_input)
         .invoke('val');
     }

     clickCredentialToggleSwitch(){
        cy.get(this.credential_toggle_switch)
            .click()
     }

     enterUsername(){
        cy.get(this.username_input)
            .type(this.username)
     }
     enterPassword(){
        cy.get(this.password_input)
            .type(this.password)
     }
     enterConfirmPassword(){
        cy.get(this.confirm_password_input)
            .type(this.password)
     }

     uploadProfilePicture(){
        cy.get(this.profile_picture_input)
            .selectFile(this.profile_picture_file, {force: true})
     }

     clickAddEmployeeSaveButton(){
        cy.get(this.add_employee_save_button)
            .click()
     }

     clickCalendar(){
        cy.get(this.calendar)
            .click()
     }

     clickMonthDropdown(){
        cy.get(this.month_dropdown)
            .click()
     }

     selectMonth(){
        cy.get(this.month)
            .click()
     }

     clickYearDropdown(){
        cy.get(this.year_dropdown)
            .click()
     }

     selectYear(){
        cy.contains(this.year)
            .click()
     }

     selectDate(){
        cy.get(this.date_grid)
            .click()
     }

     clickEmployeeProfileSaveButton(){
        cy.get(this.employee_profile_save_button)
            .click()
     }

     checkToaster(){
        cy.get(this.toaster)
            .should('have.text','Success')
     }
     checkEmployeeBirthMonth(){
        cy.get(this.month_dropdown+"-selected > .oxd-text")
            .should("have.text",this.selected_month)
     }

     checkEmployeeBirthYear(){
        cy.get(this.year_dropdown+ '-selected > .oxd-text')
            .should("have.text",this.year)
     }
     checkEmployeeBirthDate(){
        cy.get(this.date_grid)
            .should("have.text",this.date)
     }

     clickEmployeeListMenu(){
        cy.get(this.employee_list_menu)
            .click()
     }

     enterHintEmployeeName(){
        cy.get(this.employee_name_search_input)
            .type(this.firstname)
     }

     clickAutocompleteOption(){
        cy.get(this.autocomplete_option)
            .click()
     }

     clickSearchButton(){
        cy.get(this.search_button)
            .click()
     }

     checkEmployeeId(){
        cy.get('@employeeId').then(employeeId=>{
            cy.log(`Outside: ${employeeId}`)
            cy.get(this.employeeIdOnList)
                .should("have.text",employeeId)
        });
     }

     checkEmployeeName(){
        cy.get(this.employeeNameOnList)
            .should('have.text',this.firstname+" "+this.middlename)
     }
     checkEmployeeLastname(){
        cy.get(this.employeeLastnameOnList)
            .should('have.text',this.lastname)
     }
}