class HomePage {
    #HOMEURL = "https://automationexercise.com/"

    async open (){
        await browser.url(this.#HOMEURL)
    }
}

export default new HomePage();
