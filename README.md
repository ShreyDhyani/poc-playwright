# Playwright-POC

This POC tests input button for https://prueba.fpappstest.io/

## Setup

1. Clone the repo
2. Run yarn/npm to install all packages

Following are the scripts that we can use:

### Test

`yarn test`: This will run all the available tests in playwright with headless mode, screenshots and trace mode(can be seen in test report).

### Report

`yarn report`: This will open playwright repost for test, use this after you have run the tests at least once.

### Codegen

`yarn codegen`: This will open the playwright codegen to create automatic test and find locators for elements.


### Selenium Testi:
`yarn mocha tests/seleniumTest.spec.js`: This will open the browser to run the selenium test.
