import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/automationexercise/home.page'

describe('E-commerce testing', () => {
    it('should confirm js to ts convertion complete', async () => {
        await HomePage.open()
    })
})

