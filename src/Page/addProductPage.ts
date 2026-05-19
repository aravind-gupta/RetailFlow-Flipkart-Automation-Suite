import {Page, Locator} from '@playwright/test';

export class AddProductPage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly products: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByRole('textbox', { name: 'Search for Products, Brands and More' });
        this.products = page.locator('//a[contains(@href, "/p/") and descendant::img]');
        this.addToCartButton = page.locator('div:has-text("Add to cart")');
        this.cartLink = page.locator('//a[contains(@href, "/viewcart")]');
    }
}