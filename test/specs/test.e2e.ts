import { expect } from '@wdio/globals'
// import  {homepage,articulos} from '../pageobjects'
import Homepage from '../pageobjects/homepage.page';
import Articulos from '../pageobjects/articulos.page';
// import SecurePage from '../pageobjects/secure.page.js'

describe('Get Mercado libre information',  () => {
    before(async()=>{
         await Homepage.open()
    })
    it('Get Camisetas information', async () => {
        await Homepage.typeSearch('Camisetas');
        await Homepage.checkInputValue('Camisetas')
        await Homepage.checkSearchBoxIsOpen();
        await Homepage.clickSearchBtn();
        await expect(browser).toHaveUrlContaining('camiseta');
        await Articulos.articles();
        console.log(Articulos.h2Articles);
    })
})

