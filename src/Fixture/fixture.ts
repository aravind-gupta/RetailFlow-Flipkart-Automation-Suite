import { test as base } from "@playwright/test";
import { brokenLinkAction } from "../Action/brokenLink";
import { OutofStockAction } from "../Action/stockAction";

type AppActions = {
    brokenLinkAction: brokenLinkAction;
    stock: OutofStockAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({

    appActions: async ({ page }, use) => {
        const appAction: AppActions = {
            brokenLinkAction: new brokenLinkAction(page),
            stock: new OutofStockAction(page),
        };
        await use(appAction);
    },
});

export { expect } from "@playwright/test";