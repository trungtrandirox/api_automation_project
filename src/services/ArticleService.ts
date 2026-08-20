import type { APIResponse } from '@playwright/test';
import { configManager } from '../config/ConfigManager';
import { ApiClient } from '../core/ApiClient';

export type CreateArticlePayload = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
};

export class ArticleService {
  constructor(private readonly apiClient: ApiClient) {}

  async create(payload: CreateArticlePayload): Promise<APIResponse> {
    return this.apiClient.post(configManager.getEndpointConfig().articles, {
      auth: true,
      data: payload,
    });
  }

  async list(): Promise<APIResponse> {
    return this.apiClient.get(configManager.getEndpointConfig().articles);
  }

  async getBySlug(slug: string): Promise<APIResponse> {
    return this.apiClient.get(configManager.getEndpointConfig().articleTemplate.replace('{slug}', slug));
  }

  async update(
    slug: string,
    payload: { article: { title?: string; description?: string; body?: string } },
  ): Promise<APIResponse> {
    return this.apiClient.put(configManager.getEndpointConfig().articleTemplate.replace('{slug}', slug), {
      auth: true,
      data: payload,
    });
  }

  async delete(slug: string): Promise<APIResponse> {
    return this.apiClient.delete(configManager.getEndpointConfig().articleTemplate.replace('{slug}', slug), {
      auth: true,
    });
  }
}
