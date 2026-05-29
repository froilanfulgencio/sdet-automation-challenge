import { test, expect } from './fixtures/api-fixtures';

// ============================================
// User Registration Tests - POST /users
// ============================================

test.describe('User Registration - POST /users', () => {
  test(
    'API-001: Verify user can register with valid data',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(201);

      const responseBody = await response.json();
      // verify response body
      expect(responseBody).toHaveProperty('user');
      expect(typeof responseBody.user).toBe('object');
      expect(responseBody.user).toHaveProperty('_id');
      expect(typeof responseBody.user._id).toBe('string');
      expect(responseBody.user.firstName).toBe(userData.firstName);
      expect(responseBody.user.lastName).toBe(userData.lastName);
      expect(responseBody.user.email).toBe(userData.email);
      expect(responseBody.user).toHaveProperty('__v');
      expect(responseBody).toHaveProperty('token');
      expect(typeof responseBody.token).toBe('string');
      expect(responseBody.token.length).toBeGreaterThan(0);

      // Verify password is not returned
      expect(responseBody).not.toHaveProperty('password');

      // Cleanup
      apiHelper.setToken(responseBody.token);
      await apiHelper.delete('/users/me');
    },
  );

  test(
    'API-002: Verify error when registering with existing email',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();

      // Create user first
      const firstResponse = await apiHelper.post('/users', userData);
      expect(firstResponse.status()).toBe(201);
      const firstUser = await firstResponse.json();

      // Act - Try to register with same email
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);

      const responseBody = await response.json();
      console.log('Response body for duplicate email test:', responseBody);
      expect(responseBody).toHaveProperty('message');
      expect(responseBody.message).toBe('Email address is already in use');

      // Cleanup
      apiHelper.setToken(firstUser.token);
      await apiHelper.delete('/users/me');
    },
  );

  test(
    'API-003: Verify error when email field is missing',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      delete (userData as any).email;

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
    },
  );

  test(
    'API-004: Verify error when email field is empty',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.email = '';

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-005: Verify error with invalid email format',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.email = testData.generateInvalidEmail();

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-006: Verify error with long email exceeding maximum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.email = testData.generateLongEmail();

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-007: Verify error when password field is missing',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      delete (userData as any).password;

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-008: Verify error when password is empty',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.password = '';

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-009: Verify error when password is longer than maximum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.password = testData.generateLongEmail();

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-010: Verify error when password length is less than minimum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.password = '12345a'; // minimum is 7

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-011: Verify error when firstName field is missing',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      delete (userData as any).firstName;

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-012: Verify error when firstName field is empty',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.firstName = '';

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-013: Verify error when firstName exceeds maximum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.firstName = 'A'.repeat(21); // max is 20

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  // Skipping - First name minimum length is 1
  test.skip(
    'API-014: Verify error when firstName is less than minimum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.firstName = 'A';

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-015: Verify error when lastName field is missing',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      delete (userData as any).lastName;

    // Act
    const response = await apiHelper.post('/users', userData);

    // Assert
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('errors');
  });

  test(
    'API-016: Verify error when lastName field is empty',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.lastName = '';

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );

  test(
    'API-017: Verify error when lastName exceeds maximum length',
    { tag: ['@USERS-001'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const userData = testData.generateUserData();
      userData.lastName = 'A'.repeat(21); // max is 20

      // Act
      const response = await apiHelper.post('/users', userData);

      // Assert
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('message');
      expect(responseBody).toHaveProperty('errors');
    },
  );
});

// ============================================
// User Login Tests - POST /users/login
// ============================================

test.describe('User Login - POST /users/login', () => {
  let registeredUser: any;
  let userToken: string;

  test.beforeAll(async ({ apiHelper, testData }) => {
    // Create a user for login tests
    registeredUser = testData.generateUserData();
    const response = await apiHelper.post('/users', registeredUser);
    const responseBody = await response.json();
    userToken = responseBody.token;
  });

  test.afterAll(async ({ apiHelper }) => {
    // Cleanup: Delete the test user
    if (userToken) {
      apiHelper.setToken(userToken);
      await apiHelper.delete('/users/me');
    }
  });

  test(
    'API-018: Verify user can login with valid credentials',
    { tag: ['@USERS-002'] },
    async ({ apiHelper }) => {
      // Arrange
      const loginData = {
        email: registeredUser.email,
        password: registeredUser.password,
      };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    console.log('Login response body:', responseBody);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.user).toHaveProperty('_id');
  });

  test(
    'API-019: Verify login response includes user details',
    { tag: ['@USERS-002'] },
    async ({ apiHelper }) => {
      // Arrange
      const loginData = {
        email: registeredUser.email,
        password: registeredUser.password,
      };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.user.firstName).toBe(registeredUser.firstName);
    expect(responseBody.user.lastName).toBe(registeredUser.lastName);
    expect(responseBody.user.email).toBe(registeredUser.email);
    expect(responseBody).toHaveProperty('token');
    
    // Verify password is not returned
    expect(responseBody).not.toHaveProperty('password');
  });

  test(
    'API-020: Verify error with invalid email',
    { tag: ['@USERS-002'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const loginData = {
        email: testData.generateEmail('nonexistent'),
        password: registeredUser.password,
      };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(401);
  });

  test(
    'API-021: Verify error with invalid password',
    { tag: ['@USERS-002'] },
    async ({ apiHelper }) => {
      // Arrange
    const loginData = {
      email: registeredUser.email,
      password: 'WrongPassword123',
    };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(401);
  });

  test(
    'API-022: Verify error when email field is missing',
    { tag: ['@USERS-002'] },
    async ({ apiHelper }) => {
      // Arrange
      const loginData = {
        password: registeredUser.password,
      };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(401);
  });

  test(
    'API-023: Verify error when password field is missing',
    { tag: ['@USERS-002'] },
    async ({ apiHelper }) => {
      // Arrange
    const loginData = {
      email: registeredUser.email,
    };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(401);
  });

  test(
    'API-024: Verify error with non-existent user email',
    { tag: ['@USERS-002'] },
    async ({ apiHelper, testData }) => {
      // Arrange
      const loginData = {
        email: testData.generateEmail('fake'),
        password: 'SomePassword123',
      };

    // Act
    const response = await apiHelper.post('/users/login', loginData);

    // Assert
    expect(response.status()).toBe(401);
  });
});

