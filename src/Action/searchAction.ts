import { Page } from "@playwright/test";
import { SearchPage } from "../Page/searchPage";
import searchData from "../TestData/data.json";

export class SearchAction {
    readonly search: SearchPage;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.search = new SearchPage(page);
    }

    async openHomePage() {
        await this.page.goto(searchData.baseUrl, {
            waitUntil: "domcontentloaded"
        });
        await this.page.waitForLoadState("networkidle");
        await this.search.closeLoginPopupIfVisible();
    }

    async fillSearchInput(searchText: string = searchData.searchText) {
        await this.openHomePage();
        await this.search.closeLoginPopupIfVisible();
        await this.search.searchInput.waitFor({
            state: "visible"
        });

        await this.search.searchInput.fill(searchText);
        await this.search.searchInput.press("Enter");
        await this.page.waitForLoadState("networkidle");
        await this.search.closeLoginPopupIfVisible();
    }

    async clickSecondPage() {
        await this.search.secondPage.waitFor({
            state: "visible"
        });
        await this.search.secondPage.click();
        await this.page.waitForLoadState("networkidle");
    }

    async clickProduct() {
        await this.search.product.waitFor({
            state: "visible"
        });
        await this.search.product.click();
        await this.page.waitForLoadState("networkidle");
    }
}