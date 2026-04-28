import { expect } from '@wdio/globals'
import { parsePrice } from '../utils/helpers'
import ProductsPage from '../pages/products.page'
import ProductDetailsPage from '../pages/productDetails.page'

describe('Product', () => {
    it('', async () => {
        const index = 0
        await ProductsPage.open()
        
        const listPrice = await parsePrice(await ProductsPage.getPriceByProductIndex(index))
        const listName = await ProductsPage.getNameByProductIndex(index)

        await ProductsPage.openInfoByIndex(index)
        expect (await browser.getUrl()).toContain('product_details')

        const detailPrice = await parsePrice(await ProductDetailsPage.getPrice())
        const detailName = await ProductDetailsPage.getName()

        expect(listPrice).toEqual(detailPrice)
        expect(listName).toEqual(detailName)
    })
})
