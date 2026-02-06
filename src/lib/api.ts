import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ChatRequest {
  message: string;
  user_id?: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data?: Record<string, any>;
  suggestions?: string[];
  metadata?: Record<string, any>;
}

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const { data } = await this.client.post<ChatResponse>('/api/v1/chat', request);
    return data;
  }

  async healthCheck(): Promise<any> {
    const { data } = await this.client.get('/health');
    return data;
  }
}

export const apiClient = new APIClient();
export default apiClient;