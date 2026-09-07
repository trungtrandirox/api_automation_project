import { test as base, request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { configManager } from '../config/ConfigManager';
import { ApiClient } from '../core/ApiClient';

type ApiFixtures = {
  apiContext: APIRequestContext;
  apiClient: ApiClient;
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
  apiClient: async ({ apiContext }, use) => {
    await use(new ApiClient(apiContext));
  },
});

export const expect = test.expect;
