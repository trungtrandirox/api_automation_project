import type { APIRequestContext, APIResponse } from '@playwright/test';
import { AuthManager } from './AuthManager';

export type RequestParams = Record<string, string | number | boolean>;

type RequestOptions = {
  headers?: Record<string, string>;
  params?: RequestParams;
  data?: unknown;
  auth?: boolean;
};

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly authManager: AuthManager,
  ) {}

  async get(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.get(path, {
      headers: this.buildHeaders(options),
      params: options?.params,
      failOnStatusCode: false,
    });
  }

  async post(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.post(path, {
      headers: this.buildHeaders(options),
      params: options?.params,
      data: options?.data,
      failOnStatusCode: false,
    });
  }

  async put(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.put(path, {
      headers: this.buildHeaders(options),
      params: options?.params,
      data: options?.data,
      failOnStatusCode: false,
    });
  }

  async delete(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.delete(path, {
      headers: this.buildHeaders(options),
      params: options?.params,
      failOnStatusCode: false,
    });
  }

  private buildHeaders(options?: RequestOptions): Record<string, string> | undefined {
    const headers = { ...(options?.headers ?? {}) };
    if (options?.auth) {
      Object.assign(headers, this.authManager.getAuthHeader());
    }
    return Object.keys(headers).length > 0 ? headers : undefined;
  }
}
