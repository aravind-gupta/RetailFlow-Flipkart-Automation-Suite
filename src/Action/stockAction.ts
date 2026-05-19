import { Page, expect } from "@playwright/test";
import { OutofStockPage } from "../Page/stockPage";

export class OutofStockAction {
    readonly stock_instance: OutofStockPage;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.stock_instance = new OutofStockPage(page);
    }

    async navigateUrl(): Promise<void> {
        await this.page.goto("https://www.flipkart.com/");
        await this.page.waitForLoadState("domcontentloaded");

        if (await this.stock_instance.closeLoginPopup.isVisible()) {
            await this.stock_instance.closeLoginPopup.click();
        }
    }

    async enterSearchItem(): Promise<void> {
        await expect(this.stock_instance.searchProduct.first()).toBeVisible();
        await this.stock_instance.searchProduct.first().fill("iPhone 17 Pro");
        await this.stock_instance.searchProduct.first().press("Enter");
    }

    async clickonSearchProduct(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
        await expect(this.stock_instance.productTitle.first()).toBeVisible({ timeout: 60000 });

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.stock_instance.productTitle.first().click(),
        ]);

        await newPage.waitForLoadState("domcontentloaded");

        const outOfStockPage = new OutofStockPage(newPage);
        await expect(outOfStockPage.verifyStock).toBeVisible({ timeout: 60000 });
        await expect(outOfStockPage.verifyStock).toHaveText("Out of stock");
    }
}