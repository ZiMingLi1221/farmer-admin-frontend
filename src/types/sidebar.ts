// 模組類型
export type ModuleType = "new-chat" | "conversation" | "knowledge" | "forms";

// 側邊欄狀態
export interface SidebarState {
  activeModule: ModuleType;
  isSecondaryExpanded: boolean;
  isHovering: boolean;
  isPinned: boolean; // 新增釘選狀態
}

// 選單項目
export interface MenuItem {
  id: ModuleType;
  icon: string;
  label: string;
  route: string;
}
