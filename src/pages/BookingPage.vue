<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDestinationStore } from '../stores/destination'
import { useBookingStore } from '../stores/booking'
import BookingForm from '../components/booking/BookingForm.vue'
import PriceCalculator from '../components/booking/PriceCalculator.vue'
import PaymentSection from '../components/booking/PaymentSection.vue'

const route = useRoute()
const router = useRouter()
const destinationStore = useDestinationStore()
const bookingStore = useBookingStore()

onMounted(async () => {
  await destinationStore.fetchDestinations()
  const destinationId = route.query.id as string
  if (destinationId) {
    bookingStore.initializeBooking(destinationId)
  }
})

const currentDestination = computed(() => {
  return destinationStore.destinations.find(d => d.id === bookingStore.selectedDestinationId)
})
</script>

<template>
  <main class="booking-page">
    <div class="booking-container">
      <div v-if="currentDestination" class="booking-content">
        <h1 class="booking-title">预订您的旅程</h1>
        <div class="booking-layout">
          <div>
            <BookingForm />
          </div>
          <div class="booking-sidebar">
            <PriceCalculator />
            <PaymentSection />
          </div>
        </div>
      </div>
      <div v-else class="error-state">
        <p class="error-message">目的地信息不存在</p>
        <button
          class="back-button"
          @click="router.push('/')"
        >
          返回首页
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.booking-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

.booking-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.booking-content {
  max-width: 56rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.booking-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 2rem;
}

.booking-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .booking-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

.booking-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-state {
  text-align: center;
  padding: 4rem 0;
}

.error-message {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.back-button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #2563eb;
}
</style>