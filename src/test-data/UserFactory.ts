import { faker } from '@faker-js/faker';

export type UserSeed = {
  username: string;
  email: string;
  password: string;
};

export class UserFactory {
  static createUser(prefix: string): UserSeed {
    const suffix = `${Date.now()}-${faker.number.int({ min: 1000, max: 9999 })}`;
    return {
      username: `${prefix}-${suffix}`,
      email: `${prefix}-${suffix}@example.com`,
      password: `P@ssw0rd-${suffix}`,
    };
  }
}
