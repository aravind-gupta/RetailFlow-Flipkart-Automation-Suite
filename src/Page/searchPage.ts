import { Locator, Page } from "@playwright/test";


export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly secondPage: Locator;
    readonly product: Locator;
    readonly loginPopupCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: 'Search for Products, Brands and More' }).first();
        this.secondPage = page.locator("nav").getByRole('link', { name: '2' }).first();
        this.product = page.locator("img[alt*='iPhone']").first();
        this.loginPopupCloseButton = page.locator("button._2KpZ6l._2doB4z, button[aria-label='Close'], button[aria-label='close'], button:has-text('✕')").first();
    }

    async closeLoginPopupIfVisible() {
        if (await this.loginPopupCloseButton.count() && await this.loginPopupCloseButton.isVisible().catch(() => false)) {
            await this.loginPopupCloseButton.click();
        }
    }
}
