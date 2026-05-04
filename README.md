# End-to-End QA Automation Framework (E-Commerce)
## About the Project

This project is a portfolio-level end-to-end UI automation framework created for testing an e-commerce web application using WebdriverIO and TypeScript.

The project simulates a real QA workflow and includes:

* UI automation testing
* positive and negative test scenarios
* cart and checkout validation
* reusable Page Object architecture
* test documentation
* bug reporting
* exploratory testing results

The framework was developed as part of a structured QA Automation learning roadmap with focus on real-world testing practices and maintainable test architecture.

Test target:  
[https://automationexercise.com/](https://automationexercise.com/)

---

## Tech Stack
* TypeScript  
* WebdriverIO  
* Mocha  
* Page Object Model (POM)  
* Node.js

---

## Project Goals

The main goals of this project were:

* Build a scalable UI automation framework  
* Practice Page Object Model architecture  
* Improve async UI handling  
* Work with dynamic product/cart data  
* Validate business logic through automated tests
* Practice negative testing  
* Create professional QA documentation  
* Simulate real QA workflow from test design to bug reporting  


---

## Covered Functional Areas  
The project includes automated testing for:

* User authentication  
* Product validation  
* Product details consistency  
* Cart functionality  
* Cart persistence after page refresh  
* Multi-product cart validation  
* Checkout flow  
* Payment validation  
* Negative checkout scenarios  

--- 

## Automated Test Scenarios
### Authentication
* Valid user login
* Login state validation
### Products
* Product information consistency between catalog and product page
### Cart
* Add products to cart
* Validate product prices
* Validate total price calculation
* Validate cart persistence after page refresh
### Checkout
* Validate checkout summary
* Validate order totals
* Validate successful checkout flow
* Validate invalid payment scenarios

---

## Framework Features
### Reusable Page Objects

The framework uses Page Object Model architecture with separated UI interaction methods.

### Utility Helpers

Reusable helper functions were created for:

* price parsing
* text processing
* dynamic value handling

### Dynamic Data Validation

The tests validate actual UI data instead of relying on hardcoded product values.

### Async Stability

The framework includes:

* explicit waits
* waitUntil logic
* dynamic element handling
* protection against stale UI states

---

## Project Structure
project-root/  
│  
├── test/  
│   ├── specs/  
│   ├── pages/  
│   ├── utils/  
│   ├── test-cases/  
│   └── bug-reports/  
│  
├── package.json  
├── tsconfig.json  
└── wdio.conf.js

---

## Test Documentation

The project also includes manual QA artifacts:

### Test Cases

Manual test cases were created and documented in Excel.

Location:
```
/test/test-cases
```

### Bug Reports

Exploratory testing and automated scenario analysis resulted in several documented defects.

Location:
```
/test/bug-reports
```
---

## Bugs Found During Testing

Examples of discovered defects:

* Invalid email format accepted during registration
* Checkout completed with invalid payment data
* Product can be added to cart with zero quantity

---

## Installation

Clone repository:
```
git clone <repository-url>
```
Install dependencies:
```
npm install
```

---

## Run Tests

Run all tests:
```
npm run test
```

Run specific spec:
```
npx wdio run wdio.conf.js --spec ./test/specs/cart.e2e.ts
```

---


## What I Practiced in This Project
* UI automation architecture
* Test design
* Page Object Model
* Async UI handling
* Dynamic assertions
* Negative testing
* Exploratory testing
* Bug reporting
* QA documentation
* Framework maintainability

---


## Future Improvements

Possible future enhancements:

* API testing integration
* Allure reporting
* Cross-browser execution
* Data-driven testing

---


## Author

QA Automation portfolio project created by Konstantin Kovalenko.

* GitHub: https://github.com/KonstantinKovalenko  
* LinkedIn: [www.linkedin.com/in/kostyantyn-kovalenko/](https://www.linkedin.com/in/kostyantyn-kovalenko/)
* Email: chvyaka.kk@gmail.com
* Telegram: @kovakost