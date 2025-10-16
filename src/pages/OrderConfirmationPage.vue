<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { useDestinationStore } from '../stores/destination'

const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()
const destinationStore = useDestinationStore()

const orderNumber = ref(route.params.id as string)
const booking = ref(bookingStore.bookings.find(b => b.id === orderNumber.value))

const destination = ref(destinationStore.destinations.find(
  d => d.id === booking.value?.destinationId
))

onMounted(async () => {
  if (!booking.value || !destination.value) {
    await destinationStore.fetchDestinations()
    // 如果找不到订单，重定向到首页
    router.push('/')
  }
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
</script>

<template>
  <main class="confirmation-page">
    <div class="confirmation-container">
      <div class="confirmation-content">
        <div class="success-icon">✓</div>
        <h1 class="confirmation-title">预订成功</h1>
        
        <div class="order-details">
          <h2 class="section-title">订单详情</h2>
          
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">订单号</span>
              <span class="detail-value">{{ orderNumber }}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">目的地</span>
              <span class="detail-value">{{ destination?.name }}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">入住日期</span>
              <span class="detail-value">{{ formatDate(booking?.startDate || '') }}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">离店日期</span>
              <span class="detail-value">{{ formatDate(booking?.endDate || '') }}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">房型</span>
              <span class="detail-value">{{ booking?.roomType }}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">旅行人数</span>
              <span class="detail-value">{{ booking?.travelers }}人</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">支付方式</span>
              <span class="detail-value">{{ booking?.paymentMethod }}</span>
            </div>
            
            <div class="detail-item total-price">
              <span class="detail-label">总价</span>
              <span class="detail-value price">¥{{ booking?.totalPrice }}</span>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button
            class="action-button primary"
            @click="router.push('/')"
          >
            返回首页
          </button>
          <button
            class="action-button secondary"
            @click="router.push('/user/orders')"
          >
            查看订单
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.confirmation-page {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 1rem;
}

.confirmation-container {
  max-width: 48rem;
  margin: 0 auto;
}

.confirmation-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.success-icon {
  width: 4rem;
  height: 4rem;
  background-color: #34d399;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.confirmation-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.5rem;
  text-align: left;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  text-align: left;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detail-item {
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.detail-label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.total-price {
  grid-column: 1 / -1;
  background-color: #eff6ff;
}

.price {
  color: #3b82f6;
  font-size: 1.25rem;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.action-button.primary {
  background-color: #3b82f6;
  color: white;
}

.action-button.primary:hover {
  background-color: #2563eb;
}

.action-button.secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.action-button.secondary:hover {
  background-color: #d1d5db;
}
</style>