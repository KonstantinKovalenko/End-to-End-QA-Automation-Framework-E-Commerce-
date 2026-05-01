import { splitText } from "../utils/helpers"
import { parsePrice } from "../utils/helpers"

class CheckoutPage {
    get #addressDelivery () {return $('#address_delivery')}
    get #addressInvoice () {return $('#address_invoice')}

    get #checkoutProductRowsArray () {return $$('[class="table table-condensed"] tbody tr')}

    get #placeOrderBtn () {return $('[class="btn btn-default check_out"]')}

    async assertPageLoaded(){
        await expect(this.#addressInvoice).toBeDisplayed()
    }

    async assertProductListIsNotEmpty(){
        const productArray = await this.#checkoutProductRowsArray
        expect(await productArray.length).toBeGreaterThan(0)
    }

    async clickOnPlaceOrderBtn(){
        await this.#placeOrderBtn.waitForClickable()
        await this.#placeOrderBtn.click()
    }

    async getTotalAmount(){
        const productArray = await this.#checkoutProductRowsArray
        const lastRow = productArray[await productArray.length - 1]
        return parsePrice(await lastRow.$('.cart_total_price').getText())
    }

    async getCheckoutProduct (name: string){
            const product = await this.#getProductByName(name)
    
            return{
                name: await this.#getName(product),
                price: parsePrice(await this.#getPrice(product)),
                quantity: parsePrice(await this.#getQuantity(product)),
                total: parsePrice(await this.#getTotalPrice(product))
            }
        }

    async #getProductByName(name: string){
        const productArray = await this.#checkoutProductRowsArray
        for (const product of productArray){
            const productName = await this.#getName(product)
            if(productName === name){
                return product
            }
        }
        throw new Error(`getProductByName: product "${name}" was not found in checkout list`)
    }
    
    async #getName(product: WebdriverIO.Element){
        return await product.$('.cart_description').$('h4').getText()
    }

    async #getPrice(product: WebdriverIO.Element){
        return await product.$('.cart_price').getText()
    }

    async #getTotalPrice(product: WebdriverIO.Element){
        return await product.$('.cart_total').getText()
    }

    async #getQuantity(product: WebdriverIO.Element){
        return await product.$('.cart_quantity').getText()
    }

    async getDeliveryAddress (){
        const deliveryForm = await this.#addressDelivery
        const cszAddress = splitText(await deliveryForm.$('[class="address_city address_state_name address_postcode"]').getText())
        const fullName = splitText(await deliveryForm.$('[class="address_firstname address_lastname"]').getText())
        return{
            name: fullName[1],
            surname: fullName[2],
            address: await this.#condenseSoftAddress(deliveryForm),
            country: await deliveryForm.$('.address_country_name').getText(),
            state: cszAddress[1],
            city: cszAddress[0],
            zipcode: cszAddress[2],
            mobile: await deliveryForm.$('.address_phone').getText()
        }
    }

    async #condenseSoftAddress (element: ChainablePromiseElement){
        const adressArray = await element.$$('[class="address_address1 address_address2"]')
        let result = ""
        for (const element of adressArray){
            result = result + " " + await element.getText()
          }
        return result.trim()
    }
}

export default new CheckoutPage();
