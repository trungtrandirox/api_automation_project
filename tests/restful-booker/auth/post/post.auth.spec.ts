import { expect, test } from '../../../../src/fixtures/ApiFixture';
import { AuthApi } from '../../../../src/api/restful-booker/AuthApi';
import type { AuthResponse } from '../../../../src/api/restful-booker/AuthApi';

test.describe('POST /auth', () => {
  test('should return token with valid credentials', async ({ apiClient }) => {
    const authApi = new AuthApi(apiClient);
    const response = await authApi.createToken({
      username: 'admin',
      password: 'password123',
    });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as AuthResponse;
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });

  test('should reject invalid password', async ({ apiClient }) => {
    const authApi = new AuthApi(apiClient);
    const response = await authApi.createToken({
      username: 'admin',
      password: 'wrong-password',
    });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as AuthResponse;
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });

  test('should reject when missing password', async ({ apiClient }) => {
    const authApi = new AuthApi(apiClient);
    const response = await authApi.createToken({
      username: 'admin',
    });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as AuthResponse;
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });
});
