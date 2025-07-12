// API レスポンス型定義

export interface ApiResponse<T = any> {
  message?: string;
  status?: string;
  data?: T;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}

export interface TestResponse {
  message: string;
  database_url_configured: boolean;
  api_port: number;
}

export interface DatabaseTestResponse {
  status: string;
  message: string;
}

export interface DatabaseCheckResponse {
  status: string;
  message: string;
  test_query_result: number;
}

// 今後のCRUD機能用の型
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface MemoFolder {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Memo {
  id: number;
  title: string;
  content: string;
  memo_folder_id: number;
  created_at: string;
  updated_at: string;
}