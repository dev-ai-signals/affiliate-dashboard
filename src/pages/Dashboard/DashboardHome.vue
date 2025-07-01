<template>
  <section class="dashboard">
    <div class="dashboard__banner">
      <div class="dashboard__glass">
        <h1 class="dashboard__title">Affiliate Dashboard</h1>
      </div>
    </div>

    <div class="dashboard__container">
      <div class="dashboard__cards">
        <div class="card-one">
          <h2>$50</h2>
          <span>Total Earned</span>
        </div>

        <div class="card-two">
          <div class="card-two-left">
            <h2>${{ balance.toFixed(2) }}</h2>
            <span>Balance</span>
          </div>
          <div class="card-two-right">
            <button
              class="payout-btn"
              :class="{ active: isPayoutAvailable }"
              :disabled="!isPayoutAvailable"
            >
              Request Payout
            </button>
            <div class="spanned-text">
              <span>SIGNED UP</span>
              <span class="darken">00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard__tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'tier2' }"
          @click="activeTab = 'tier2'"
        >
          Tier 2 Links
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'dashboard' }"
          @click="activeTab = 'dashboard'"
        >
          Dashboard
        </button>
      </div>

      <div v-if="activeTab === 'tier2'" class="dashboard__links">
        <div class="link-group">
          <label><strong>Tier 2 Link</strong></label>
          <div class="input-wrap" @click="copyText(tier2Link)">
            <span class="fake-input">{{ tier2Link }}</span>
            <img src="@/assets/icons/copy.svg" alt="Copy Icon" />
          </div>
        </div>

        <div class="link-group">
          <label><strong>Affiliate Link</strong></label>
          <div class="input-wrap" @click="copyText(affiliateLink)">
            <span class="fake-input">{{ affiliateLink }}</span>
            <img src="@/assets/icons/copy.svg" alt="Copy Icon" />
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'dashboard'" class="dashboard__placeholder">
        <p>Dashboard content here...</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const balance = ref(50)
const activeTab = ref<'tier2' | 'dashboard'>('tier2')

const isPayoutAvailable = computed(() => balance.value > 0)

const tier2Link = 'https://www.tradingview.com/pricing/?share_your_love=romangolovyou'
const affiliateLink = 'https://www.tradingview.com/pricing/?share_your_love=romangolovyou'

function copyText(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped lang="scss">
.dashboard {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;

  &__banner {
    height: 142px;
    background: url('@/assets/images/dashboard-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
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
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 50px;
    margin: 0 auto;
    height: 800px;
  }

  &__cards {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;

    .card-one {
      flex: 1;
      width: 298px;
      height: 126px;
      background: rgba(243, 245, 252, 1);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;

      h2 {
        font-size: 40px;
        font-weight: 600;
        color: rgba(93, 128, 249, 1);
      }

      span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(26, 26, 26, 0.7);
      }
    }

    .card-two {
      width: 622px;
      height: 126px;
      background: rgba(243, 245, 252, 1);
      border-radius: 8px;
      padding: 20px 50px 20px 20px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      h2 {
        font-size: 40px;
        font-weight: 600;
        color: rgba(93, 128, 249, 1);
      }

      span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(26, 26, 26, 0.7);
      }

      .card-two-left {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }

      .card-two-right {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .payout-btn {
          width: 226px;
          padding: 10px 19px;
          border: none;
          border-radius: 5px;
          font-weight: 500;
          font-size: 16px;
          color: rgba(255, 255, 255, 1);

          background-color: rgba(193, 193, 193, 1);
          cursor: not-allowed;

          &.active {
            background-color: rgba(6, 116, 41, 1);
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
              background: #065b23;
            }
          }
        }

        .spanned-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          span {
            font-weight: 500;
            font-size: 16px;
            color: rgba(26, 26, 26, 0.5);
          }

          .darken {
            font-weight: 600;
            font-size: 16px;
            color: rgba(26, 26, 26, 1);
          }
        }
      }
    }
  }

  &__tabs {
    display: flex;
    gap: 12px;
    width: 100%;
    border-bottom: 1px solid rgba(204, 216, 233, 1);

    .tab {
      padding: 10px 19px;
      border: 1px solid rgba(204, 216, 233, 1);
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      color: rgba(26, 26, 26, 1);

      &:not(.active):hover {
        background-color: rgba(243, 245, 252, 1);
      }

      &.active {
        background: rgba(6, 116, 41, 1);
        color: rgba(255, 255, 255, 1);

        &:hover {
          background: #065b23;
        }
      }
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 54px;
    width: 100%;

    .link-group {
      display: flex;
      flex-direction: column;
      gap: 20px;

      label {
        display: block;
        font-weight: 500;
        font-size: 20px;
        color: rgba(31, 41, 55, 1);
      }

      .input-wrap {
        display: flex;
        align-items: center;
        background: rgba(229, 227, 227, 0.6);
        border-radius: 5px;
        padding: 0 10px;
        height: 46px;
        width: 100%;

        .fake-input {
          flex: 1;
          font-weight: 400;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          width: 38px;
          height: 38px;
          cursor: pointer;
        }
      }
    }
  }
}

.dashboard__placeholder {
  width: 100%;
  margin-top: 54px;
  font-size: 18px;
  color: rgba(26, 26, 26, 0.7);
}
</style>

