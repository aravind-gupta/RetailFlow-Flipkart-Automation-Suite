import {test} from '../src/Fixture/fixture';
import data from '../src/TestData/data.json';

const testData = data as { productName: string };

test("Add Product to Cart and verify the increase in total quantity on Cart Page", async ({page, appActions}: any) => {
    await page.goto("https://www.flipkart.com/");
    await appActions.addProductAction.searchProduct(testData.productName);
    await appActions.addProductAction.selectProduct();
    await appActions.addProductAction.addFirstProductToCart();
    await appActions.addProductAction.goToCart();
    await appActions.addProductAction.verifyProductTotal();
})