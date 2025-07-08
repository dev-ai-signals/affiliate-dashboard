import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/register' },
  {
    path: '/register',
    component: () => import('@/pages/Register.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/forgot-password',
    component: () => import('@/pages/ForgotPassword.vue'),
  },
  {
    path: '/agreement',
    component: () => import('@/pages/Agreement.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/pages/Dashboard/DashboardHome.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
