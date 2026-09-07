import type { APIResponse } from '@playwright/test';
import type { ApiClient } from '../../core/ApiClient';

export type AuthPayload = {
  username?: string;
  password?: string;
};

export type AuthResponse = {
  token?: string;
  reason?: string;
};

export class AuthApi {
  constructor(private readonly apiClient: ApiClient) {}

  async createToken(payload: AuthPayload): Promise<APIResponse> {
    return this.apiClient.post('/auth', { data: payload });
  }
}
