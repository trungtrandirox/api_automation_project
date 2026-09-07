import { expect } from '@playwright/test';
import type { APIResponse } from '@playwright/test';

async function expectStatusAndText(
  response: APIResponse,
  expectedStatus: number,
  expectedText: string,
): Promise<void> {
  expect(response.status()).toBe(expectedStatus);
  await expect(response.text()).resolves.toBe(expectedText);
}

export async function expectForbidden(response: APIResponse): Promise<void> {
  await expectStatusAndText(response, 403, 'Forbidden');
}

export async function expectNotFound(response: APIResponse): Promise<void> {
  await expectStatusAndText(response, 404, 'Not Found');
}

export async function expectBadRequest(response: APIResponse): Promise<void> {
  await expectStatusAndText(response, 400, 'Bad Request');
}

export async function expectInternalServerError(response: APIResponse): Promise<void> {
  await expectStatusAndText(response, 500, 'Internal Server Error');
}

export async function expectMethodNotAllowed(response: APIResponse): Promise<void> {
  await expectStatusAndText(response, 405, 'Method Not Allowed');
}
