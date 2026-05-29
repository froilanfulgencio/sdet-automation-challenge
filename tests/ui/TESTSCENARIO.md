# UI Test Scenarios for Demoblaze.com

**Target Application:** https://www.demoblaze.com/  
**Type:** E-commerce Demo Application  
**Products:** Phones, Laptops, Monitors

---

## 1. User Authentication

### 1.1 Sign Up
- **TS-001:** Verify user can sign up with valid username and password
- **TS-002:** Verify error message when signing up with existing username
- **TS-003:** Verify error message when signing up with empty username
- **TS-004:** Verify error message when signing up with empty password
- **TS-005:** Verify sign up modal can be closed without submitting
- **TS-006:** Verify successful sign up shows confirmation message

### 1.2 Login
- **TS-007:** Verify user can login with valid credentials
- **TS-008:** Verify error message when login with invalid username
- **TS-009:** Verify error message when login with invalid password
- **TS-010:** Verify error message when login with empty credentials
- **TS-011:** Verify username is displayed after successful login
- **TS-012:** Verify login modal can be closed without submitting

### 1.3 Logout
- **TS-013:** Verify logged-in user can logout successfully
- **TS-014:** Verify "Log out" button is only visible when user is logged in
- **TS-015:** Verify after logout, user is redirected to home page

---

## 2. Home Page & Navigation

### 2.1 Home Page Load
- **TS-016:** Verify home page loads successfully with all elements visible
- **TS-017:** Verify website logo/banner is displayed
- **TS-018:** Verify navigation menu items are present (Home, Contact, About us, Cart, Login, Sign up)
- **TS-019:** Verify product carousel/slider is functional
- **TS-020:** Verify footer with contact information is displayed

### 2.2 Navigation
- **TS-021:** Verify clicking on "Home" navigates to home page
- **TS-022:** Verify clicking on "Contact" opens contact modal
- **TS-023:** Verify clicking on "About us" opens about us modal with video
- **TS-024:** Verify clicking on "Cart" navigates to cart page
- **TS-025:** Verify clicking on logo/banner navigates to home page

---

## 3. Product Categories

### 3.1 Category Filtering
- **TS-026:** Verify "Phones" category displays only phone products
- **TS-027:** Verify "Laptops" category displays only laptop products
- **TS-028:** Verify "Monitors" category displays only monitor products
- **TS-029:** Verify clicking category filters products correctly
- **TS-030:** Verify category selection is highlighted/active
- **TS-031:** Verify default view shows all categories (no filter applied)

### 3.2 Product Display
- **TS-032:** Verify each product shows image, name, and price
- **TS-033:** Verify product images are loaded correctly
- **TS-034:** Verify product prices are displayed with currency symbol
- **TS-035:** Verify products are displayed in grid/card layout

---

## 4. Product Details

### 4.1 Product Page Navigation
- **TS-036:** Verify clicking on product image navigates to product detail page
- **TS-037:** Verify clicking on product name navigates to product detail page
- **TS-038:** Verify product detail page URL contains product ID
- **TS-039:** Verify browser back button returns to previous page

### 4.2 Product Information
- **TS-040:** Verify product detail page displays product name
- **TS-041:** Verify product detail page displays product price
- **TS-042:** Verify product detail page displays product image
- **TS-043:** Verify product detail page displays product description
- **TS-044:** Verify "Add to cart" button is visible and enabled

### 4.3 Add to Cart from Product Page
- **TS-045:** Verify clicking "Add to cart" adds product to cart
- **TS-046:** Verify success message is displayed after adding to cart
- **TS-047:** Verify same product can be added to cart multiple times
- **TS-048:** Verify cart icon/counter updates after adding product
- **TS-049:** Verify adding to cart without login (if applicable)

---

## 5. Shopping Cart

### 5.1 Cart Page Access
- **TS-050:** Verify clicking "Cart" in navigation opens cart page
- **TS-051:** Verify cart page displays all added products
- **TS-052:** Verify empty cart displays appropriate message
- **TS-053:** Verify cart page URL is correct (/cart.html)

