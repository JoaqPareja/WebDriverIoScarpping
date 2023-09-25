import { expect } from '@wdio/globals'
import Homepage from '../pageobjects/homepage.page.js'
import Articulos from '../pageobjects/articulos.page.js'
// import SecurePage from '../pageobjects/secure.page.js'

describe('Get Mercado libre information', () => {
    before(async()=>{
        await Homepage.open()
    })
    it('Get Camisetas information', async () => {
        await Homepage.typeSearch('Camisetas');
        await Homepage.checkInputValue('Camisetas')
        await Homepage.checkSearchBoxIsOpen();
        await Homepage.clickSearchBtn();
        await expect(browser).toHaveUrlContaining('camiseta')
        await Articulos.getArticlesInformationFromPages()
        // await Articulos.getArticlesInformation()
        // await Articulos.clickNextButton();
        console.log(Articulos.h2Articles)
        console.log(Articulos.joinArrs)
        
    })
    // it('get Information', async()=>{
    
    // })
})