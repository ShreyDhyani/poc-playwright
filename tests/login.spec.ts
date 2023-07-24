import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
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

  await page.waitForURL(
    "https://prueba.fpappstest.io/checkout/?isin=INF204K01943&mtm_campaign=staging"
  );
  await page.locator("#Ellipse_1009").waitFor();
  await page.locator("#Ellipse_1009").click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
});
