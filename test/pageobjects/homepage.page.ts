import { $,expect } from '@wdio/globals' // This imports the $ (element selector) and expect (assertion) functions from the WebDriverIO's globals module. These are commonly used for selecting elements and making assertions in web automation scripts.
import Page from './page.js';//This imports a Page class from a local file named 'page.js'. The Page class is  used as a base class for the page objects.
/**
 * sub page containing specific selectors and methods for a specific page
 */
class Homepage extends Page {//This defines a JavaScript class named Homepage, which extends the Page class
    // Class Constructor:

    // Inside the Homepage class. It inherits the constructor from the Page class.

    /**
     * define selectors using getter methods
     */
    protected get selectors(){//This defines a getter method named selectors that returns an object with several selector functions. These selector functions are used to locate and interact with elements on the web page.
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
   
    public async open () {
        return await super.open();
    }
}


export default new Homepage();
