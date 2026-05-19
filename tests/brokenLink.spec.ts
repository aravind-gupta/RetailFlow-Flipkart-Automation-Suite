import{  expect } from "@playwright/test";
import { test } from "../src/Fixture/fixture";

test.describe("broken link test", () => {
test.setTimeout(300000); // 5 minutes
  test("check broken links", async ({ page, appActions }) => {
  await page.goto('https://www.flipkart.com/', {
    waitUntil: 'domcontentloaded'
  });

    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(5000);

    await appActions.brokenLinkAction.checkBrokenLinks();
    console.log("Broken link test completed");


  });

});

