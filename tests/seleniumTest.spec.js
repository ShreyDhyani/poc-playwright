const {By, Builder, Browser, until} = require('selenium-webdriver');
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
        await continueButton.click();

        // await driver.wait(until.elementLocated(By.cssSelector(".text-primary.text-size-14[shub-ins='1']")))
        // .then(el => el.click()
        // .then(x => console.log(x)));

        await driver.findElement(By.id("pan")).sendKeys('UCRPP3751M');
        await driver.findElement(By.className('rounded-5')).click();

        await driver.findElement(By.id("otp")).sendKeys('123456');
        await driver.findElement(By.className('rounded-5')).click();
        
        await driver.findElement(By.id("amount")).sendKeys('5000')
        const buttonElement = await driver.findElement(By.className('rounded-5'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', buttonElement);
        await buttonElement.click();

        await driver.findElement(By.id("otp")).sendKeys('123456');
        const orderContinueButton = await driver.findElement(By.className('rounded-5'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', orderContinueButton);
        await orderContinueButton.click();

        const originalWindow = await driver.getWindowHandle();

        const payButton = await driver.findElement(By.css('button[type="submit"].rounded-5'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', payButton);
        setTimeout(function() {
            payButton.click();
        }, 500);

        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
        );
        const windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
            if (handle !== originalWindow) {
                await driver.switchTo().window(handle);
            }
        });

        const successButton = await driver.findElement(By.className('success'));
        setTimeout(function() {
            successButton.click();
        }, 500);

        // await driver.switchTo().window(originalWindow);
        // await driver.quit();
    });
    });
}, { browsers: [Browser.CHROME]});