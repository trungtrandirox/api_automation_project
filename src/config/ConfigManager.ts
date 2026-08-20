type EndpointConfig = {
  users: string;
  login: string;
  articles: string;
  articleTemplate: string;
};

function readOptional(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

class ConfigManager {
  private readonly baseUrl: string;
  private readonly apiToken?: string;
  private readonly endpoints: EndpointConfig;

  constructor() {
    this.baseUrl = readOptional(process.env.API_BASE_URL) ?? 'http://localhost:3000';
    this.apiToken = readOptional(process.env.API_TOKEN);
    this.endpoints = {
      users: readOptional(process.env.REALWORLD_USERS_PATH) ?? '/api/users',
      login: readOptional(process.env.REALWORLD_LOGIN_PATH) ?? '/api/users/login',
      articles: readOptional(process.env.REALWORLD_ARTICLES_PATH) ?? '/api/articles',
      articleTemplate:
        readOptional(process.env.REALWORLD_ARTICLE_PATH_TEMPLATE) ?? '/api/articles/{slug}',
    };
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getGlobalHeaders(): Record<string, string> | undefined {
    if (!this.apiToken) {
      return undefined;
    }
    return { Authorization: `Bearer ${this.apiToken}` };
  }

  getEndpointConfig(): EndpointConfig {
    return this.endpoints;
  }
}

export const configManager = new ConfigManager();
