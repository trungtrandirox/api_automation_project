import { test as base, request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { configManager } from '../config/ConfigManager';
import { ApiClient } from '../core/ApiClient';
import { AuthManager } from '../core/AuthManager';
import { ArticleService } from '../services/ArticleService';
import { AuthService } from '../services/AuthService';

type ApiFixtures = {
  apiContext: APIRequestContext;
  authManager: AuthManager;
  authService: AuthService;
  articleService: ArticleService;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await playwrightRequest.newContext({
      baseURL: configManager.getBaseUrl(),
      extraHTTPHeaders: configManager.getGlobalHeaders(),
      ignoreHTTPSErrors: true,
    });
    await use(context);
    await context.dispose();
  },
  authManager: async ({}, use) => {
    await use(new AuthManager());
  },
  authService: async ({ apiContext, authManager }, use) => {
    const apiClient = new ApiClient(apiContext, authManager);
    await use(new AuthService(apiClient, authManager));
  },
  articleService: async ({ apiContext, authManager }, use) => {
    const apiClient = new ApiClient(apiContext, authManager);
    await use(new ArticleService(apiClient));
  },
});

export const expect = test.expect;
