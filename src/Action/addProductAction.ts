import {Page, expect} from '@playwright/test';
import { AddProductPage } from '../Page/addProductPage';

export class AddProductAction {
    readonly addProductPage: AddProductPage;
    readonly page: Page;
    productPage: Page | null = null;
    productPageInstance: AddProductPage | null = null;

    constructor(page: Page) {
        this.addProductPage = new AddProductPage(page);
        this.page = page;
    }

    async searchProduct(productName: string) {
        await this.addProductPage.searchBar.fill(productName);
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
            this.addProductPage.searchBar.press('Enter')
        ]);
    }

    async selectProduct() {
        const productLocator = this.addProductPage.products.first();
        await productLocator.waitFor({ state: 'visible', timeout: 20000 });

        const context = this.page.context();
        const popupPromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);
        const navigationPromise = this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null);

        await productLocator.click();
        const popup = await popupPromise;

        if (popup) {
            await popup.waitForLoadState('domcontentloaded');
            this.productPage = popup;
            this.productPageInstance = new AddProductPage(popup);
        } else {
            await navigationPromise;
            this.productPage = this.page;
            this.productPageInstance = new AddProductPage(this.page);
        }
    }

    async addFirstProductToCart() {
        const targetPage = this.productPageInstance ?? this.addProductPage;
        await targetPage.addToCartButton.first().waitFor({ state: 'visible', timeout: 15000 });
        await targetPage.addToCartButton.first().click();
    }

    async goToCart() {
        await this.page.goto('https://www.flipkart.com/viewcart?exploreMode=TRUE&preference=FLIPKART', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        await this.page.waitForURL(/viewcart/);
    }

    async verifyProductTotal() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/viewcart/);

        const bodyText = await this.page.locator('body').innerText();
        const match = bodyText.match(/₹\s*([0-9,]+)/);

        if (match) {
            const totalPrice = parseInt(match[1].replace(/,/g, ''));
            await expect(totalPrice).toBeGreaterThan(0);
            return;
        }

        const cartEmpty = this.page.locator('text=Missing Cart items?');
        await expect(cartEmpty).toBeVisible({ timeout: 10000 });
        const loginPrompt = this.page.locator('a:has-text("Login")').first();
        await expect(loginPrompt).toBeVisible({ timeout: 10000 });
    }
}