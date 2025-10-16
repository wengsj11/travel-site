<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '../../stores/booking'
import { useDestinationStore } from '../../stores/destination'

defineOptions({
  name: 'PriceCalculator'
})

const bookingStore = useBookingStore()
const destinationStore = useDestinationStore()

const selectedDestination = computed(() => {
  return destinationStore.destinations.find(d => d.id === bookingStore.selectedDestinationId)
})

const roomPrices = {
  standard: 1,
  deluxe: 1.5,
  suite: 2
}

const basePrice = computed(() => selectedDestination.value?.basePrice || 0)
const roomMultiplier = computed(() => roomPrices[bookingStore.currentBooking.roomType] || 1)
const numberOfDays = computed(() => bookingStore.getDaysDifference())
const totalPrice = computed(() => {
  return basePrice.value * roomMultiplier.value * numberOfDays.value * bookingStore.currentBooking.travelers
})
</script>

<template>
  <div class="price-calculator">
    <h2 class="calculator-title">价格明细</h2>
    
    <div class="price-details">
      <div class="price-row">
        <span>基础价格</span>
        <span>¥{{ basePrice }}</span>
      </div>
      
      <div class="price-row">
        <span>房型倍率</span>
        <span>x{{ roomMultiplier }}</span>
      </div>
      
      <div class="price-row">
        <span>入住天数</span>
        <span>x{{ numberOfDays }}</span>
      </div>
      
      <div class="price-row">
        <span>旅行人数</span>
        <span>x{{ bookingStore.currentBooking.travelers }}</span>
      </div>
      
      <div class="total-price">
        <span>总价</span>
        <span class="total-amount">¥{{ totalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.price-calculator {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.calculator-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.price-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4b5563;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #d1d5db;
  font-weight: 600;
  color: #111827;
}

.total-amount {
  font-size: 1.25rem;
  color: #3b82f6;
}
</style>