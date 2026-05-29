export class TestDataGenerator {
  /**
   * Generate unique email
   */
  static generateEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}_${timestamp}_${random}@example.com`;
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate user data
   */
  static generateUserData() {
    return {
      firstName: `John${this.generateRandomNumber(1, 999)}`,
      lastName: `Doe${this.generateRandomNumber(1, 999)}`,
      email: this.generateEmail('user'),
      password: 'Test@1234',
    };
  }

  /**
   * Generate long email for testing max length validation
   */
  static generateLongEmail(): string {
    const localPart = this.generateRandomString(99);
    const domainPart = this.generateRandomString(99);
    return `${localPart}@${domainPart}.com`;
  }

  /**
   * Generate contact data with all fields
   */
  static generateFullContactData() {
    const num = this.generateRandomNumber(1, 999);
    return {
      firstName: `Contact${num}`,
      lastName: `Person${num}`,
      birthdate: '1990-01-01',
      email: this.generateEmail('contact'),
      phone: `555${this.generateRandomNumber(1000000, 9999999)}`,
      street1: `${this.generateRandomNumber(1, 9999)} Main St`,
      street2: `Apt ${this.generateRandomNumber(1, 999)}`,
      city: 'Test City',
      stateProvince: 'TS',
      postalCode: `${this.generateRandomNumber(10000, 99999)}`,
      country: 'USA',
    };
  }

  /**
   * Generate minimal contact data
   */
  static generateMinimalContactData() {
    const num = this.generateRandomNumber(1, 999);
    return {
      firstName: `Contact${num}`,
      lastName: `Person${num}`,
      email: this.generateEmail('contact'),
    };
  }

  /**
   * Generate invalid email
   */
  static generateInvalidEmail(): string {
    return `invalid-email-${this.generateRandomNumber()}`;
  }

  /**
   * Generate short password
   */
  static generateShortPassword(): string {
    return '123';
  }

  /**
   * Generate valid password
   */
  static generateValidPassword(): string {
    return `Test@${this.generateRandomNumber(1000, 9999)}`;
  }
}
