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

  constructor() {
    this.baseUrl = readOptional(process.env.API_BASE_URL) ?? 'https://restful-booker.herokuapp.com';
    this.apiToken = readOptional(process.env.API_TOKEN);
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
}

export const configManager = new ConfigManager();
