import { faker } from '@faker-js/faker';

export type ArticleSeed = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export class ArticleFactory {
  static createArticle(prefix: string): ArticleSeed {
    const id = `${Date.now()}-${faker.number.int({ min: 1000, max: 9999 })}`;
    return {
      title: `${prefix} title ${id}`,
      description: `${prefix} description ${id}`,
      body: `${prefix} body ${id}`,
      tags: [prefix, `tag-${id}`],
    };
  }
}
