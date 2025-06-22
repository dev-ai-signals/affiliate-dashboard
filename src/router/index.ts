// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/register' },
  {
    path: '/register',
    component: () => import('@/pages/Register.vue'),
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

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
