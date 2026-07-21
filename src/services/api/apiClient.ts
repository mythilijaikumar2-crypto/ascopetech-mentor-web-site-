export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export class ApiClient {
  private static latencyMs = 600;

  /**
   * Simulated API GET request with network delay and fallback error handling
   */
  public static async get<T>(url: string, mockData: T): Promise<ApiResponse<T>> {
    await this.delay(this.latencyMs);
    return {
      data: mockData,
      status: 200,
      message: `Successfully fetched from ${url}`,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Simulated API POST request
   */
  public static async post<T, R>(url: string, payload: T, mockResponse: R): Promise<ApiResponse<R>> {
    await this.delay(this.latencyMs);
    return {
      data: mockResponse,
      status: 201,
      message: `Successfully posted to ${url}`,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Simulated Server-Sent Events (SSE) or AI Token Streamer
   */
  public static async *streamText(text: string, intervalMs = 25): AsyncGenerator<string, void, unknown> {
    const tokens = text.split(" ");
    for (const token of tokens) {
      await this.delay(intervalMs);
      yield token + " ";
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
