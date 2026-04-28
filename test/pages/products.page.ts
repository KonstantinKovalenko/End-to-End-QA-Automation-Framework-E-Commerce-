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
        return array[index]
    }

    async getNameByProductIndex (index: number){
        const product = await this.#getProductByIndex(index)
        return await product.$('p').getText()
    }

    async openInfoByIndex (index: number){
        const link = await this.#viewProductBtnsArray
        await link[index].click()
    }
}

export default new ProductsPage();
