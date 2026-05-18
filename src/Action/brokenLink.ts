import { Page, request } from "@playwright/test";
import { brokenLink } from "../Page/brokenLink";

export class brokenLinkAction {
  readonly page: Page;
  readonly linkBroken: brokenLink;

  constructor(page: Page) {
    this.page = page;
    this.linkBroken = new brokenLink(page);
  }
 async checkBrokenLinks() {
  const links = this.linkBroken.link;

  const hrefs = await links.evaluateAll(elements =>
    elements.map(el => el.getAttribute("href"))
  );

  for (const href of hrefs) {
    if (!href) continue;

    if (
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href === "/"
    ) continue;

    const fullUrl = new URL(href, this.page.url()).href;

    try {
      const res = await this.page.goto(fullUrl, {
        timeout: 3000,
        waitUntil: "domcontentloaded"
      });

      if (res && res.status() >= 400) {
        console.log("Broken Link:", fullUrl, res.status());
      }

    } catch {
      console.log("Error:", fullUrl);
    }
  }
}
}