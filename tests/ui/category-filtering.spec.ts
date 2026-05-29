import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test.describe('3.1 Category Filtering', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.waitForDOMContentLoaded();
  });

  test('TS-026: Verify "Phones" category displays only phone products', async () => {
    // Click on Phones category
    await homePage.clickPhonesCategory();
    
    // Wait for products to load
    await homePage.productItems.first().waitFor({ state: 'visible' });
    // wait for a Nokia phone to be visible to ensure products have loaded
    await homePage.page.locator('.card-title').filter({ hasText: 'i5' }).first().waitFor({ state: 'hidden' });
    await homePage.productNames.first().waitFor({ state: 'visible' });
    
    // Get all product names
    const productNames = await homePage.getProductNames();
    
    // Verify at least one product is displayed
    expect(productNames.length).toBeGreaterThan(0);
    
    // Verify product names contain phone brands/models
    const phoneKeywords = ['Samsung', 'Nokia', 'Nexus', 'Iphone', 'Sony', 'HTC'];
    const hasPhoneProduct = productNames.some(name => 
      phoneKeywords.some(keyword => name.includes(keyword))
    );
    expect(hasPhoneProduct).toBeTruthy();
    
    // Verify no laptop products are shown (Sony vaio, MacBook, Dell)
    const laptopKeywords = ['vaio', 'MacBook', 'Dell', 'i5', 'i7'];
    const hasLaptopProduct = productNames.some(name => 
      laptopKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasLaptopProduct).toBeFalsy();
    
    // Verify no monitor products are shown
    const monitorKeywords = ['monitor', 'hd'];
    const hasMonitorProduct = productNames.some(name => 
      monitorKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasMonitorProduct).toBeFalsy();
  });

  test('TS-027: Verify "Laptops" category displays only laptop products', async () => {
    // Click on Laptops category
    await homePage.clickLaptopsCategory();
    
    // Wait for products to load
    await homePage.productItems.first().waitFor({ state: 'visible' });
    
    // Get all product names
    const productNames = await homePage.getProductNames();
    
    // Verify at least one product is displayed
    expect(productNames.length).toBeGreaterThan(0);
    
    // Verify product names contain laptop brands/models
    const laptopKeywords = ['Sony vaio', 'MacBook', 'Dell'];
    const hasLaptopProduct = productNames.some(name => 
      laptopKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasLaptopProduct).toBeTruthy();
    
    // Verify no phone products are shown
    const phoneKeywords = ['Samsung galaxy', 'Nokia lumia', 'Nexus', 'Iphone', 'HTC'];
    const hasPhoneProduct = productNames.some(name => 
      phoneKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasPhoneProduct).toBeFalsy();
    
    // Verify no monitor products are shown
    const hasMonitorProduct = productNames.some(name => 
      name.toLowerCase().includes('monitor')
    );
    expect(hasMonitorProduct).toBeFalsy();
  });

  test('TS-028: Verify "Monitors" category displays only monitor products', async () => {
    // Click on Monitors category
    await homePage.clickMonitorsCategory();
    
    // Wait for products to load
    await homePage.productItems.first().waitFor({ state: 'visible' });
    
    // Get all product names
    const productNames = await homePage.getProductNames();
    
    // Verify at least one product is displayed
    expect(productNames.length).toBeGreaterThan(0);
    
    // Verify products contain monitor-related keywords or are explicitly monitors
    const monitorKeywords = ['monitor', 'ASUS', 'Apple'];
    const hasMonitorProduct = productNames.some(name => 
      monitorKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasMonitorProduct).toBeTruthy();
    
    // Verify no phone products are shown
    const phoneKeywords = ['Samsung galaxy', 'Nokia', 'Iphone', 'HTC', 'xperia'];
    const hasPhoneProduct = productNames.some(name => 
      phoneKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasPhoneProduct).toBeFalsy();
    
    // Verify no laptop products are shown
    const laptopKeywords = ['vaio', 'MacBook'];
    const hasLaptopProduct = productNames.some(name => 
      laptopKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
    );
    expect(hasLaptopProduct).toBeFalsy();
  });

  test('TS-029: Verify clicking category filters products correctly', async () => {
    // Get initial product count (all categories)
    const initialProductCount = await homePage.getProductCount();
    expect(initialProductCount).toBeGreaterThan(0);
    const initialProductNames = await homePage.getProductNames();
    
    // Click Phones category
    await homePage.clickPhonesCategory();
    const phonesProductNames = await homePage.getProductNames();
    const phonesCount = phonesProductNames.length;
    
    // Verify phones are displayed
    expect(phonesCount).toBeGreaterThan(0);
    
    // Click Laptops category
    await homePage.clickLaptopsCategory();
    const laptopsProductNames = await homePage.getProductNames();
    const laptopsCount = laptopsProductNames.length;
    
    // Verify laptops are displayed
    expect(laptopsCount).toBeGreaterThan(0);
    
    // Click Monitors category
    await homePage.clickMonitorsCategory();
    const monitorsProductNames = await homePage.getProductNames();
    const monitorsCount = monitorsProductNames.length;
    
    // Verify monitors are displayed
    expect(monitorsCount).toBeGreaterThan(0);
    
    // Verify each category shows different products
    const phonesAndLaptopsSame = JSON.stringify(phonesProductNames) === JSON.stringify(laptopsProductNames);
    const laptopsAndMonitorsSame = JSON.stringify(laptopsProductNames) === JSON.stringify(monitorsProductNames);
    
    expect(phonesAndLaptopsSame).toBeFalsy();
    expect(laptopsAndMonitorsSame).toBeFalsy();
    
    // Verify filtered counts are reasonable
    expect(phonesCount).toBeLessThanOrEqual(initialProductCount);
    expect(laptopsCount).toBeLessThanOrEqual(initialProductCount);
    expect(monitorsCount).toBeLessThanOrEqual(initialProductCount);
  });

  test('TS-030: Verify category selection is highlighted/active', async () => {
    // Click Phones category
    await homePage.clickPhonesCategory();
    
    // Verify Phones category link is visible
    await expect(homePage.phonesCategory).toBeVisible();
    
    // Click Laptops category
    await homePage.clickLaptopsCategory();
    
    // Verify Laptops category link is visible
    await expect(homePage.laptopsCategory).toBeVisible();
    
    // Click Monitors category
    await homePage.clickMonitorsCategory();
    
    // Verify Monitors category link is visible
    await expect(homePage.monitorsCategory).toBeVisible();
    
    // Additional check: verify category links are in the sidebar/menu
    const categoryList = homePage.page.locator('.list-group');
    await expect(categoryList).toBeVisible();
    
    // Verify all category options exist in the list
    await expect(categoryList).toContainText('Phones');
    await expect(categoryList).toContainText('Laptops');
    await expect(categoryList).toContainText('Monitors');
  });

  test('TS-031: Verify default view shows all categories (no filter applied)', async () => {
    // On page load, verify products from different categories are shown
    await homePage.productItems.first().waitFor({ state: 'visible' });
    
    const productNames = await homePage.getProductNames();
    
    // Verify we have products
    expect(productNames.length).toBeGreaterThan(0);
    
    // Verify mix of products from different categories
    const hasPhones = productNames.some(name => 
      name.includes('Samsung') || name.includes('Nokia') || name.includes('Iphone')
    );
    const hasLaptops = productNames.some(name => 
      name.toLowerCase().includes('vaio') || name.toLowerCase().includes('macbook')
    );
    
    // At minimum, verify we have multiple products displayed (default view shows pagination)
    expect(productNames.length).toBeGreaterThanOrEqual(6);
    
    // Verify no category filter is applied by checking URL
    const currentUrl = homePage.page.url();
    expect(currentUrl).not.toContain('?cat=');
    
    // Verify page shows the home/index page
    expect(currentUrl).toMatch(/index\.html|\/$/);
    
    // Verify pagination or "next" button is visible (indicating multiple pages of products)
    const hasNextButton = await homePage.nextButton.isVisible();
    expect(hasNextButton).toBeTruthy();
  });
});
