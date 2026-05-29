import { expect, Page } from '@playwright/test';

export class PlaywrightHomePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openGetStarted(): Promise<void> {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  async expectInstallationHeading(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }
}
