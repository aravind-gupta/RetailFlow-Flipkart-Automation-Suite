import {Page, Locator} from '@playwright/test';

export class AddProductPage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly products: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByRole('textbox', {name: 'Search for Products, Brands and More'})
        this.products = page.locator('//div[@data-id]/descendant::img[@loading="eager"]');
        this.addToCartButton = page.locator('//div[text() = "Add to cart"]');
        this.cartLink = page.locator('//img[@alt="Cart"]');
        this.totalPrice = page.locator('//div[contains(text(), "Price (")]/parent::div/parent::div/following-sibling::div/descendant::div[contains(text(), "₹")]');
    }
}