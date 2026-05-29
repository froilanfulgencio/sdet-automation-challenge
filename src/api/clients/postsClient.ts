import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Post } from '../types/post';

export class PostsClient {
  constructor(private readonly request: APIRequestContext) {}

  async listPosts(): Promise<Post[]> {
    const response = await this.request.get('/api/posts');
    await this.assertOk(response);
    return response.json();
  }

  async getPost(id: number): Promise<Post> {
    const response = await this.request.get(`/api/posts/${id}`);
    await this.assertOk(response);
    return response.json();
  }

  private async assertOk(response: APIResponse): Promise<void> {
    await expect(response, `Expected successful response, got ${response.status()}`).toBeOK();
  }
}
