<template>
  <section class="agreement">
    <div class="agreement__banner">
      <h1 class="agreement__title">Affiliate Agreement</h1>
    </div>

    <div class="agreement__content">
      <p class="first-paragraph">Please read these terms and conditions carefully before using Our Service.</p>

      <h3>Effective Date: [Insert Date]</h3>
      <p><strong>This Agreement</strong> is entered into by and between <strong>AI Signals</strong>, (hereinafter referred to as the “Company”), and the undersigned individual (hereinafter referred to as the “Affiliate”).</p>

      <span class="break-line"></span>

      <h3>1. Purpose of Agreement</h3>
      <p><strong>This Agreement</strong> sets forth the terms under which the Affiliate agrees to promote, market, and refer subscribers to the Company's services, specifically the <strong>AI Signals Professional Terminal and Signals</strong>, in exchange for commission-based compensation.</p>

      <span class="break-line-two"></span>

      <h3>2. Commission Structure</h3>

      <h3>2.1 Tier 1 – Direct Sales Commission</h3>
      <p class="dif-margin-p">The Affiliate shall earn a <strong>66% commission</strong> on all monthly subscription sales made directly through the Affiliate’s unique referral link.</p>

      <h3>2.2 Tier 2 – Override Commission (Sub-Affiliate Sales)</h3>
      <p class="list-text-top">If the Affiliate refers another person (a "Sub-Affiliate") to the Program, and that Sub-Affiliate makes subscription sales:</p>

      <ul>
        <li>The Affiliate shall earn an additional <strong>11% override commission</strong> on all direct sales made by the Sub-Affiliate, provided that:</li>
        <li>The Affiliate generates <strong>no less than $5,000 in personal Tier 1 subscription sales</strong> during the same calendar month in which the override is claimed.</li>
      </ul>
      <p class="list-text-bottom">If the $5,000 threshold is not met in a given month, the 11% override will not be paid for that period.</p>

      <span class="break-line-three"></span>
      <h3>3. Payment Terms</h3>
      <ul>
        <li>Commissions shall be paid <strong>monthly</strong>, within <strong>10 business days</strong> following the end of each calendar month.</li>
        <li>All payments will be made in [USDT, USDC], to the account or wallet address provided by the Affiliate.</li>
        <li>The Affiliate is solely responsible for reporting and paying any applicable income taxes or transaction fees.</li>
      </ul>

      <span class="break-line-two"></span>

      <h3>4. Marketing & Conduct Requirements</h3>
      <p class="list-text-top">The Affiliate agrees to:</p>
      <ul>
        <li>Market and promote the AI Signals platform in a lawful, honest, and professional manner.</li>
        <li>Avoid making any false or misleading claims regarding profits, investment returns, or Company guarantees.</li>
        <li>Comply with all applicable regulations and advertising laws within the Affiliate’s local jurisdiction.</li>
      </ul>
      <p class="list-text-middle">Prohibited conduct includes, but is not limited to:</p>
      <ul>
        <li>Spamming, unsolicited messaging, or deceptive traffic generation.</li>
        <li>Promising guaranteed profits or returns.</li>
        <li>Misrepresentation of the Company’s services or affiliate structure.</li>
      </ul>
      <p class="list-text-bottom">Violation of these terms may result in <strong>immediate termination of this Agreement and forfeiture of unpaid commissions.</strong></p>

      <span class="break-line-two"></span>
      <h3>5. Term and Termination</h3>
      <p class="list-text-top">This Agreement shall remain in effect until terminated by either party.</p>
      <ul>
        <li>The Affiliate may terminate this Agreement at any time with written notice.</li>
        <li>The Company reserves the right to terminate this Agreement at any time, with or without cause, by providing written notice to the Affiliate.</li>
        <li>Upon termination, the Affiliate shall no longer promote the Company or present as an active Affiliate, and any future commissions from ongoing subscriptions or renewals will cease unless otherwise agreed in writing.</li>
      </ul>

      <span class="break-line-two"></span>
      <h3>6. Independent Contractor Status</h3>
      <p>The Affiliate enters this Agreement as an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, or employer-employee relationship.</p>

      <span class="break-line-two"></span>
      <h3>7. Limitation of Liability</h3>
      <p>The Company shall not be held liable for indirect, incidental, or consequential damages arising from this Agreement. No guarantees are made regarding income potential or performance of the AI Signals platform.</p>

      <span class="break-line-two"></span>
      <h3>8. Governing Law</h3>
      <p>This Agreement shall be governed by and interpreted in accordance with the laws of Singapore. Any disputes shall be resolved under the jurisdiction of the courts of Singapore.</p>

      <span class="break-line-two"></span>
      <h3>9. Entire Agreement</h3>
      <p>This Agreement constitutes the entire understanding between the Company and the Affiliate. No other promises or agreements shall be binding unless made in writing and signed by both parties.</p>

      <span class="break-line-two"></span>
      <h3>10. Acceptance</h3>
      <p>By signing below, the Affiliate acknowledges having read, understood, and agreed to the terms set forth in this Agreement.</p>

      <span class="break-line-two"></span>

      <form class="acceptance-form">
        <div class="form-wrapper">
          <div class="form-row">
            <label>Affiliate Signature:</label>
            <div class="custom-upload">
              <input type="file" id="signatureFile1" />
              <label for="signatureFile1">
                <img src="@/assets/icons/upload-file.svg" alt="Upload Icon" />
              </label>
            </div>
          </div>

          <div class="form-row">
            <label>Full Legal Name:</label>
            <input type="text" placeholder="eg. Roman" />
          </div>

          <div class="form-row">
            <label>Email Address:</label>
            <input type="email" placeholder="eg. example@gmail.com" />
          </div>

          <div class="form-row">
            <label>Date:</label>
            <input type="text" placeholder="eg. 02/04/2021" />
          </div>

          <div class="form-row">
            <label>Company Representative:</label>
            <input type="text" placeholder="eg. Roman" />
          </div>

          <div class="form-row">
            <label>Signature:</label>
            <div class="custom-upload">
              <input type="file" id="signatureFile2" />
              <label for="signatureFile2">
                <img src="@/assets/icons/upload-file.svg" alt="Upload Icon" />
              </label>
            </div>
          </div>

          <div class="form-row">
            <label>Date:</label>
            <input type="text" placeholder="eg. 02/04/2021" />
          </div>
        </div>

        <span class="break-line-form"></span>
        <p>By signing below, the Affiliate acknowledges having read, understood, and agreed to the terms set forth in this Agreement.</p>

        <div class="form-checkbox">
          <div class="checkbox-container">
            <input type="checkbox" id="agreement" />
            <label for="agreement">I agree to the AI Signals Affiliate Agreement</label>
          </div>

          <button type="button" class="accept-btn" @click="handleAccept">
            <img :src="check" alt="Check Button" />
            ACCEPT
          </button>
        </div>
      </form>

    </div>
  </section>
