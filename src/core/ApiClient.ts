import type { APIRequestContext, APIResponse } from '@playwright/test';

export type RequestParams = Record<string, string | number | boolean>;

type RequestOptions = {
  headers?: Record<string, string>;
  params?: RequestParams;
  data?: unknown;
};

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

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

  async patch(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.patch(path, {
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
    return Object.keys(headers).length > 0 ? headers : undefined;
  }
}
