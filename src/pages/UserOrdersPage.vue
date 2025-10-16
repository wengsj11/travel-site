<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { useDestinationStore } from '../stores/destination'

const router = useRouter()
const bookingStore = useBookingStore()
const destinationStore = useDestinationStore()

onMounted(async () => {
  await destinationStore.fetchDestinations()
})

const getDestinationName = (destinationId: string) => {
  return destinationStore.destinations.find(d => d.id === destinationId)?.name || '未知目的地'
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const statusText = {
  pending: '待确认',
  confirmed: '已确认',
  cancelled: '已取消'
}

const statusClass = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  cancelled: 'status-cancelled'
}
</script>

<template>
  <main class="orders-page">
    <div class="orders-container">
      <h1 class="page-title">我的订单</h1>
      
      <div class="orders-list" v-if="bookingStore.bookings.length > 0">
        <div
          v-for="booking in bookingStore.bookings"
          :key="booking.id"
          class="order-card"
          @click="router.push(`/order-confirmation/${booking.id}`)"
        >
          <div class="order-header">
            <span class="order-number">订单号：{{ booking.id }}</span>
            <span
              class="order-status"
              :class="statusClass[booking.status]"
            >
              {{ statusText[booking.status] }}
            </span>
          </div>
          
          <div class="order-content">
            <div class="destination-info">
              <h3 class="destination-name">{{ getDestinationName(booking.destinationId) }}</h3>
              <div class="booking-details">
                <p>入住：{{ formatDate(booking.startDate) }}</p>
                <p>离店：{{ formatDate(booking.endDate) }}</p>
                <p>{{ booking.travelers }}人 · {{ booking.roomType }}</p>
              </div>
            </div>
            
            <div class="order-price">
              <span class="price-label">总价</span>
              <span class="price-amount">¥{{ booking.totalPrice }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <p class="empty-message">暂无订单记录</p>
        <button
          class="browse-button"
          @click="router.push('/')"
        >
          浏览目的地
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.orders-page {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 1rem;
}

.orders-container {
  max-width: 64rem;
  margin: 0 auto;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-number {
  font-size: 0.875rem;
  color: #6b7280;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-confirmed {
  background-color: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}

.order-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.destination-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.booking-details {
  color: #6b7280;
  font-size: 0.875rem;
}

.booking-details p {
  margin: 0.25rem 0;
}

.order-price {
  text-align: right;
}

.price-label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.price-amount {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b82f6;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-message {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.browse-button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.browse-button:hover {
  background-color: #2563eb;
}
</style>