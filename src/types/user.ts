/**
 * 用戶相關型別定義
 */

/**
 * 用戶角色
 */
export type UserRole = "admin" | "user" | "manager" | "viewer";

/**
 * 用戶資訊介面
 */
export interface UserInfo {
  id?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email?: string;
}

/**
 * 用戶 Store 狀態介面
 */
export interface UserState {
  user: UserInfo | null;
  isAuthenticated: boolean;
}

/**
 * 登入請求參數
 */
export interface LoginPayload {
  username: string;
  password: string;
}

/**
 * 登入回應
 */
export interface LoginResponse {
  user: UserInfo;
  token: string;
}
