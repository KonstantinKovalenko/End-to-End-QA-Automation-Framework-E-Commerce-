import { expect } from '@wdio/globals'
import { parsePrice } from '../utils/helpers'
import ProductsPage from '../pages/products.page'
import ProductDetailsPage from '../pages/productDetails.page'

describe('Product', () => {
    it('should validate product data consistency between list and details page', async () => {
        const index = 0
        await ProductsPage.open()
        
        const listPrice = await parsePrice(await ProductsPage.getPriceByProductIndex(index))
        const listName = await ProductsPage.getNameByProductIndex(index)

        await ProductsPage.openInfoByIndex(index)
        expect (await browser.getUrl()).toContain('product_details')

        const detailPrice = await parsePrice(await ProductDetailsPage.getPrice())
        const detailName = await ProductDetailsPage.getName()

        expect(listPrice).toBeGreaterThan(0)
        expect(listName.length).toBeGreaterThan(0)
        
        expect(listPrice).toBe(detailPrice)
        expect(listName).toBe(detailName)
    })
})
