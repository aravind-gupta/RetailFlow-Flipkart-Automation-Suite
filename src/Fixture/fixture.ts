
import { test as base } from "@playwright/test";
import { brokenLinkAction } from "../Action/brokenLink";

type AppActions = {
    brokenLinkAction: brokenLinkAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({


 
  
appActions: async ({ page }, use) => {
    const appAction : AppActions = {
        brokenLinkAction: new brokenLinkAction(page)
    
  };

  await use(appAction);
},
});
export { expect } from "@playwright/test";

