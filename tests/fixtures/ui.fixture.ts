import { test as base } from '@playwright/test';
import { PlaywrightHomePage } from '../../src/ui/pages/playwrightHomePage';

type UiFixtures = {
  homePage: PlaywrightHomePage;
};

export const test = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new PlaywrightHomePage(page));
  },
});

export { expect } from '@playwright/test';
