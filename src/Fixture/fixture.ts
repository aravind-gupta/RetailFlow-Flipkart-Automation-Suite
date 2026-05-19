
import { test as base } from "@playwright/test";
import { brokenLinkAction } from "../Action/brokenLink";
import { AddProductAction } from "../Action/addProductAction";

type AppActions = {
    brokenLinkAction: brokenLinkAction;
    addProductAction: AddProductAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({


 
  
appActions: async ({ page }, use) => {
    const appAction : AppActions = {
        brokenLinkAction: new brokenLinkAction(page),
        addProductAction: new AddProductAction(page)
    
  };

  await use(appAction);
},
});
export { expect } from "@playwright/test";

