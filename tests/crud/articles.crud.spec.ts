import { expect, test } from '../../src/fixtures/ApiFixture';
import { ArticleFactory } from '../../src/test-data/ArticleFactory';
import { UserFactory } from '../../src/test-data/UserFactory';

test('@crud article CRUD flow', async ({ authService, articleService }) => {
  const user = UserFactory.createUser('crud');
  const register = await authService.register({
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
  expect(register.status()).toBe(201);

  const login = await authService.login({
    user: {
      email: user.email,
      password: user.password,
    },
  });
  expect(login.status()).toBe(200);

  const articleSeed = ArticleFactory.createArticle('crud');
  const create = await articleService.create({
    article: {
      title: articleSeed.title,
      description: articleSeed.description,
      body: articleSeed.body,
      tagList: articleSeed.tags,
    },
  });
  expect(create.status()).toBe(201);
  const created = (await create.json()) as { article: { slug: string; title: string } };
  expect(created.article.title).toBe(articleSeed.title);

  const read = await articleService.getBySlug(created.article.slug);
  expect(read.status()).toBe(200);

  const updatedTitle = `${articleSeed.title}-updated`;
  const update = await articleService.update(created.article.slug, {
    article: { title: updatedTitle },
  });
  expect(update.status()).toBe(200);
  const updated = (await update.json()) as { article: { title: string } };
  expect(updated.article.title).toBe(updatedTitle);

  const del = await articleService.delete(created.article.slug);
  expect([200, 204]).toContain(del.status());
});
