import { parsePrice } from "../utils/helpers"

class ProductsPage {
    #PRODUCTSURL = "https://automationexercise.com/products"

    get #productsInfoArray () {return $$('[class="productinfo text-center"]')}
    get #viewProductBtnsArray () {return $$('[class="nav nav-pills nav-justified"]')}

    get #modalContinueBtn () {return $('[class="btn btn-success close-modal btn-block"]')}
    get #saleImage () {return $('#sale_image')}

    async open (){
        await browser.url(this.#PRODUCTSURL)
    }

    async openInfoByIndex (index: number){
        const link = await this.#viewProductBtnsArray
        await link[index].waitForClickable()
        await link[index].click()
    }

    async clickOnContinueBtn(){
        const btn = await this.#modalContinueBtn
        await btn.waitForClickable()
        await btn.click()
    }

    async assertPageLoaded () {
        await expect(this.#saleImage).toBeDisplayed()
    }

    async addToCartByIndex(index: number){
        const addBtn = await this.#getAddCartBtnByIndex(index)
        await addBtn.waitForClickable()
        await addBtn.click()
    }

    async addToCartAndContinue(index: number){
        await this.addToCartByIndex(index)
        await this.clickOnContinueBtn()
    }

    async getListProduct(index: number){
        const listName = await this.#getName(index)
        const listPrice = await parsePrice(await this.#getPrice(index))
        return {
            name: listName,
            price: listPrice
        }
    }

    async #getPrice (index: number){
        const product = await this.#getProductByIndex(index)
        return await product.$('h2').getText()
    }

    async #getName (index: number){
        const product = await this.#getProductByIndex(index)
        return await product.$('p').getText()
    }

    async #getProductByIndex(index: number){
        const array = await this.#productsInfoArray
        if(await array.length === 0){
            throw new Error ('getProductByIndex: products not found or page was not loaded')
        }
        return array[index]
    }

    async #getAddCartBtnByIndex(index: number){
        const product = await this.#getProductByIndex(index)
        const btn = await product.$('[class="btn btn-default add-to-cart"]')
        if(await !btn.isClickable()){
            throw new Error ('getAddCartBtnByIndex: element is not clickable or page was not loaded')
        } 
        return btn
    }
}

export default new ProductsPage();
