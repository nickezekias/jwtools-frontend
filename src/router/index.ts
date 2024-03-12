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
      }
    ]
  }
  /* {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  } */
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
