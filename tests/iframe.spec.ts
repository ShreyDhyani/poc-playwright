import { test, expect } from "@playwright/test";

test("Invest Flow - Success", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^UCRPP3751MCopy$/ })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Copy" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter amount").click();
  await page.getByPlaceholder("Enter amount").fill("5000");
  await page.getByRole("button", { name: "Confirm & Pay" }).click();
  await page.getByRole("button", { name: "Copy" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Pay ₹ 5,000" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("button", { name: "Success" }).click();
  // await page.getByRole("button", { name: "Invest again" }).click();
  await expect(
    page.getByRole("heading", { name: "Order under process" })
  ).toBeVisible();
});

test("Invest Flow - Failure", async ({ page }) => {
  await page.goto("https://prueba.fpappstest.io/");
  await page.getByRole("link", { name: "Invest", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^AQIPU3751YCopy$/ })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Copy" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Enter amount").click();
  await page.getByPlaceholder("Enter amount").fill("5000");
  await page.getByRole("button", { name: "Confirm & Pay" }).click();
  await page.getByRole("button", { name: "Copy" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Pay ₹ 5,000" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("button", { name: "Failure" }).click();
  // await page.getByRole('heading', { name: 'Error while making payment' }).click();
  await expect(
    page.getByRole("heading", { name: "Error while making payment" })
  ).toBeVisible();
});
