
import { Page, Locator } from "@playwright/test";

export class brokenLink {
  readonly page: Page;
  readonly link: Locator;

  constructor(page: Page) {
    this.page = page;

    // saare anchor tags
    this.link = page.locator("a");
  }
}