### 5.2 Cart Content Display
- **TS-054:** Verify cart displays product image for each item
- **TS-055:** Verify cart displays product name for each item
- **TS-056:** Verify cart displays product price for each item
- **TS-057:** Verify cart displays total price calculation
- **TS-058:** Verify total price updates when items are added/removed

### 5.3 Cart Management
- **TS-059:** Verify user can delete item from cart
- **TS-060:** Verify total price recalculates after item deletion
- **TS-061:** Verify cart persists after page refresh
- **TS-062:** Verify cart persists across browser sessions (if logged in)
- **TS-063:** Verify multiple same items show correct total price
- **TS-064:** Verify cart count/badge displays correct number of items

### 5.4 Cart Actions
- **TS-065:** Verify "Place Order" button is visible in cart
- **TS-066:** Verify clicking "Place Order" opens checkout modal
- **TS-067:** Verify empty cart prevents checkout process

---

## 6. Checkout Process

### 6.1 Place Order Modal
- **TS-068:** Verify place order modal opens with all form fields
- **TS-069:** Verify modal displays total amount
- **TS-070:** Verify all required fields are present (Name, Country, City, Credit card, Month, Year)
- **TS-071:** Verify modal can be closed without completing order

### 6.2 Order Form Validation
- **TS-072:** Verify error when submitting form with empty Name field
- **TS-073:** Verify error when submitting form with empty Credit card field
- **TS-074:** Verify form accepts valid input in all fields
- **TS-075:** Verify credit card field accepts numeric input
- **TS-076:** Verify month and year fields accept valid date formats

### 6.3 Order Completion
- **TS-077:** Verify successful order shows confirmation modal
- **TS-078:** Verify confirmation modal displays order ID
- **TS-079:** Verify confirmation modal displays purchase amount
- **TS-080:** Verify confirmation modal displays card number
- **TS-081:** Verify confirmation modal displays customer name
- **TS-082:** Verify confirmation modal displays date
- **TS-083:** Verify clicking "OK" on confirmation clears the cart
- **TS-084:** Verify cart is empty after successful order completion

---

## 7. Contact Modal

### 7.1 Contact Form Display
- **TS-085:** Verify contact modal opens when clicking "Contact" link
- **TS-086:** Verify contact form has Email field
- **TS-087:** Verify contact form has Name field
- **TS-088:** Verify contact form has Message field
- **TS-089:** Verify contact modal has "Send message" button

### 7.2 Contact Form Validation
- **TS-090:** Verify error when submitting empty contact form
- **TS-091:** Verify error when submitting with empty email
- **TS-092:** Verify error when submitting with invalid email format
- **TS-093:** Verify success message after valid form submission
- **TS-094:** Verify contact modal can be closed without submitting

---

## 8. About Us Modal

### 8.1 About Us Display
- **TS-095:** Verify about us modal opens when clicking "About us" link
- **TS-096:** Verify about us modal contains video player
- **TS-097:** Verify video player is functional and can play
- **TS-098:** Verify video player controls are accessible
- **TS-099:** Verify about us modal can be closed
- **TS-100:** Verify video stops playing when modal is closed

---

## 9. Pagination

### 9.1 Product Pagination
- **TS-101:** Verify "Previous" button is displayed when applicable
- **TS-102:** Verify "Next" button is displayed when applicable
- **TS-103:** Verify clicking "Next" loads next set of products
- **TS-104:** Verify clicking "Previous" loads previous set of products
- **TS-105:** Verify pagination works correctly with category filters
- **TS-106:** Verify "Previous" button is disabled on first page
- **TS-107:** Verify "Next" button is disabled on last page

---

## 10. Cross-Browser & Responsive Testing

### 10.1 Browser Compatibility
- **TS-108:** Verify application works on Chrome browser
- **TS-109:** Verify application works on Firefox browser
- **TS-110:** Verify application works on Safari browser
- **TS-111:** Verify application works on Edge browser

