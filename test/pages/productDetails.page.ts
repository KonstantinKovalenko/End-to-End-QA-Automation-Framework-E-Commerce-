class ProductDetailsPage {
    get #productInfo () {return $('.product-information')}

    async getName (){
        return await this.#productInfo.$('h2').getText()
    }

    async getPrice (){
        return await this.#productInfo.$('span').$('span').getText()
    }
}

export default new ProductDetailsPage();
