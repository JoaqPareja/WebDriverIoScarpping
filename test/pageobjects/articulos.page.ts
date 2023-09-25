
export class Articulos{
    protected get selectors(){
        return{
            h2Articles:()=>('.ui-search-item__title.shops__item-title'),
        }
    }
    public h2Articles:Array<string> = [];   

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
}

export default new Articulos();
