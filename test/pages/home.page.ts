class HomePage {
    #HOMEURL = "https://automationexercise.com"

    get #logoutLink () {return $('[href="/logout"]')}

    async open (){
        await browser.url(this.#HOMEURL)
    }

    async isLoggedIn(){
        if(await this.#logoutLink.isExisting()){
            return true
        }
        return false
    }
}

export default new HomePage();
