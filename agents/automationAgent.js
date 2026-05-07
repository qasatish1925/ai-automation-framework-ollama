const fs = require("fs-extra");
const { chromium } = require("playwright");
const { detectSearchLocator } = require("../utils/locatorDetector");
const { getLocatorHelper } = require("../utils/selfHealingLocator");

async function generatePlaywrightCode(url) {
  const testCases = fs.readJsonSync("./output/testCases.json");
  const reviews = fs.readJsonSync("./output/reviewComments.json");

  // Filter approved
  const approved = testCases.filter(tc => {
    const r = reviews.find(x => x.id === tc.id);
    return r && r.status !== "Rejected";
  });

  // DOM detection
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const locator = await detectSearchLocator(page);
  await browser.close();

  // Generate tests dynamically
  const tests = approved.map(tc => {
    const steps = tc.steps?.join(" → ") || "Execute steps";

    return `
  // ${tc.title}
  test("${tc.id}: ${tc.title}", async ({ page }) => {
    const searchInput = ${locator};

    await searchInput.fill("CBC");
    await page.keyboard.press("Enter");

    await page.waitForLoadState("networkidle");

    await expect(page.locator("text=CBC").first()).toBeVisible();
  });
`;
  }).join("\n");

  // Final file
  const finalCode = `
const { test, expect } = require('@playwright/test');

${getLocatorHelper()}

test.describe("Search Functionality Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("${url}");
  });

  ${tests}

});
`;

  fs.outputFileSync("./output/generatedTest.spec.js", finalCode);

  console.log(`✅ Generated ${approved.length} Playwright tests`);
}

module.exports = { generatePlaywrightCode };