export interface FrameworkConfig {
  uiBaseUrl: string;
  apiBaseUrl: string;
  defaultTimeoutMs: number;
}

const getEnv = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const frameworkConfig: FrameworkConfig = {
  uiBaseUrl: getEnv('UI_BASE_URL', 'http://127.0.0.1:3000'),
  apiBaseUrl: getEnv('API_BASE_URL', 'http://127.0.0.1:3000'),
  defaultTimeoutMs: Number(getEnv('TEST_TIMEOUT_MS', '30000')),
};
