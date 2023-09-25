
export class Articulos{
    protected get selectors(){//This defines a getter method named selectors that returns an object with several selector functions. These selector functions are used to locate and interact with elements on the web page.
        return{
            h2Articles:()=>('.ui-search-item__title.shops__item-title'),
            priceArticle:()=>('.andes-money-amount__fraction'),
            hrefLink:()=>('.ui-search-item__group__element.shops__items-group-details.ui-search-link'),
            nextBtn:()=> ('a[title=Siguiente]'),
            currentPageNumber:()=>('.andes-pagination__button.andes-pagination__button--current')
        }
    }
    //Public Properties:

    //Here we define several public properties to store data related to this class:
    public h2Articles:Array<string> = []; //An array to store article titles.
    public priceArticles:Array<string> = []; //An array to store article prices.
    public hrefArticles:Array<string> = []; //An array to store article links (URLs).
    public joinArrs:Array<string>|any = [];; //An array to join and store article information in a structured format.
     protected async iterations(selector:string, arr:Array<string>){
        const iterations =  await $$(selector)
        return  iterations.forEach(async element => {
            if(element!= null){
                arr.push(await element.getText())
            };
        });
     }
     protected async getLink(selector:string, arr:Array<string>){ //This method iterates over elements matching a given selector and adds their href attribute (link) to the specified array.
        const iterations =  await $$(selector)
        return  iterations.forEach(async element => {
            if(element!= null){
                arr.push(await element.getAttribute('href'))
            }; 
        });
     }
     protected async getArticlesInformation():Promise<void>{ //This method uses the above two methods to extract information (titles, prices, and links) about articles.
         await this.iterations(this.selectors.h2Articles(),this.h2Articles);
         await this.iterations(this.selectors.priceArticle(), this.priceArticles);
         await this.getLink(this.selectors.hrefLink(), this.hrefArticles)
     }
     protected async uniffyArrs(){ //This method combines the article information into a single JSON string.
        let titles:Array<any>=[this.h2Articles]
        return this.joinArrs = JSON.stringify(titles.map(
            titles => new Array({
                Titles: titles, Prices: this.priceArticles, Link: this.hrefArticles }))) //The titles array is then processed using the map function. In each iteration of the map, a new array is created, which contains a single object. This object has three properties: Titles, Prices, and Link.
     }
     protected async clickNextBtn():Promise<void>{ //This method clicks a "Next" button to navigate to the next page of articles.
         await $(this.selectors.nextBtn()).waitForDisplayed(),
         await $(this.selectors.nextBtn()).scrollIntoView()
        const nextBtn = await $(this.selectors.nextBtn())
        await $(nextBtn).click()
     }

     protected async checkCurrentNumber(currentIteraion:string){//This method checks if the current page number matches the expected page number.
        await $(this.selectors.currentPageNumber()).waitForDisplayed()
        await $(this.selectors.currentPageNumber()).scrollIntoView()
        const firstElement = await $$(this.selectors.currentPageNumber())
         await expect(firstElement[0]).toHaveText(currentIteraion)
     }
     protected async getPageInformation(){ //This method iterates through a set of pages (with page numbers '1', '2', '3'), extracts article information from each page, checks the current page number, and adds the unified article data to the joinArrs property.
        const pageCurrent:Array<string> =['1','2','3']
        for (let index = 0; index < pageCurrent.length; index++) {
                await this.getArticlesInformation();
                await this.checkCurrentNumber(pageCurrent[index]),
                await this.clickNextBtn()
                await this.uniffyArrs();
        }
     }
     public async getArticlesInformationFromPages(){ //This is a public method that initiates the process of getting article information from multiple pages. It calls getPageInformation to perform this task.
        return await this.getPageInformation();
     }
}

export default new Articulos();
