import { test as base } from '@playwright/test';
import { PostsClient } from '../../src/api/clients/postsClient';

type ApiFixtures = {
  postsClient: PostsClient;
};

export const test = base.extend<ApiFixtures>({
  postsClient: async ({ request }, use) => {
    await use(new PostsClient(request));
  },
});

export { expect } from '@playwright/test';
