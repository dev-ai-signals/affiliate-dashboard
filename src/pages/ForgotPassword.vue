<template>
  <section class="reset">
    <div class="reset__banner">
      <div class="reset__glass">
        <h1 class="reset__title">Password Reset</h1>
      </div>
    </div>
    <div class="reset__container">
      <div class="reset__left">
        <img v-if="!isMobile" :src="resetImage" alt="Reset illustration" />
        <div v-else class="mobile-top-content">
          <img class="logo" :src="logo" alt="AI Signals Logo" />
          <img :src="mobileResetImage" alt="Mobile Content Image">
        </div>
      </div>

      <div class="reset__right">
        <img v-if="!isMobile" class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="reset__form" @submit.prevent="handleSubmit">
          <template v-if="!isResetMode">
            <label>Registered Email</label>
            <input v-model="email" type="email" placeholder="eg. name@aisignals.com" />
            <button type="submit">GET A LINK</button>
          </template>

          <template v-else>
            <label>New Password</label>
            <input v-model="password" type="password" placeholder="New password" />
            <label>Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Confirm password" />
            <button type="submit">RESET PASSWORD</button>
          </template>
        </form>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import resetImage from '@/assets/images/reset-image.webp'
import mobileResetImage from '@/assets/images/mobile-reset-content.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isMobile = ref(window.innerWidth <= 768)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}


const isResetMode = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

onMounted(() => {
  if (route.query.token) {
    isResetMode.value = true
  }
})

function handleSubmit() {
  if (isResetMode.value) {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    console.log('Resetting password with token:', route.query.token, 'new pass:', password.value)
    router.push('/login')
  } else {
    console.log('Sending reset link to:', email.value)
    router.push('/login')
  }
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped lang="scss">
.reset {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/reset-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;


    @media (max-width: 768px) {
      background: url('@/assets/images/mobile-reset-bg.webp');
    }
  }

  &__glass {
    width: 1380px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 10px;
    padding: 10px 20px;
    gap: 10px;
  }

  &__title {
    font-size: 36px;
    color: #fff;
    font-weight: 600;
  }

  &__container {
    width: 1392px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 66px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: auto;
    padding: 90px 0;
  }

  &__left {
    img {
      border-radius: 10px;
      max-width: 392px;
      height: auto;
    }

    .mobile-top-content {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .logo {
        width: 48px;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 354px;
    gap: 9px;

    .logo {
      width: 50px;
      height: auto;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 9px;

    label {
      font-weight: 500;
      font-size: 12px;
      color: rgba(0, 0, 0, 1);
    }

    input {
      padding: 11px 6px;
      border-radius: 4px;
      height: 39px;
      border: 1px solid rgba(0, 0, 0, 0.26);
      background: transparent;
      color: #000;
      font-weight: 400;
      font-size: 12px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        font-weight: 400;
      }
    }

    button {
      background-color: rgba(241, 162, 59, 1);
      height: 35px;
      border: none;
      border-radius: 5px;
      color: rgba(255, 255, 255, 1);
      padding: 10px 20px;
      font-weight: 500;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #e6991e;
      }
    }
  }
}


@media (max-width: 768px) {
  .reset__glass {
    width: 90%;
    height: auto;
    padding: 8px 14px;
    .reset__title {
      font-size: 22px;
    }
  }

  .reset__container {
    width: 90%;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px 60px 20px;
  }

  .reset__left img {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }

  .reset__right {
    width: 100%;
    .logo {
      width: 40px;
    }
  }

  .reset__form {
    gap: 8px;

    input {
      height: 42px;
      font-size: 14px;

      &::placeholder {
        font-size: 13px;
      }
    }

    button {
      height: 42px;
      font-size: 14px;
    }
  }
}

</style>