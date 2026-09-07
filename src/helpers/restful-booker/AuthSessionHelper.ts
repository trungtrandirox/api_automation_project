import { AuthApi } from '../../api/restful-booker/AuthApi';
import type { AuthResponse } from '../../api/restful-booker/AuthApi';
import type { ApiClient } from '../../core/ApiClient';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'password123';

export async function getAuthCookie(
  apiClient: ApiClient,
  username = DEFAULT_USERNAME,
  password = DEFAULT_PASSWORD,
): Promise<string> {
  const authApi = new AuthApi(apiClient);
  const response = await authApi.createToken({ username, password });
  if (response.status() !== 200) {
    throw new Error(`Failed to get auth token. Expected 200, got ${response.status()}.`);
  }

  const body = (await response.json()) as AuthResponse;
  if (!body.token) {
    throw new Error('Failed to get auth token. Response does not include token.');
  }

  return `token=${body.token}`;
}
