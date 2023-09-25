import { expect } from '@wdio/globals' //This imports the expect function from the WebDriverIO's globals module, which is commonly used for assertion and expectation testing.
import Homepage from '../pageobjects/homepage.page.ts'
import Articulos from '../pageobjects/articulos.page.ts' //These lines import the Homepage and Articulos page objects from the respective TypeScript files located in the pageobjects directory.
import { writeFile } from 'fs/promises'; //This imports the writeFile function from the Node.js fs/promises module, which is used for asynchronous file writing.

describe('Get Mercado libre information', () => { //This defines a test suite with the description 'Get Mercado libre information'. This suite contains a set of test cases.
    before(async()=>{ //This is a setup hook that runs before any of the test cases within the suite. It opens the Homepage page.
        await Homepage.open()
    })
    it('Get Camisetas information', async () => {
        await Homepage.typeSearch('Camisetas');
        await Homepage.checkInputValue('Camisetas')
        await Homepage.checkSearchBoxIsOpen();
        await Homepage.clickSearchBtn();
        await expect(browser).toHaveUrlContaining('camiseta')
        await Articulos.getArticlesInformationFromPages()
        // browser.pause(10000); this can pause the browser in case we want to pause the execution of the code
    })
    it('create file Information', async()=>{
        //Export the desired array into the specific file
        await writeFile('./file.txt', Articulos.joinArrs); 
        await writeFile('./file.json',Articulos.joinArrs);

    })
})