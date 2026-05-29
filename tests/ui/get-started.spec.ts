import { expect, test } from '../fixtures/ui.fixture';

test.describe('@ui Playwright documentation', () => {
  test('navigates to installation from get started', async ({ homePage, page }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/Playwright/);

    await homePage.openGetStarted();
    await homePage.expectInstallationHeading();
  });
});
