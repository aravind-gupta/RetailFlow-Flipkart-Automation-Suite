import { test } from "../src/Fixture/fixture";

test("Verify Product is Out of Stock on Flipkart", async ({ appActions }) => {

    await test.step("Step 1: Navigate to Flipkart Homepage", async () => {
        await appActions.stock.navigateUrl();
    });
    
    await test.step("Step 2: Search for iPhone 17 Pro", async () => {
        await appActions.stock.enterSearchItem();
    });

    await test.step("Step 3: Click on Product and Verify Out of Stock", async () => {
        await appActions.stock.clickonSearchProduct();
    });
});