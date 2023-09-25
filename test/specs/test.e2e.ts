import { expect } from '@wdio/globals'
import Homepage from '../pageobjects/homepage.page.ts'
import Articulos from '../pageobjects/articulos.page.ts'
// import exportArrayToFile from '../pageobjects/writefile.ts'
import { readFile, writeFile } from 'fs/promises';
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
        console.log(Articulos.joinArrs)
        browser.pause(10000);
    })
    it('get Information', async()=>{
        await writeFile('./file.txt', JSON.stringify(Articulos.joinArrs));
        await writeFile('./file.json',JSON.stringify(Articulos.joinArrs));

    })
})