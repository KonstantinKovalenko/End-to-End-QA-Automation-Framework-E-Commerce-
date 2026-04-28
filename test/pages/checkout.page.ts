class CheckoutPage {
    #CHECKOUTURL = "https://automationexercise.com/checkout"

    async open (){
        await browser.url(this.#CHECKOUTURL)
    }
}

export default new CheckoutPage();
