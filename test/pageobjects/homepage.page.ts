import { $,expect } from '@wdio/globals'
import Page from './page.js';
/**
 * sub page containing specific selectors and methods for a specific page
 */
export  class Homepage extends Page {
    static open() {
        throw new Error('Method not implemented.');
    }
    /**
     * define selectors using getter methods
     */
    protected get selectors(){
       return {
        searchInput:()=>$('#cb1-edit'),
        searchButton:()=>$('button[type=submit]'),
        optionsDisplayed:()=>$('#cb1-list'),
        }
    }
    protected async typSrch(valueToType:string) {
        return await this.selectors.searchInput().setValue(valueToType);
    }
    public async typeSearch(valueToType:string){
        return await this.typSrch(valueToType)
    }
    protected async chckInputVal(valueToCheck:string){
        return await expect(await this.selectors.searchInput()).toHaveValueContaining(valueToCheck);
    }
    public async checkInputValue(valueToCheck:string){
        return await this.chckInputVal(valueToCheck)
    }
    protected async clkSearchBtn(){
       return await this.selectors.searchButton().click()
    }
    public async clickSearchBtn(){
        return await this.clkSearchBtn()
    }
    protected async chckSrchBoxIsOpen(){
        return await this.selectors.optionsDisplayed().isDisplayed();
    }
    public async checkSearchBoxIsOpen(){
        return await this.chckSrchBoxIsOpen();
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    // public async login (username: string, password: string) {
    //     await this.inputUsername.setValue(username);
    //     await this.inputPassword.setValue(password);
    //     await this.btnSubmit.click();
    // }

    public async open () {
        return await super.open();
    }
}

export default new Homepage();
