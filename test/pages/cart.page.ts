import { parsePrice } from "../utils/helpers"

class CartPage {
    #CARTURL = "https://automationexercise.com/view_cart"

    get #cartProductRowsArray () {return $$('#cart_info_table tbody tr')}

    get #cartEmptyMessage () {return $('#empty_cart')}
    get #cartBreadcrumps () {return $('.breadcrumbs')}

    async open (){
        await browser.url(this.#CARTURL)
    }

    async assertPageLoaded(){
        await expect(this.#cartBreadcrumps).toBeDisplayed()
    }

    async getCartProduct (name: string){
        const product = await this.#getProductByName(name)

        return{
            name: await this.#getName(product),
            price: parsePrice(await this.#getPrice(product)),
            quantity: parsePrice(await this.#getQuantity(product)),
            total: parsePrice(await this.#getTotalPrice(product))
        }
    }

    async #getProductByName(name: string){
        const productArray = await this.#cartProductRowsArray
        for (const product of productArray){
            const productName = await this.#getName(product)
            if(productName === name){
                return product
            }
        }
        throw new Error(`getProductByName: product "${name}" was not found in cart`)
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

    async eraseCart (){
        if(await this.#cartEmptyMessage.isDisplayed()){
            return
        }
        while (true) {
            const rows = await this.#cartProductRowsArray
            if (await rows.length === 0) {
                break
            }
            const previousLength = rows.length
            const deleteBtn = await rows[0].$('.cart_quantity_delete')
            await deleteBtn.click()

            await browser.waitUntil(
                async () => {
                    return (await this.#cartProductRowsArray).length < previousLength
                },
                {
                    timeout: 5000,
                    timeoutMsg: 'Cart item was not removed from cart'
                }
            )
        }
    }
}

export default new CartPage();
