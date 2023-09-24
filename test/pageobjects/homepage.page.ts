import { $,expect } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Homepage extends Page {
    /**
     * define selectors using getter methods
     */
    protected get selectors(){
       return {
        searchInput:()=>$('#cb1-edit'),
        searchButton:()=>$('button[type=submit]'),
        optionsDisplayed:()=>$('#cb1-list'),
        h2Articles:()=>('.ui-search-item__title.shops__item-title'),
        }
    }
    public h2Articles:Array<string> = [];   
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
    protected async articlesH2(){
       const iterations =  await $$(this.selectors.h2Articles())
      return  iterations.forEach(async element => {
        if(element!= null){
            this.h2Articles.push(await element.getText())

        }
      });
    }
    public async articles():Promise<void>{
        await this.articlesH2()
    }
    // let iterar = 
    // let iterationsOfH2 = $$(iterar)

    // iterationsOfH2.forEach(element => {
    //     h2.push(element.getText())
    // });


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    // public async login (username: string, password: string) {
    //     await this.inputUsername.setValue(username);
    //     await this.inputPassword.setValue(password);
    //     await this.btnSubmit.click();
    // }

    /**
     * overwrite specific options to adapt it to page object
     */
    public async open () {
        return await super.open();
    }
}


export default new Homepage();
