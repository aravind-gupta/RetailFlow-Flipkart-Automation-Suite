import { Page, Locator } from "@playwright/test";

export class OutofStockPage {
    readonly page: Page;
    readonly searchProduct: Locator;
    readonly productTitle: Locator;
    readonly verifyStock: Locator;
    readonly closeLoginPopup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchProduct = page.locator('//input[@placeholder="Search for Products, Brands and More"]');
        this.productTitle = page.locator("//div[text()='Apple iPhone 17 Pro (Silver, 256 GB)']");
        this.verifyStock = page.locator('//div[text()="Out of stock"]');
        this.closeLoginPopup = page.locator('//button[contains(text(),"✕")]');
    }
}