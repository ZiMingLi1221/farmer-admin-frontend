// API 回應
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  code?: number;
}

// 分頁參數
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// 分頁回應
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// 錯誤
export interface AppError {
  code: string;
  message: string;
  details?: any;
}
