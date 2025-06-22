<template>
  <section class="register">
    <h1 class="register__title">AI Signals Affiliate Program</h1>
    <div class="register__container">
      <div class="register__left">
        <img :src="registerImage" alt="Keyboard illustration" />
      </div>

      <div class="register__right">
        <img class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="register__form" @submit="handleSubmit">
          <label>Email</label>
          <input type="email" placeholder="eg. roman@aisignals.com" />

          <label>Full Name</label>
          <input type="text" placeholder="eg. Roman" />

          <button type="submit">GET STARTED</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import registerImage from '@/assets/images/register-image.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSubmit(e: Event) {
  e.preventDefault()
  router.push('/agreement')
}
</script>

<style scoped lang="scss">
.register {
  background-color: rgba(245, 245, 245, 1);
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 17px;

  &__title {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    color: rgba(5, 13, 34, 1);
    margin-top: 33px;
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
  }
}
</style>
