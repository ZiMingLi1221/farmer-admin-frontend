import { storeToRefs } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'
import type { ModuleType } from '@/types'

export const useSidebar = () => {
  const sidebarStore = useSidebarStore()
  
  const {
    activeModule,
    isSecondaryExpanded,
    isHovering,
    shouldShowSecondary
  } = storeToRefs(sidebarStore)

  const setActiveModule = (module: ModuleType): void => {
    sidebarStore.setActiveModule(module)
  }

  const toggleSecondary = (): void => {
    sidebarStore.toggleSecondary()
  }

  const setHovering = (value: boolean): void => {
    sidebarStore.setHovering(value)
  }

  return {
    activeModule,
    isSecondaryExpanded,
    isHovering,
    shouldShowSecondary,
    setActiveModule,
    toggleSecondary,
    setHovering
  }
}
