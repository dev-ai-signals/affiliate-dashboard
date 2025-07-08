<template>
  <section class="register">
    <div class="register__banner">
      <div class="register__glass">
        <h1 class="register__title">AI Signals Affiliate Program</h1>
      </div>
    </div>
    <div class="register__container">
      <div class="register__left">
        <img :src="registerImage" alt="Keyboard illustration" />
      </div>

      <div class="register__right">
        <img class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="register__form" @submit="handleSubmit">
          <label>Email</label>
          <input v-model="email" @input="sync('email', $event)" type="email" placeholder="eg. name@gmail.com" />

          <label>Full Name</label>
          <input v-model="fullName" @input="sync('fullName', $event)" type="text" placeholder="eg. full name" />

          <label>Password</label>
          <input v-model="password" @input="sync('password', $event)" type="password" placeholder="eg. xyz1234567" />

          <label>Confirm Password</label>
          <input v-model="confirmPassword" @input="sync('confirmPassword', $event)" type="password" placeholder="eg. xyz1234567" />

          <button type="submit">GET STARTED</button>

          <div class="switch-login">
            Already have an account? <span @click="goToLogin">Login</span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import registerImage from '@/assets/images/register-image.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const email = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')

async function handleSubmit(e: Event) {
  e.preventDefault()

  if (!email.value || !fullName.value || !password.value || !confirmPassword.value) {
    alert('Please fill out all fields.')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  localStorage.setItem('pendingRegistration', JSON.stringify({
    email: email.value,
    fullName: fullName.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }))

  router.push('/agreement')
}



function sync(field: string, e: Event) {
  const value = (e.target as HTMLInputElement).value
  if (field === 'email') email.value = value
  if (field === 'fullName') fullName.value = value
  if (field === 'password') password.value = value
  if (field === 'confirmPassword') confirmPassword.value = value
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.register {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 142px;
    background: url('@/assets/images/register-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: 758px;
    padding: 45px 155px 90px 155px;
  }

  &__left {
    img {
      border-radius: 10px;
      max-width: 521px;
      height: auto;
      margin-right: 88px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 6px;

    .logo {
      width: 66px;
      height: auto;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    label {
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }

    input {
      padding: 14px 8px;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.26);
      background: transparent;
      color: #000;
      font-weight: 400;
      font-size: 16px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        font-weight: 400;
      }
    }

    button {
      background-color: rgba(241, 162, 59, 1);
      height: 46px;
      border: none;
      border-radius: 5px;
      color: rgba(255, 255, 255, 1);
      padding: 10px 20px;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #e6991e;
      }
    }

    .switch-login {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
      text-align: left;
      font-weight: 400;

      span {
        color: rgba(49, 118, 177, 1);
        cursor: pointer;
        font-weight: 500;
        transition: color 0.2s;
        text-decoration: underline;

        &:hover {
          color: #e6991e;
        }
      }
    }
  }
}
</style>
