import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click on element
   */
  async click(locator: Locator) {
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Verify element is visible
   */
  async verifyElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element text
   */
  async verifyElementText(locator: Locator, expectedText: string | RegExp) {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Verify page title
   */
  async verifyTitle(expectedTitle: string | RegExp) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Verify URL contains text
   */
  async verifyUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM content loaded
   */
  async waitForDOMContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
