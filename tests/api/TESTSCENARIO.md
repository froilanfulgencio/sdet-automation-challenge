# API Test Scenarios for Contact List API

**Target Application:** https://thinking-tester-contact-list.herokuapp.com/  
**API Documentation:** https://documenter.getpostman.com/view/4012288/TzK2bEa8  
**Type:** RESTful API  
**Authentication:** Bearer Token

---

## API Endpoints Overview

### Users Endpoints
- **USERS-001:** `POST /users` - Register a new user
- **USERS-002:** `POST /users/login` - Login user
- **USERS-003:** `GET /users/me` - Get user profile
- **USERS-004:** `PATCH /users/me` - Update user profile
- **USERS-005:** `DELETE /users/me` - Delete user account
- **USERS-006:** `POST /users/logout` - Logout user

---

## 1. User Registration & Authentication

### **USERS-001:** User Registration (POST /users)

#### Positive Test Cases
- **API-001:** Verify user can register with valid data
  - Required fields: firstName, lastName, email, password
  - Expected: 201 Created, user object with _id and token
  - Expected: Response includes `token` field
  - Expected: Response contains firstName, lastName, email (no password)

#### Negative Test Cases
- **API-002:** Verify error when registering with existing email
  - Expected: 400 Bad Request

- **API-003:** Verify error when email field is missing
  - Expected: 400 Bad Request

- **API-004:** Verify error when email field is empty
  - Expected: 400 Bad Request

- **API-005:** Verify error with invalid email format
  - Expected: 400 Bad Request

- **API-006:** Verify error with long email exceeding maximum length
  - Expected: 400 Bad Request

- **API-007:** Verify error when password field is missing
  - Expected: 400 Bad Request

- **API-008:** Verify error when password is empty
  - Expected: 400 Bad Request

- **API-009:** Verify error when password is longer than maximum length
  - Expected: 400 Bad Request

- **API-010:** Verify error when password length is less than minimum length
  - Expected: 400 Bad Request

- **API-011:** Verify error when firstName field is missing
  - Expected: 400 Bad Request

- **API-012:** Verify error when firstName field is empty
  - Expected: 400 Bad Request

- **API-013:** Verify error when firstName exceeds maximum length
  - Expected: 400 Bad Request

- **API-014:** Verify error when firstName is less than minimum length
  - Expected: 400 Bad Request

- **API-015:** Verify error when lastName field is missing
  - Expected: 400 Bad Request

- **API-016:** Verify error when lastName field is empty
  - Expected: 400 Bad Request

- **API-017:** Verify error when lastName exceeds maximum length
  - Expected: 400 Bad Request

---

### **USERS-002:** User Login (POST /users/login)

#### Positive Test Cases
- **API-018:** Verify user can login with valid credentials
  - Required: email, password
  - Expected: 200 OK, user object with token

- **API-019:** Verify login response includes user details
  - Expected: firstName, lastName, email, token

#### Negative Test Cases
- **API-020:** Verify error with invalid email
  - Expected: 401 Unauthorized

- **API-021:** Verify error with invalid password
  - Expected: 401 Unauthorized

- **API-022:** Verify error when email field is missing
  - Expected: 400 Bad Request

- **API-023:** Verify error when password field is missing
  - Expected: 400 Bad Request

- **API-024:** Verify error with non-existent user email
  - Expected: 401 Unauthorized

---

### **USERS-003:** Get User Profile (GET /users/me)

#### Positive Test Cases
- **API-025:** Verify authenticated user can retrieve their profile
  - Expected: 200 OK, user object with all details

- **API-026:** Verify response includes correct user data
  - Expected: _id, firstName, lastName, email (no password)

#### Negative Test Cases
- **API-027:** Verify error when accessing without authentication token
  - Expected: 401 Unauthorized

- **API-028:** Verify error with invalid/expired token
  - Expected: 401 Unauthorized

- **API-029:** Verify error with malformed token
  - Expected: 401 Unauthorized

---

### **USERS-004:** Update User Profile (PATCH /users/me)

#### Positive Test Cases
- **API-030:** Verify user can update firstName
  - Expected: 200 OK, updated user object

- **API-031:** Verify user can update lastName
  - Expected: 200 OK, updated user object

- **API-032:** Verify user can update email
  - Expected: 200 OK, updated user object

- **API-033:** Verify user can update password
  - Expected: 200 OK, updated user object

- **API-034:** Verify user can update multiple fields at once
  - Expected: 200 OK, updated user object

#### Negative Test Cases
- **API-035:** Verify error when updating without authentication
  - Expected: 401 Unauthorized

- **API-036:** Verify error with invalid email format
  - Expected: 400 Bad Request

- **API-037:** Verify error when updating to existing email
  - Expected: 400 Bad Request

---

### **USERS-005:** Delete User (DELETE /users/me)

#### Positive Test Cases
- **API-039:** Verify authenticated user can delete their account
  - Expected: 200 OK

- **API-040:** Verify deleted user cannot login
  - Expected: 401 Unauthorized after deletion

#### Negative Test Cases
- **API-041:** Verify error when deleting without authentication
  - Expected: 401 Unauthorized

---

### **USERS-006:** User Logout (POST /users/logout)

#### Positive Test Cases
- **API-042:** Verify user can logout successfully
  - Expected: 200 OK

- **API-043:** Verify token is invalidated after logout
  - Expected: 401 Unauthorized when using logged-out token

#### Negative Test Cases
- **API-044:** Verify error when logging out without authentication
  - Expected: 401 Unauthorized

---

## Test Environment

- **Base URL:** https://thinking-tester-contact-list.herokuapp.com
- **API Version:** v1
- **Authentication:** Bearer Token (JWT)
- **Content-Type:** application/json
- **Test Tool:** Playwright (TypeScript)
- **Test Framework:** Playwright Test Runner

---

## Implementation Notes

1. **Authentication Flow:**
   - Register/Login to get token
   - Store token for subsequent requests
   - Add token to Authorization header: `Bearer {token}`

2. **Test Isolation:**
   - Create unique users for each test suite
   - Clean up created contacts after tests
   - Use dynamic email generation (timestamp-based)

3. **Assertions:**
   - Verify HTTP status codes
   - Validate response schema
   - Check response data integrity
   - Verify error messages

4. **Best Practices:**
   - Use beforeEach for authentication setup
   - Use afterEach for cleanup
   - Store test data in fixtures
   - Use API helper utilities
   - Implement retry logic for flaky endpoints

---

**Last Updated:** May 29, 2026  
**Created By:** Froilan Fulgencio
