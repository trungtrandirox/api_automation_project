import type { APIResponse } from '@playwright/test';
import { configManager } from '../config/ConfigManager';
import { ApiClient } from '../core/ApiClient';
import { AuthManager } from '../core/AuthManager';

export type RegisterPayload = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
};

export class AuthService {
  constructor(
    private readonly apiClient: ApiClient,
    private readonly authManager: AuthManager,
  ) {}

  async register(payload: RegisterPayload): Promise<APIResponse> {
    return this.apiClient.post(configManager.getEndpointConfig().users, { data: payload });
  }

  async login(payload: LoginPayload): Promise<APIResponse> {
    const response = await this.apiClient.post(configManager.getEndpointConfig().login, { data: payload });
    const body = (await response.json()) as { user?: { token?: string } };
    if (body.user?.token) {
      this.authManager.setToken(body.user.token);
    }
    return response;
  }
}
