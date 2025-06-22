<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img :src="logo" alt="AI Signals logo" />
      </div>
      <button class="header__login">Login</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/icons/logo.svg'
</script>

<style scoped lang="scss">
.header {
  background-color: #050d22;
  color: #ffffff;
  height: 90px;
  display: flex;
  align-items: center;

  &__container {
    width: 100%;
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    img {
      width: auto;
      height: 29px;
    }
  }

  &__login {
    background: transparent;
    border: 1px solid rgba(158, 210, 255, 1);
    border-radius: 10px;
    padding: 10px 30px;
    color: rgba(255, 255, 255, 1);
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s ease;

    height: 38px;
    width: 105px;

    display: flex;
    align-items: center;

    &:hover {
      background: #ffffff18;
    }
  }
}
</style>
