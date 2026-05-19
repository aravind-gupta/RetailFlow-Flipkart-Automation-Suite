import {Page, expect} from '@playwright/test';
import { AddProductPage } from '../Page/addProductPage';

export class AddProductAction {
    readonly addProductPage: AddProductPage;
    readonly page: Page;

    constructor(page: Page) {
        this.addProductPage = new AddProductPage(page);
        this.page = page;
    }

    async searchProduct(productName: string) {
        await this.addProductPage.searchBar.fill(productName);
        await this.addProductPage.searchBar.press("Enter");
    }

    async selectProduct() {
        await this.addProductPage.products.nth(3).click();
    }

    async addFirstProductToCart() {
          await this.page.waitForLoadState('domcontentloaded');
        //await this.addProductPage.addToCartButton.scrollIntoViewIfNeeded();
        await this.addProductPage.addToCartButton.click();
    }

    async goToCart() {
        await this.addProductPage.cartLink.click();
    }

    async verifyProductTotal() {
        const totalPriceText = await this.addProductPage.totalPrice.innerText();
        const totalPrice = parseInt(totalPriceText.replace("₹", "").trim());
        await expect(totalPrice).toBeGreaterThan(0);
    }

    async method(){






// Click on Add to Cart in new window
await this.page
  .locator('//div[normalize-space()="Add to Cart"]')
  .click();

}}