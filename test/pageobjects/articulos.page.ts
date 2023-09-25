export class Articulos{
    protected get selectors(){
        return{
            h2Articles:()=>('.ui-search-item__title.shops__item-title'),
            priceArticle:()=>('.andes-money-amount__fraction'),
            hrefLink:()=>('.ui-search-item__group__element.shops__items-group-details.ui-search-link'),
            nextBtn:()=> ('.andes-pagination__arrow'),
            currentPageNumber:()=>('.andes-pagination__link')
        }
        // andes-pagination__link
    }//andes-pagination__button andes-pagination__button--current
    public h2Articles:Array<string> = [];   
    public priceArticles:Array<string> = [];   
    public hrefArticles:Array<string> = [];
    public joinArrs:Array<string>|any=[]
     protected async iterations(selector:string, arr:Array<string>){
        const iterations =  await $$(selector)
        return  iterations.forEach(async element => {
            if(element!= null){
                arr.push(await element.getText())
            };
        });
     }
     protected async getLink(selector:string, arr:Array<string>){
        const iterations =  await $$(selector)
        return  iterations.forEach(async element => {
            if(element!= null){
                arr.push(await element.getAttribute('href'))
            }; 
        });
     }

     protected async getArticlesInformation():Promise<void>{
         await this.iterations(this.selectors.h2Articles(),this.h2Articles);
         await this.iterations(this.selectors.priceArticle(), this.priceArticles);
         await this.getLink(this.selectors.hrefLink(), this.hrefArticles)
     }
     protected get uniffyArrs():Promise<string>{
        return this.joinArrs.push({Titles: this.h2Articles, Prices:this.priceArticles, Link: this.hrefArticles})
     }
    //  public async uniffyArrs(){
    //     return this.uniArrs()
    //  }
     protected async clickNextBtn(){
        // browser.pause(10000);
         await $(this.selectors.nextBtn()).waitForDisplayed()
         await $(this.selectors.nextBtn()).scrollIntoView()
         await $(this.selectors.nextBtn()).click()
     }

    //  public async clickNextButton(){
    //     return await this.clickNextBtn;
    //  }
     protected async checkCurrentNumber(currentIteraion:string){
        await $(this.selectors.currentPageNumber()).waitForDisplayed()
        await $(this.selectors.currentPageNumber()).scrollIntoView()
        const firstElement = await $$(this.selectors.currentPageNumber())
        return await expect(firstElement[0]).toHaveText(currentIteraion)
     }
     protected async getPageInformation(){
        const pageCurrent:Array<string> =['1','2','3']
        // await this.clickNextBtn()
        await this.checkCurrentNumber(pageCurrent[0]);
        await this.clickNextBtn()

        pageCurrent.forEach(async ()=>{
            // console.log(pageCurrentElement)
            // await this.getArticlesInformation();
            // console.log(await $(this.selectors.currentPageNumber()).getText());
            // await this.checkCurrentNumber(pageCurrentElement);
            // const links = await $('.andes-pagination__arrow')
           
           
            // await this.uniffyArrs;
            // await this.clickNextBtn;
        })
        
     }
     public async getArticlesInformationFromPages(){
        return await this.getPageInformation();
     }
}

export default new Articulos();
