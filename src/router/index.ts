import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAppStore } from '@/stores/app'

const routes: any = [
  {
    path: '',
    component: GuestLayout,
    children: [
      {
        path: '/',
        redirect: '/login',
      },
      {
        path: '/login',
        name: "login",
        component: () => import('@/app/features/login/presentation/IndexView.vue')
      },
      {
        path: '/register',
        name: "register",
        component: () => import('@/app/features/register/presentation/IndexView.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/app/AppLayoutIndex.vue'),
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            name: 'products.index',
            component: () => import('@/app/features/product/presentation/IndexView.vue')
          },
          {
            path: 'create',
            name: 'products.create',
            component: () => import('@/app/features/product/presentation/CreateView.vue')
          }
        ]
      },
      {
        path: 'containers',
        children: [
          {
            path: '',
            name: 'containers.index',
            component: () => import('@/app/features/container/presentation/IndexView.vue')
          },
        ]
      },
      {
        path: 'territories',
        component: () => import('@/app/features/territory/presentation/IndexView.vue'),
        name: 'territories.index'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from , next) => {
  const appStore = useAppStore()
  appStore.setAppLoading(true)
  return next()
})

router.afterEach(() => {
  const appStore = useAppStore()
  appStore.setAppLoading(false)
})

export default router
