import { expect } from '@wdio/globals'
import { users } from "../utils/testData"
import LoginPage from '../pages/login.page'
import { isLoggedIn } from '../utils/helpers'

describe('Auth flow', () => {
    it('Should show login using valid data', async () => {
        await LoginPage.open()

        await LoginPage.login(users.validUser.email, users.validUser.password)
        expect(await isLoggedIn()).toBe(true)
    })
})
