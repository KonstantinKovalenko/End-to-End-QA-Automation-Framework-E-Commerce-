import { expect } from '@wdio/globals'
import { users } from '../utils/testData'
import { parsePrice } from '../utils/helpers'
import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import ProductsPage from '../pages/products.page'
import CartPage from '../pages/cart.page'

describe('Cart', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login(users.validUser.email, users.validUser.password)
        expect(await HomePage.isLoggedIn()).toBe(true)

        await CartPage.open()
        await CartPage.eraseCart()
    })

    it('Should validate total price', async () => {
        const firstProduct = 0
        const secondProduct = 5
        await ProductsPage.open()
        await ProductsPage.assertPageLoaded()

        const listProduct1 = await ProductsPage.getListProduct(firstProduct)
        await ProductsPage.addToCartAndContinue(firstProduct)

        const listProduct2 = await ProductsPage.getListProduct(secondProduct)
        await ProductsPage.addToCartAndContinue(secondProduct)

        await CartPage.open()
        await CartPage.assertPageLoaded()

        const cartProduct1 = await CartPage.getCartProduct(listProduct1.name)
        expect(cartProduct1.price).toBe(listProduct1.price)
        expect(cartProduct1.total).toBe(cartProduct1.price*cartProduct1.quantity)

        const cartProduct2 = await CartPage.getCartProduct(listProduct2.name)
        expect(cartProduct2.price).toBe(listProduct2.price)
        expect(cartProduct2.total).toBe(cartProduct2.price*cartProduct2.quantity)
    })
})

/* 
🔥 SCENARIO 4 — CART STATE
добавить товар
reload page
проверить:
корзина не сбросилась */
 