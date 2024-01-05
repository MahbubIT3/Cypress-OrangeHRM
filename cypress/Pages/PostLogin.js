import { MyInfoPage } from "MyInfoPage";
const myInfoPage = new MyInfoPage();
export class PostLogin{
    //Element locators
    admin_menu = ':nth-child(1) > .oxd-main-menu-item'
    my_info_menu = ':nth-child(6) > .oxd-main-menu-item'
    user_dropdown = '.oxd-userdropdown-tab'
    user_dropdown_name = '.oxd-userdropdown-name'
    logoutMenu = 'Logout'
    dashboard_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'

    clickAdminMenu(){
        cy.get(this.admin_menu)
            .click();
    }

    clickMyInfoMenu(){
        cy.get(this.my_info_menu).click()
    }

    clickUserDropdown(){
        cy.get(this.user_dropdown)
            .click();
    }
    
    clickLogout(){
        cy.contains(this.logoutMenu)
            .click();
    }

    checkName(){
        cy.get(this.user_dropdown_name)
            .should('have.text',this.myInfoPage.firstname+" "+this.myInfoPage.lastname)
    }
}