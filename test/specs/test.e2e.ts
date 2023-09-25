import { expect } from '@wdio/globals'
import Homepage from '../pageobjects/homepage.page.ts'
import Articulos from '../pageobjects/articulos.page.ts'
import { writeFile } from 'fs/promises';

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
        browser.pause(10000);
    })
    it('get Information', async()=>{
        await writeFile('./file.txt', Articulos.joinArrs);
        await writeFile('./file.json',Articulos.joinArrs);

    })
})