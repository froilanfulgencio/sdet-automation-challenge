import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test.describe('2.1 Home Page Load', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('TS-016: Verify home page loads successfully with all elements visible', async () => {
    // Verify logo/banner
    await homePage.verifyElementVisible(homePage.logo);
    
    // Verify navigation elements
    await homePage.verifyElementVisible(homePage.homeLink);
    await homePage.verifyElementVisible(homePage.contactLink);
    await homePage.verifyElementVisible(homePage.aboutUsLink);
    await homePage.verifyElementVisible(homePage.cartLink);
    await homePage.verifyElementVisible(homePage.loginLink);
    await homePage.verifyElementVisible(homePage.signupLink);
    
    // Verify products are displayed
    await homePage.verifyElementVisible(homePage.productItems.first());
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Verify carousel
    await homePage.verifyElementVisible(homePage.carouselContainer);
    
    // Verify footer
    await homePage.verifyElementVisible(homePage.footer);
    
    // Verify page title
    await expect(homePage.page).toHaveTitle(/STORE/);
  });

  test('TS-017: Verify website logo/banner is displayed', async () => {
    // Verify logo is visible
    await homePage.verifyElementVisible(homePage.logo);
    
    // Verify logo text content
    const logoText = await homePage.logo.textContent();
    expect(logoText).toContain('PRODUCT STORE');
    
    // Verify logo is clickable
    await expect(homePage.logo).toBeEnabled();
    
    // Verify logo has href attribute
    const logoHref = await homePage.logo.getAttribute('href');
    expect(logoHref).toBeTruthy();
  });

  test('TS-018: Verify navigation menu items are present (Home, Contact, About us, Cart, Login, Sign up)', async () => {
    // Verify all navigation menu items
    await homePage.verifyNavigationMenu();
    
    // Verify menu items have correct text (using regex to handle screen reader text)
    await expect(homePage.homeLink).toHaveText(/Home/);
    await expect(homePage.contactLink).toHaveText('Contact');
    await expect(homePage.aboutUsLink).toHaveText('About us');
    await expect(homePage.cartLink).toHaveText('Cart');
    await expect(homePage.loginLink).toHaveText('Log in');
    await expect(homePage.signupLink).toHaveText('Sign up');
    
    // Verify all menu items are clickable
    await expect(homePage.homeLink).toBeEnabled();
    await expect(homePage.contactLink).toBeEnabled();
    await expect(homePage.aboutUsLink).toBeEnabled();
    await expect(homePage.cartLink).toBeEnabled();
    await expect(homePage.loginLink).toBeEnabled();
    await expect(homePage.signupLink).toBeEnabled();
  });

  test('TS-019: Verify product carousel/slider is functional', async () => {
    // Verify carousel container is visible
    await homePage.verifyCarousel();
    
    // Verify carousel controls are present
    await homePage.verifyElementVisible(homePage.carouselPrevButton);
    await homePage.verifyElementVisible(homePage.carouselNextButton);
    
    // Verify carousel indicators are present
    await homePage.verifyElementVisible(homePage.carouselIndicators);
    
    // Test next button functionality
    await homePage.clickCarouselNext();
    
    // Verify carousel still visible after clicking next
    await homePage.verifyElementVisible(homePage.carouselContainer);
    
    // Test previous button functionality
    await homePage.clickCarouselPrevious();
    
    // Verify carousel still visible after clicking previous
    await homePage.verifyElementVisible(homePage.carouselContainer);
    
    // Verify carousel has active slide
    const activeSlide = homePage.page.locator('.carousel-item.active');
    await expect(activeSlide).toBeVisible();
  });

  test('TS-020: Verify footer with contact information is displayed', async () => {
    // Verify footer is visible
    await homePage.verifyFooter();
    
    // Verify footer sections are present
    const footerText = await homePage.footer.textContent();
    
    // Verify About Us section
    expect(footerText).toContain('About Us');
    
    // Verify Get in Touch section with contact info
    expect(footerText).toContain('Get in Touch');
    
    // Verify address is present
    await expect(homePage.page.locator('#fotcont')).toContainText('Address');
    
    // Verify phone is present
    await expect(homePage.page.locator('#fotcont')).toContainText('Phone');
    
    // Verify email is present
    await expect(homePage.page.locator('#fotcont')).toContainText('Email');
    
    // Verify specific contact details
    const contactSection = homePage.page.locator('#fotcont');
    await expect(contactSection).toContainText('2390 El Camino Real');
    await expect(contactSection).toContainText('+440 123456');
    await expect(contactSection).toContainText('demo@blazemeter.com');
  });
});
