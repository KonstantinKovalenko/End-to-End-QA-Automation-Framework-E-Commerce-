class ProductsPage {
    #PRODUCTSURL = "https://automationexercise.com/products"

    get #productsInfoArray () {return $$('[class="productinfo text-center"]')}
    get #viewProductBtnsArray () {return $$('[class="nav nav-pills nav-justified"]')}

    async open (){
        await browser.url(this.#PRODUCTSURL)
    }

    async getPriceByProductIndex (index: number){
        const product = await this.#getProductByIndex(index)
        return await product.$('h2').getText()
    }

    async #getProductByIndex(index: number){
        const array = await this.#productsInfoArray
        if(await array.length === 0){
            throw new Error ('getProductByIndex: products not found or page was not loaded')
        }
        return array[index]
    }

    async getNameByProductIndex (index: number){
        const product = await this.#getProductByIndex(index)
        return await product.$('p').getText()
    }

    async openInfoByIndex (index: number){
        const link = await this.#viewProductBtnsArray
        await link[index].waitForClickable()
        await link[index].click()
    }
}

export default new ProductsPage();
