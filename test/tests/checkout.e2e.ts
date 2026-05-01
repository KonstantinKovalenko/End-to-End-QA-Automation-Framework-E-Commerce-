import { expect } from '@wdio/globals'
import { addresses, checkoutData, users } from "../utils/testData"
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import CartPage from '../pages/cart.page'
import ProductsPage from '../pages/products.page'
import CheckoutPage from '../pages/checkout.page'
import PaymentPage from '../pages/payment.page'

describe('Checkout', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login(users.checkoutUser.email, users.checkoutUser.password)
        expect(await HomePage.isLoggedIn()).toBe(true)
    
        await CartPage.open()
        await CartPage.eraseCart()
    })

    it('should validate checkout workability', async () => {
        const firstProduct = 3
        const secondProduct = 4
        await ProductsPage.open()
        await ProductsPage.assertPageLoaded()

        const listProduct1 = await ProductsPage.getListProduct(firstProduct)
        const listProduct2 = await ProductsPage.getListProduct(secondProduct)
        await ProductsPage.addToCartAndContinue(firstProduct)
        await ProductsPage.addToCartAndContinue(firstProduct)
        await ProductsPage.addToCartAndContinue(secondProduct)

        await CartPage.open()
        await CartPage.assertPageLoaded()

        const cartProduct1 = await CartPage.getCartProduct(listProduct1.name)
        const cartProduct2 = await CartPage.getCartProduct(listProduct2.name)
        expect(cartProduct1.price).toBe(listProduct1.price)
        expect(cartProduct1.quantity).toBe(2)
        expect(cartProduct1.total).toBe(cartProduct1.price*cartProduct1.quantity)
        expect(cartProduct2.price).toBe(listProduct2.price)
        expect(cartProduct2.quantity).toBe(1)
        expect(cartProduct2.total).toBe(cartProduct2.price*cartProduct2.quantity)

        await CartPage.clickOnCheckoutBtn()
        await CheckoutPage.assertPageLoaded()

        const deliveryAddress = await CheckoutPage.getDeliveryAddress()
        expect(deliveryAddress).toEqual(addresses.valid)

        const checkoutProduct1 = await CheckoutPage.getCheckoutProduct(cartProduct1.name)
        const checkoutProduct2 = await CheckoutPage.getCheckoutProduct(cartProduct2.name)
        const totalAmount = await CheckoutPage.getTotalAmount()
        expect(checkoutProduct1).toEqual(cartProduct1)
        expect(checkoutProduct2).toEqual(cartProduct2)
        expect(totalAmount).toEqual(checkoutProduct1.total + checkoutProduct2.total)

        await CheckoutPage.clickOnPlaceOrderBtn()
        await PaymentPage.assertPageLoaded()

        await PaymentPage.fillPaymentData(checkoutData.valid)
        await PaymentPage.clickOnPayBtn()

        await PaymentPage.waitForCheckoutIsCompleted()
        expect(await PaymentPage.isCheckoutCompleted()).toBe(true)
    })

    it('should show checkout with invalid payment data', async () => {
        const firstProduct = 15

        await ProductsPage.open()
        await ProductsPage.assertPageLoaded()
        await ProductsPage.addToCartAndContinue(firstProduct)

        await CartPage.open()
        await CartPage.assertPageLoaded()
        await CartPage.assertCartIsNotEmpty()
        await CartPage.clickOnCheckoutBtn()

        await CheckoutPage.assertPageLoaded()
        await CheckoutPage.assertProductListIsNotEmpty()
        await CheckoutPage.clickOnPlaceOrderBtn()

        await PaymentPage.assertPageLoaded()
        await PaymentPage.fillPaymentData(checkoutData.invalid)
        await PaymentPage.clickOnPayBtn()

        expect(await browser.getUrl()).toContain('/payment')
        expect(await PaymentPage.isCheckoutCompleted()).toBe(false)
    })
})
