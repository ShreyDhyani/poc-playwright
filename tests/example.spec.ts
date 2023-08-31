import { test, expect } from "@playwright/test";

test("copy PAN input sample #1", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("div")
    .filter({
      hasText: /^UCRPP3751MCopy$/,
    })
    .getByRole("button")
    .click();

  const inputValue = await page
    .getByPlaceholder("Enter PAN")
    .getAttribute("value");
  expect(inputValue).toBe("UCRPP3751M");
});

test("copy PAN input sample #2", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^XXXPX3751XCopy$/ })
    .getByRole("button")
    .click();

  const inputValue = await page
    .getByPlaceholder("Enter PAN")
    .getAttribute("value");
  expect(inputValue).toBe("XXXPX3751X");
});

test("copy PAN input sample #3", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^XXXPX3753XCopy$/ })
    .getByRole("button")
    .click();

  const inputValue = await page
    .getByPlaceholder("Enter PAN")
    .getAttribute("value");
  expect(inputValue).toBe("XXXPX3753X");
});

test("No PAN input", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter PAN").fill("");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect
    .soft(page.getByRole("heading", { name: "Required field" }))
    .toBeVisible();
});

test("No PAN input #2", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter PAN").fill("");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect
    .soft(page.getByRole("heading", { name: "This input is required" }))
    .toBeVisible();
});

test("Wrong PAN input #1 - All Digits", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter PAN").fill("1234567890");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect
    .soft(page.getByRole("heading", { name: "Enter in a valid format" }))
    .toBeVisible();
});

test("Wrong PAN input #2 - Random String", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter PAN").fill("asgahsgdass8");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect
    .soft(page.getByRole("heading", { name: "Enter in a valid format" }))
    .toBeVisible();
});

test("Wrong PAN multiple values", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.waitForURL("https://prueba.fpappstest.io/");

  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  const inputs = ["1234567890", "Sample", "Test Pan", "15BASJD123"];
  for (const index in inputs) {
    await page.getByPlaceholder("Enter PAN").fill(inputs[index]);
    await page.getByRole("button", { name: "Continue" }).click();
    await expect
      .soft(page.getByRole("heading", { name: "Enter in a valid format" }))
      .toBeVisible();
  }
});
