import { test, expect } from '../fixtures/api.fixture';

test.describe('@api Local posts API', () => {
  test('lists posts with expected schema', async ({ postsClient }) => {
    const posts = await postsClient.listPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('gets a post by id', async ({ postsClient }) => {
    const post = await postsClient.getPost(1);

    expect(post.id).toBe(1);
    expect(post.title.length).toBeGreaterThan(0);
  });
});
