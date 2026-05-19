import {test, expect} from '../src/Fixture/fixture';

test('search product iphone', async ({appActions})=>{
    await appActions.searchAction.fillSearchInput();
    await appActions.searchAction.clickSecondPage();
    await appActions.searchAction.clickProduct();
})  