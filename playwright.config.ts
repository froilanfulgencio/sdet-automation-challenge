import { defineConfig, devices } from '@playwright/test';
import { frameworkConfig } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: frameworkConfig.defaultTimeoutMs,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: frameworkConfig.uiBaseUrl,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: frameworkConfig.apiBaseUrl,
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
  ],
  webServer: {
    command: 'node test-server.js',
    url: frameworkConfig.uiBaseUrl,
    reuseExistingServer: !process.env.CI,
  },
});
