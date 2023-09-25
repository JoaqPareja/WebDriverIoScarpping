export class Articulos{
    protected get selectors(){
        return{
            h2Articles:()=>('.ui-search-item__title.shops__item-title'),
            priceArticle:()=>('.andes-money-amount__fraction'),
            hrefLink:()=>('.ui-search-item__group__element.shops__items-group-details.ui-search-link'),
            nextBtn:()=> ('.andes-pagination__arrow-title'),
            currentPageNumber:()=>('.andes-pagination__button.andes-pagination__button--current span')
        }
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
     protected async uniffyArrs():Promise<string>{
        return await this.joinArrs.push({Titles: this.h2Articles, Prices:this.priceArticles, Link: this.hrefArticles})
     }
    //  public async uniffyArrs(){
    //     return this.uniArrs()
    //  }
     protected async clickNextBtn(){
        return  await $(this.selectors.nextBtn()).click()
     }
     public async clickNextButton(){
        return await this.clickNextBtn();
     }
     protected async checkCurrentNumber(currentIteraion:string){
        return await expect(this.selectors.currentPageNumber()).toHaveText(currentIteraion)
     }
     protected async getPageInformation(){
        const pageCurrent:Array<string> =['1','2','3']
        pageCurrent.forEach(async (pageCurrentElement)=>{
            // console.log(pageCurrentElement)
            await this.getArticlesInformation();
            await this.checkCurrentNumber(pageCurrentElement);
            await this.uniffyArrs();
            await this.clickNextBtn();
        })
        
     }
     public async getArticlesInformationFromPages(){
        return await this.getPageInformation();
     }
}

export default new Articulos();
