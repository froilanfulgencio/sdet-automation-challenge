import { test as base, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';
import { TestDataGenerator } from '../utils/test-data-generator';

type ApiFixtures = {
  apiHelper: ApiHelper;
  testData: typeof TestDataGenerator;
  authenticatedApiHelper: ApiHelper;
};

export const test = base.extend<ApiFixtures>({
  apiHelper: async ({ request }, use) => {
    const helper = new ApiHelper(request);
    await use(helper);
  },

  testData: async ({}, use) => {
    await use(TestDataGenerator);
  },

  authenticatedApiHelper: async ({ request }, use) => {
    const helper = new ApiHelper(request);
    
    // Create a test user and login to get token
    const userData = TestDataGenerator.generateUserData();
    const registerResponse = await helper.post('/users', userData);
    
    if (registerResponse.ok()) {
      const responseData = await registerResponse.json();
      helper.setToken(responseData.token);
    }
    
    await use(helper);
    
    // Cleanup: Delete the test user after test
    try {
      if (helper.getToken()) {
        await helper.delete('/users/me');
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  },
});

export { expect } from '@playwright/test';
