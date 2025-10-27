import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/chat'
      },
      {
        path: 'chat/:id?',
        name: 'chat',
        component: () => import('@/views/chat/index.vue'),
        meta: {
          title: 'AI 聊天'
        }
      },
      {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/knowledge-base/index.vue'),
        meta: {
          title: '知識庫'
        }
      },
      {
        path: 'forms',
        name: 'forms',
        component: () => import('@/views/e-form/index.vue'),
        meta: {
          title: '電子表單'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局導航守衛（可選）
router.beforeEach((to, from, next) => {
  // 設定頁面標題
  if (to.meta.title) {
    document.title = `${to.meta.title} - Farmer Admin System`
  }
  next()
})

export default router