// ============================================
// Get User Profile Tests - GET /users/me
// ============================================

test.describe('Get User Profile - GET /users/me', () => {
  test(
    'API-025: Verify authenticated user can retrieve their profile',
    { tag: ['@USERS-003'] },
    async ({ authenticatedApiHelper }) => {
      // Act
      const response = await authenticatedApiHelper.get('/users/me');

      // Assert
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('_id');
      expect(responseBody).toHaveProperty('firstName');
      expect(responseBody).toHaveProperty('lastName');
      expect(responseBody).toHaveProperty('email');
    },
  );

  test(
    'API-026: Verify response includes correct user data',
    { tag: ['@USERS-003'] },
    async ({ authenticatedApiHelper }) => {
      // Act
      const response = await authenticatedApiHelper.get('/users/me');

    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('_id');
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('email');
    
    // Verify password is not returned
    expect(responseBody).not.toHaveProperty('password');
    
    // Verify data types
    expect(typeof responseBody._id).toBe('string');
    expect(typeof responseBody.firstName).toBe('string');
    expect(typeof responseBody.lastName).toBe('string');
    expect(typeof responseBody.email).toBe('string');
  });

  test(
    'API-027: Verify error when accessing without authentication token',
    { tag: ['@USERS-003'] },
    async ({ apiHelper }) => {
      // Act
      const response = await apiHelper.get('/users/me');

      // Assert
      expect(response.status()).toBe(401);
    },
  );

  test(
    'API-028: Verify error with invalid/expired token',
    { tag: ['@USERS-003'] },
    async ({ apiHelper }) => {
      // Arrange
      apiHelper.setToken('invalid.token.here');

      // Act
      const response = await apiHelper.get('/users/me');

      // Assert
      expect(response.status()).toBe(401);
    },
  );

  test(
    'API-029: Verify error with malformed token',
    { tag: ['@USERS-003'] },
    async ({ apiHelper }) => {
      // Arrange
      apiHelper.setToken('malformed-token');

      // Act
      const response = await apiHelper.get('/users/me');

      // Assert
      expect(response.status()).toBe(401);
    },
  );
});

// ============================================
// Update User Profile Tests - PATCH /users/me
// ============================================

