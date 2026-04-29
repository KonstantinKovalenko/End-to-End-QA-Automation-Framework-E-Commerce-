import { expect } from '@wdio/globals'
import { parsePrice } from '../utils/helpers'
import ProductsPage from '../pages/products.page'
import ProductDetailsPage from '../pages/productDetails.page'

describe('Product', () => {
    it('should validate product data consistency between list and details page', async () => {
        const index = 0
        await ProductsPage.open()
        
        const listProduct = await ProductsPage.getListProduct(index)

        await ProductsPage.openInfoByIndex(index)
        expect (await browser.getUrl()).toContain('product_details')

        const detailPrice = await parsePrice(await ProductDetailsPage.getPrice())
        const detailName = await ProductDetailsPage.getName()

        expect(listProduct.price).toBeGreaterThan(0)
        expect(listProduct.name.length).toBeGreaterThan(0)
        
        expect(listProduct.price).toBe(detailPrice)
        expect(listProduct.name).toBe(detailName)
    })
})
