<template>
  <section class="reset">
    <div class="reset__banner">
      <div class="reset__glass">
        <h1 class="reset__title">Password Reset</h1>
      </div>
    </div>
    <div class="reset__container">
      <div class="reset__left">
        <img :src="resetImage" alt="Reset illustration" />
      </div>

      <div class="reset__right">
        <img class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="reset__form" @submit.prevent="handleSubmit">
          <label>Registered Email</label>
          <input type="email" placeholder="eg. name@aisignals.com" />
          <button type="submit">RESET LINK</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import resetImage from '@/assets/images/reset-image.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSubmit() {
  router.push('/login') // or show a success notification
}
</script>

<style scoped lang="scss">
.reset {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 142px;
    background: url('@/assets/images/reset-banner.webp');
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
  }
}
</style>