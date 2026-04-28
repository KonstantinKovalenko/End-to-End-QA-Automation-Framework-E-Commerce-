class CartPage {
    #CARTURL = "https://automationexercise.com/view_cart"

    async open (){
        await browser.url(this.#CARTURL)
    }
}

export default new CartPage();
