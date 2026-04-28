class ProductsPage {
    #PRODUCTSURL = "https://automationexercise.com/products"

    async open (){
        await browser.url(this.#PRODUCTSURL)
    }
}

export default new ProductsPage();
