const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

suite(function (env) {
    describe('Test the flow', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // after(async () => await driver.quit());

    it('First Selenium script', async function () {
        await driver.get('https://prueba.fpappstest.io/');

        let title = await driver.getTitle();
        assert.equal("FP Apps", title);

        await driver.manage().setTimeouts({implicit: 10000});

        let investButton = await driver.findElement(By.linkText('Invest'));
        await investButton.click();

        let continueButton = await driver.findElement(By.className('rounded-5'));
        console.log(continueButton);
        await continueButton.click();
        // let submitButton = await driver.findElement(By.css('button'));

        // await submitButton.click();

        // let message = await driver.findElement(By.id('message'));
        // let value = await message.getText();
        // assert.equal("Received!", value);
    });
    });
}, { browsers: [Browser.CHROME]});