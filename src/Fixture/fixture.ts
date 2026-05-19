import { test as base } from "@playwright/test";
import { brokenLinkAction } from "../Action/brokenLink";
import { AddProductAction } from "../Action/addProductAction";
import { OutofStockAction } from "../Action/stockAction";

type AppActions = {
    brokenLinkAction: brokenLinkAction;
    addProductAction: AddProductAction;
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
        addProductAction: new AddProductAction(page),
            stock: new OutofStockAction(page),
        };
        await use(appAction);
    },
});

export { expect } from "@playwright/test";