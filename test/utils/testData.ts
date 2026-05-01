export const users = {
    validUser:{
        email: 'kovakost.at@gmail.com',
        password: 'QWEasd123890!'
    },
    checkoutUser:{
        email: 'mr.random@gmail.com',
        password: 'QWE*asd123890',
    }
}

export const addresses = {
    valid:{
        name: 'John',
        surname: 'Doe',
        address: '123 Main St',
        country: 'United States',
        state: 'NY',
        city: 'Kingston',
        zipcode: '12401',
        mobile: '0111111100'
    }
}

export const checkoutData = {
    valid: {
        name: 'Diana Doe',
        card: '1234567891234567',
        CVC: '123',
        expMonth: '01',
        expYear: '2030'
    },
    invalid: {
        name: '',
        card: '1234567891234567',
        CVC: '',
        expMonth: '',
        expYear: ''
    }
}