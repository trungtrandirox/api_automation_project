import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { configManager } from './src/config/ConfigManager';

dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests/crud',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 2,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list'],
  ],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: configManager.getBaseUrl(),
    extraHTTPHeaders: configManager.getGlobalHeaders(),
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
});
