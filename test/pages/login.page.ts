class LoginPage {
    #LOGINURL = "https://automationexercise.com/login"

    get #emailLoginTextInput () {return $('[data-qa="login-email"]')}
    get #passLoginTextInput () {return $('[data-qa="login-password"]')}

    get #loginBtn () {return $('[data-qa="login-button"]')}

    async open (){
        await browser.url(this.#LOGINURL)
    }

    async login(email: string, password: string){
        await this.#emailLoginTextInput.addValue(email)
        await this.#passLoginTextInput.setValue(password)
        await this.#loginBtn.click()
    }
}

export default new LoginPage();
