import {test} from '../src/Fixture/fixture';
import data from '../src/TestData/data.json';

test("Add Product to Cart and verify the increase in total quantity on Cart Page", async ({page, appAction}) => {
    await page.goto("https://www.flipkart.com/");
    await appAction.addProductAction.searchProduct(data.productName);
    await appAction.addProductAction.selectProduct();
  //  await appAction.addProductAction.addFirstProductToCart();
  await appAction.addProductAction.method();
    await appAction.addProductAction.verifyProductTotal();
})