### 10.2 Responsive Design
- **TS-112:** Verify website is responsive on desktop (1920x1080)
- **TS-113:** Verify website is responsive on tablet (768x1024)
- **TS-114:** Verify website is responsive on mobile (375x667)
- **TS-115:** Verify navigation menu adapts to mobile view
- **TS-116:** Verify product grid adjusts to screen size

---

## 11. Performance & Loading

### 11.1 Page Load Performance
- **TS-117:** Verify home page loads within acceptable time (< 3 seconds)
- **TS-118:** Verify product images load properly
- **TS-119:** Verify product detail page loads within acceptable time
- **TS-120:** Verify cart page loads quickly
- **TS-121:** Verify no broken images on any page

---

## 12. End-to-End User Journeys

### 12.1 Complete Purchase Flow
- **TS-122:** E2E: Sign up → Browse products → Add to cart → Checkout → Complete order
- **TS-123:** E2E: Login → Filter by category → View product details → Add to cart → Complete purchase
- **TS-124:** E2E: Add multiple products → Remove one → Complete checkout
- **TS-125:** E2E: Browse without login → Add to cart → Login → Complete purchase

### 12.2 Cart Management Flow
- **TS-126:** E2E: Add products → View cart → Update quantities → Complete checkout
- **TS-127:** E2E: Add products → Delete all items → Verify empty cart
- **TS-128:** E2E: Add products → Logout → Login → Verify cart persistence

---

## 13. Negative Test Scenarios

### 13.1 Security & Error Handling
- **TS-129:** Verify proper error handling for invalid product IDs in URL
- **TS-130:** Verify XSS prevention in input fields
- **TS-131:** Verify SQL injection prevention in form inputs
- **TS-132:** Verify proper handling of network failures
- **TS-133:** Verify session timeout handling
- **TS-134:** Verify duplicate order prevention

### 13.2 Boundary Testing
- **TS-135:** Verify maximum length validation for text inputs
- **TS-136:** Verify special characters handling in forms
- **TS-137:** Verify adding large quantity of same product to cart
- **TS-138:** Verify behavior with very long product names/descriptions

---

## Test Execution Priority

### Priority 1 (Critical)
- User authentication (login/signup)
- Add to cart functionality
- Checkout and order placement
- Cart management

### Priority 2 (High)
- Product browsing and filtering
- Product details page
- Category filtering
- Navigation

### Priority 3 (Medium)
- Contact form
- About us modal
- Pagination
- Cart persistence

### Priority 4 (Low)
- Responsive design
- Performance testing
- Cross-browser compatibility

---

## Test Data Requirements

### User Credentials
- Valid username/password combinations
- Invalid credentials for negative testing
- Special characters in credentials

### Product Data
- Products from each category (Phones, Laptops, Monitors)
- Products with different price ranges
- Sample product IDs

### Payment Data
- Valid credit card formats (for testing, not real)
- Various name, country, city combinations
- Different month/year combinations

### Contact Data
- Valid email formats
- Invalid email formats
- Sample message content

---

## Test Environment

- **URL:** https://www.demoblaze.com/
- **Test Browsers:** Chrome, Firefox, Safari, Edge
- **Screen Resolutions:** 1920x1080, 1366x768, 375x667 (mobile)
- **Test Tools:** Playwright, TypeScript
- **Test Framework:** Playwright Test Runner

---

## Notes

1. All test scenarios should include proper assertions
2. Each test should be independent and not rely on other tests
3. Clean up test data after test execution (where applicable)
4. Capture screenshots on failure for debugging
5. Use stable locators (data-testid, role, label) over CSS selectors
6. Implement Page Object Model for maintainability
7. Add appropriate waits for dynamic content loading
8. Verify both UI elements and backend state (API validation where possible)

---

**Last Updated:** May 29, 2026  
**Created By:** Froilan Fulgencio