test.describe('Update User Profile - PATCH /users/me', () => {
  test(
    'API-030: Verify user can update firstName',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper }) => {
      // Arrange
      const updateData = {
        firstName: 'UpdatedFirstName',
      };

      // Act
      const response = await authenticatedApiHelper.patch(
        '/users/me',
        updateData,
      );

      // Assert
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.firstName).toBe(updateData.firstName);
    },
  );

  test(
    'API-031: Verify user can update lastName',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper }) => {
      // Arrange
      const updateData = {
        lastName: 'UpdatedLastName',
      };

      // Act
      const response = await authenticatedApiHelper.patch(
        '/users/me',
        updateData,
      );

      // Assert
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.lastName).toBe(updateData.lastName);
    },
  );

  test(
    'API-032: Verify user can update email',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper, testData }) => {
      // Arrange
      const updateData = {
        email: testData.generateEmail('updated'),
      };

      // Act
      const response = await authenticatedApiHelper.patch(
        '/users/me',
        updateData,
      );

      // Assert
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.email).toBe(updateData.email);
    },
  );

  test(
    'API-033: Verify user can update password',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper, testData }) => {
      // Arrange
      const newPassword = testData.generateValidPassword();
      const updateData = {
        password: newPassword,
      };

      // Act
      const response = await authenticatedApiHelper.patch(
        '/users/me',
        updateData,
      );

      // Assert
      expect(response.status()).toBe(200);

      // Verify password is not returned in response
      const responseBody = await response.json();
      expect(responseBody).not.toHaveProperty('password');
    },
  );

  test(
    'API-034: Verify user can update multiple fields at once',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper, testData }) => {
      // Arrange
      const updateData = {
        firstName: 'NewFirst',
        lastName: 'NewLast',
        email: testData.generateEmail('multiupdate'),
    };

    // Act
    const response = await authenticatedApiHelper.patch('/users/me', updateData);

    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.firstName).toBe(updateData.firstName);
    expect(responseBody.lastName).toBe(updateData.lastName);
    expect(responseBody.email).toBe(updateData.email);
  });

  test(
    'API-035: Verify error when updating without authentication',
    { tag: ['@USERS-004'] },
    async ({ apiHelper }) => {
      // Arrange
      const updateData = {
        firstName: 'ShouldFail',
      };

      // Act
      const response = await apiHelper.patch('/users/me', updateData);

      // Assert
      expect(response.status()).toBe(401);
    },
  );

  test(
    'API-036: Verify error with invalid email format',
    { tag: ['@USERS-004'] },
    async ({ authenticatedApiHelper, testData }) => {
      // Arrange
      const updateData = {
        email: testData.generateInvalidEmail(),
      };

    // Act
    const response = await authenticatedApiHelper.patch('/users/me', updateData);

    // Assert
    expect(response.status()).toBe(400);
  });

  test(
    'API-037: Verify error when updating to existing email',
    { tag: ['@USERS-004'] },
    async ({ apiHelper, testData, authenticatedApiHelper }) => {
      // Arrange - Create another user
      const anotherUser = testData.generateUserData();
      const registerResponse = await apiHelper.post('/users', anotherUser);
      const anotherUserData = await registerResponse.json();

      // Act - Try to update current user to another user's email
      const updateData = {
        email: anotherUser.email,
      };
      const response = await authenticatedApiHelper.patch(
        '/users/me',
        updateData,
      );

      // Assert
      expect(response.status()).toBe(400);

      // Cleanup - Delete the other user
      apiHelper.setToken(anotherUserData.token);
      await apiHelper.delete('/users/me');
    },
  );
});

// ============================================
// Delete User Tests - DELETE /users/me
// ============================================

test.describe('Delete User - DELETE /users/me', () => {
  test(
    'API-039: Verify authenticated user can delete their account',
    { tag: ['@USERS-005'] },
    async ({ apiHelper, testData }) => {
      // Arrange - Create a user specifically for deletion
      const userData = testData.generateUserData();
      const registerResponse = await apiHelper.post('/users', userData);
      const user = await registerResponse.json();
      apiHelper.setToken(user.token);

      // Act
      const response = await apiHelper.delete('/users/me');

      // Assert
      expect(response.status()).toBe(200);
    },
  );

  test(
    'API-040: Verify deleted user cannot login',
    { tag: ['@USERS-005'] },
    async ({ apiHelper, testData }) => {
      // Arrange - Create and delete a user
      const userData = testData.generateUserData();
      const registerResponse = await apiHelper.post('/users', userData);
      const user = await registerResponse.json();

      apiHelper.setToken(user.token);
      const deleteResponse = await apiHelper.delete('/users/me');
      expect(deleteResponse.status()).toBe(200);

      // Act - Try to login with deleted user credentials
      apiHelper.clearToken();
      const loginData = {
        email: userData.email,
        password: userData.password,
      };
      const loginResponse = await apiHelper.post('/users/login', loginData);

      // Assert
      expect(loginResponse.status()).toBe(401);
    },
  );

  test(
    'API-041: Verify error when deleting without authentication',
    { tag: ['@USERS-005'] },
    async ({ apiHelper }) => {
      // Act
      const response = await apiHelper.delete('/users/me');

      // Assert
      expect(response.status()).toBe(401);
    },
  );
});

// ============================================
// User Logout Tests - POST /users/logout
// ============================================

test.describe('User Logout - POST /users/logout', () => {
  test(
    'API-042: Verify user can logout successfully',
    { tag: ['@USERS-006'] },
    async ({ authenticatedApiHelper }) => {
      // Act
      const response = await authenticatedApiHelper.post('/users/logout');

      // Assert
      expect(response.status()).toBe(200);
    },
  );

  test(
    'API-043: Verify token is invalidated after logout',
    { tag: ['@USERS-006'] },
    async ({ apiHelper, testData }) => {
      // Arrange - Create and login user
      const userData = testData.generateUserData();
      const registerResponse = await apiHelper.post('/users', userData);
      const user = await registerResponse.json();
    const token = user.token;
    
    apiHelper.setToken(token);

    // Act - Logout
    const logoutResponse = await apiHelper.post('/users/logout');
    expect(logoutResponse.status()).toBe(200);

    // Assert - Try to use the token after logout
    const profileResponse = await apiHelper.get('/users/me');
    expect(profileResponse.status()).toBe(401);
  });

  test(
    'API-044: Verify error when logging out without authentication',
    { tag: ['@USERS-006'] },
    async ({ apiHelper }) => {
      // Act
      const response = await apiHelper.post('/users/logout');

      // Assert
      expect(response.status()).toBe(401);
    },
  );
});
