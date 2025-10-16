<script setup lang="ts">
import { ref } from 'vue'
import { useBookingStore } from '../../stores/booking'
import type { PaymentMethod } from '../../types/booking'

defineOptions({
  name: 'PaymentSection'
})

const bookingStore = useBookingStore()

const paymentMethods: PaymentMethod[] = ['alipay', 'wechat', 'creditCard']
const paymentMethodNames = {
  alipay: '支付宝',
  wechat: '微信支付',
  creditCard: '信用卡'
}

const selectedPaymentMethod = ref<PaymentMethod>('alipay')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await bookingStore.submitBooking(selectedPaymentMethod.value)
    // TODO: 处理成功提交后的逻辑
  } catch (error) {
    // TODO: 处理错误
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="payment-section">
    <h2 class="payment-title">选择支付方式</h2>
    
    <div class="payment-methods">
      <div
        v-for="method in paymentMethods"
        :key="method"
        class="payment-method"
        :class="{ 'payment-method-selected': selectedPaymentMethod === method }"
        @click="selectedPaymentMethod = method"
      >
        <span class="payment-method-name">{{ paymentMethodNames[method] }}</span>
      </div>
    </div>

    <button
      class="submit-button"
      :disabled="isSubmitting"
      @click="handleSubmit"
    >
      {{ isSubmitting ? '提交中...' : '确认支付' }}
    </button>
  </div>
</template>

<style>
.payment-section {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.payment-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-method {
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-method:hover {
  border-color: #3b82f6;
}

.payment-method-selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.payment-method-name {
  font-weight: 500;
  color: #374151;
}

.submit-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}
</style>