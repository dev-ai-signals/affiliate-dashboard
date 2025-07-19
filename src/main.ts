import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/main.scss'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

import { useUserStore } from '@/shared/stores/user'
const userStore = useUserStore()
userStore.hydrate()

router.beforeEach((to, _from, next) => {
  const isLoggedIn = userStore.isLoggedIn
  const hasSignedAgreement = userStore.userDto?.agreementSignedAt !== null

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (isLoggedIn && !hasSignedAgreement && to.path !== '/agreement') {
    return next('/agreement')
  }

  if (isLoggedIn && hasSignedAgreement && to.path === '/agreement') {
    return next('/dashboard')
  }

  next()
})

app.use(router)
app.mount('#app')
