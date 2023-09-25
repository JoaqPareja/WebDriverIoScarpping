export class Articulos{
    protected get selectors(){
        return{
            h2Articles:()=>('.ui-search-item__title.shops__item-title'),
            priceArticle:()=>('.andes-money-amount__fraction'),
            hrefLink:()=>('.ui-search-item__group__element.shops__items-group-details.ui-search-link')
        }
    }
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

     public async getArticlesInformation():Promise<void>{
         await this.iterations(this.selectors.h2Articles(),this.h2Articles);
         await this.iterations(this.selectors.priceArticle(), this.priceArticles);
         await this.getLink(this.selectors.hrefLink(), this.hrefArticles)
     }
     protected async unifyArrs(){
        return this.joinArrs.push({Titles: this.h2Articles, Prices:this.priceArticles, Link: this.hrefArticles})
     }
}

export default new Articulos();
