
import { test as base } from "@playwright/test";
import { brokenLinkAction } from "../Action/brokenLink";
import { SearchAction } from "../Action/searchAction";

type AppActions = {
    brokenLinkAction: brokenLinkAction;
    searchAction: SearchAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({


 
  
appActions: async ({ page }, use) => {
    const appAction : AppActions = {
        brokenLinkAction: new brokenLinkAction(page),
        searchAction: new SearchAction(page)
    };

  await use(appAction);
},
});
export { expect } from "@playwright/test";

