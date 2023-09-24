import { expect } from '@wdio/globals'
import Homepage from '../pageobjects/homepage.page.js'
// import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    before(async()=>{
        await Homepage.open()
    })
    it('should login with valid credentials', async () => {
        await Homepage.typeSearch('Camisetas');
        await Homepage.checkInputValue('Camisetas')
        await Homepage.checkSearchBoxIsOpen();
        await Homepage.clickSearchBtn();
        await expect(browser).toHaveUrlContaining('camiseta')
        await Homepage.articles()
        console.log(Homepage.h2Articles)
    })
})

