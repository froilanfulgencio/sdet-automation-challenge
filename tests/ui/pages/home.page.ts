import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  // Navigation elements
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly logoutLink: Locator;

  // Category elements
  readonly phonesCategory: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;

  // Product elements
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;

  // Carousel/Slider
  readonly carouselContainer: Locator;
  readonly carouselPrevButton: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselIndicators: Locator;

  // Footer
  readonly footer: Locator;
  readonly footerAboutUs: Locator;
  readonly footerGetInTouch: Locator;

  // Pagination
  readonly previousButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation
    this.logo = page.locator('#nava');
    this.homeLink = page.locator('a.nav-link').filter({ hasText: 'Home' });
    this.contactLink = page.locator('a[data-target="#exampleModal"]');
    this.aboutUsLink = page.locator('a[data-target="#videoModal"]');
    this.cartLink = page.locator('#cartur');
    this.loginLink = page.locator('#login2');
    this.signupLink = page.locator('#signin2');
    this.logoutLink = page.locator('#logout2');

    // Categories
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops'});
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });

    // Products
    this.productItems = page.locator('.col-lg-4.col-md-6.mb-4');
    this.productNames = page.locator('.card-title a');
    this.productPrices = page.locator('.card-block h5');
    this.productImages = page.locator('.card-img-top');

    // Carousel
    this.carouselContainer = page.locator('#carouselExampleIndicators');
    this.carouselPrevButton = page.locator('.carousel-control-prev');
    this.carouselNextButton = page.locator('.carousel-control-next');
    this.carouselIndicators = page.locator('.carousel-indicators');

    // Footer
    this.footer = page.locator('#footc');
    this.footerAboutUs = page.locator('#fotcont').filter({ hasText: 'About Us' });
    this.footerGetInTouch = page.locator('#fotcont').filter({ hasText: 'Get in Touch' });

    // Pagination
    this.previousButton = page.locator('#prev2');
    this.nextButton = page.locator('#next2');
  }

  /**
   * Navigate to home page
   */
  async navigate() {
    await this.goto('/');
    await this.waitForDOMContentLoaded();
  }

  /**
   * Verify all navigation menu items are present
   */
  async verifyNavigationMenu() {
    await this.verifyElementVisible(this.homeLink);
    await this.verifyElementVisible(this.contactLink);
    await this.verifyElementVisible(this.aboutUsLink);
    await this.verifyElementVisible(this.cartLink);
    await this.verifyElementVisible(this.loginLink);
    await this.verifyElementVisible(this.signupLink);
  }

  /**
   * Verify carousel is visible and functional
   */
  async verifyCarousel() {
    await this.verifyElementVisible(this.carouselContainer);
  }

  /**
   * Click carousel next button
   */
  async clickCarouselNext() {
    await this.click(this.carouselNextButton);
    await this.page.waitForTimeout(500); // Wait for carousel animation
  }

  /**
   * Click carousel previous button
   */
  async clickCarouselPrevious() {
    await this.click(this.carouselPrevButton);
    await this.page.waitForTimeout(500); // Wait for carousel animation
  }

  /**
   * Verify footer information is displayed
   */
  async verifyFooter() {
    await this.verifyElementVisible(this.footer);
  }

  /**
   * Verify home page is fully loaded
   */
  async verifyHomePageLoaded() {
    await this.verifyElementVisible(this.logo);
    await this.verifyElementVisible(this.homeLink);
    await this.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Get count of visible products
   */
  async getProductCount(): Promise<number> {
    await this.productItems.first().waitFor({ state: 'visible' });
    return await this.productItems.count();
  }

  /**
   * Click on Phones category
   */
  async clickPhonesCategory() {
    await this.click(this.phonesCategory);
    await this.page.waitForTimeout(1000); // Wait for products to load
  }

  /**
   * Click on Laptops category
   */
  async clickLaptopsCategory() {
    await this.click(this.laptopsCategory);
    await this.page.waitForTimeout(1000); // Wait for products to load
  }

  /**
   * Click on Monitors category
   */
  async clickMonitorsCategory() {
    await this.click(this.monitorsCategory);
    await this.page.waitForTimeout(1000); // Wait for products to load
  }

  /**
   * Get all visible product names
   */
  async getProductNames(): Promise<string[]> {
    await this.productNames.first().waitFor({ state: 'visible' });
    const names = await this.productNames.allTextContents();
    return names;
  }

  /**
   * Get all product prices
   */
  async getProductPrices(): Promise<string[]> {
    await this.productPrices.first().waitFor({ state: 'visible' });
    return await this.productPrices.allTextContents();
  }
}