</template>

<script setup lang="ts">
import check from '@/assets/icons/check-btn.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleAccept() {
  router.push('/dashboard')
}
</script>

<style scoped lang="scss">
.agreement {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 142px;
    background:
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('@/assets/images/affiliate-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 1.8rem;
    color: #fff;
    font-weight: 600;
  }

  &__content {
    width: 1392px;
    margin: 20px auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 80px 116px;

    .first-paragraph {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 60px;
    }

    h3 {
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
      margin-bottom: 12px;
    }

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
    }

    .break-line {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 60px 0;
    }

    .break-line-two {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 30px 0;
    }

    .break-line-three {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 60px 0 30px 0;
    }

    .dif-margin-p {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 20px;
    }

    .list-text-top {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 20px;
    }

    .list-text-middle {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      margin: 20px 0;
    }

    .list-text-bottom {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 1);
      margin-top: 20px;
    }

    ul {
      padding-left: 30px;
      list-style: disc;
    }

    strong {
      font-weight: 600;
    }

    .acceptance-form {
      width: 100%;
      display: flex;
      flex-direction: column;

      .form-wrapper {
        margin-top: 40px;
        width: 638px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;

          input {
            width: 384px;
            height: 46px;
            border-radius: 5px;
            border: 1px solid rgba(196, 196, 196, 1);
            padding: 0 10px;

            &::placeholder {
              color: rgba(0, 0, 0, 0.4);
            }
          }

          label {
            font-weight: 600;
            white-space: nowrap;
          }

          .custom-upload {
            position: relative;
            width: 384px;
            display: flex;
            align-items: center;

            input[type='file'] {
              width: 384px;
              border: 1px solid #ccc;
              border-radius: 6px;
              font-size: 16px;
              appearance: none;
              background-color: #fff;
              color: transparent;
              position: relative;
              z-index: 1;
            }

            label {
              position: absolute;
              right: 4px;
              top: 50%;
              transform: translateY(-50%);
              background-color: transparent;
              padding: 0;
              margin: 0;
              cursor: pointer;
              z-index: 2;

              img {
                width: 38px;
                height: 38px;
              }
            }

            input[type='file']::-webkit-file-upload-button {
              visibility: hidden;
            }
            input[type='file']::file-selector-button {
              visibility: hidden;
            }
          }
        }
      }

      .break-line-form {
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 1);
        margin: 50px 0;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 1);
      }

      .form-checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 31px;

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
        }

        input[type='checkbox'] {
          width: 20px;
          height: 20px;
        }

        label {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.5);
        }
      }

      .accept-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        height: 46px;
        width: 174px;
        border-radius: 5px;
        padding: 10px 20px;
        border: none;
        background-color: rgba(241, 162, 59, 1);
        color: rgba(255, 255, 255, 1);
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.2s;

        img {
          width: 16px;
          height: auto;
          margin-bottom: 2px;
        }

        &:hover {
          background-color: #e6991e;
        }
      }
    }
  }
}
</style>
