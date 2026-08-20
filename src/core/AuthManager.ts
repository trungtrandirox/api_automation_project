export class AuthManager {
  private token?: string;

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = undefined;
  }

  getAuthHeader(): Record<string, string> {
    if (!this.token) {
      throw new Error('Auth token is missing. Login first or set token explicitly.');
    }
    return { Authorization: `Token ${this.token}` };
  }

  getToken(): string | undefined {
    return this.token;
  }
}
