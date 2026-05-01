class PaymentPage {
    get #paymentCaption () {return $('.payment-information')}

    get #payBtn () {return $('#submit')}
    get #downloadInvoiceBtn () {return $('[class="btn btn-default check_out"]')}

    get #nameInput () {return $('//*[@class="form-control" and @name="name_on_card"]')}
    get #cardInput () {return $('//*[@class="form-control card-number" and @name="card_number"]')}
    get #cvcInput () {return $('//*[@class="form-control card-cvc" and @name="cvc"]')}
    get #monthInput () {return $('//*[@class="form-control card-expiry-month" and @name="expiry_month"]')}
    get #yearInput () {return $('//*[@class="form-control card-expiry-year" and @name="expiry_year"]')}

    async assertPageLoaded(){
        await expect(this.#paymentCaption).toBeDisplayed()
    }

    async waitForCheckoutIsCompleted(){
        await browser.waitUntil(async () => 
            {return (await this.#downloadInvoiceBtn.isDisplayed())},
            {timeout: 5000, timeoutMsg: 'Checkout was not completed'}
        )
    }

    async clickOnPayBtn(){
        await this.#payBtn.waitForClickable()
        await this.#payBtn.click()
    }

    async fillPaymentData (paymentData: {name: string, card: string, CVC: string, expMonth: string, expYear: string}){
        await this.#nameInput.setValue(paymentData.name)
        await this.#cardInput.setValue(paymentData.card)
        await this.#cvcInput.setValue(paymentData.CVC)
        await this.#monthInput.setValue(paymentData.expMonth)
        await this.#yearInput.setValue(paymentData.expYear)
    }

    async isCheckoutCompleted() {
        return await this.#downloadInvoiceBtn.isExisting()
    }
}

export default new PaymentPage();
