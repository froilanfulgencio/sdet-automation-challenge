import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiHelper {
  private baseURL: string;
  private token?: string;

  constructor(private request: APIRequestContext, baseURL: string = 'https://thinking-tester-contact-list.herokuapp.com') {
    this.baseURL = baseURL;
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token;
  }

  /**
   * Get authentication token
   */
  getToken(): string | undefined {
    return this.token;
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = undefined;
  }

  /**
   * Get headers with authentication
   */
  private getHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make a GET request
   */
  async get(endpoint: string, options?: any): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(options?.headers),
      ...options,
    });
    return response;
  }

  /**
   * Make a POST request
   */
  async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.getHeaders(options?.headers),
      ...options,
    });
    return response;
  }

  /**
   * Make a PUT request
   */
  async put(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.getHeaders(options?.headers),
      ...options,
    });
    return response;
  }

  /**
   * Make a PATCH request
   */
  async patch(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const response = await this.request.patch(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.getHeaders(options?.headers),
      ...options,
    });
    return response;
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint: string, options?: any): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(options?.headers),
      ...options,
    });
    return response;
  }

  /**
   * Verify response status
   */
  verifyStatus(response: APIResponse, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Verify response contains expected data
   */
  async verifyResponseBody(response: APIResponse, expectedData: any) {
    const body = await response.json();
    expect(body).toMatchObject(expectedData);
  }

  /**
   * Get response as JSON
   */
  async getJsonResponse(response: APIResponse) {
    return await response.json();
  }

  /**
   * Verify response time
   */
  verifyResponseTime(startTime: number, maxTime: number) {
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(maxTime);
  }

  /**
   * Verify response has required fields
   */
  async verifyRequiredFields(response: APIResponse, fields: string[]) {
    const body = await response.json();
    fields.forEach(field => {
      expect(body).toHaveProperty(field);
    });
  }

  /**
   * Verify response does not have sensitive fields
   */
  async verifySensitiveFieldsNotPresent(response: APIResponse, fields: string[]) {
    const body = await response.json();
    fields.forEach(field => {
      expect(body).not.toHaveProperty(field);
    });
  }
}
