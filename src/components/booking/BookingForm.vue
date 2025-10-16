<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBookingStore } from '../../stores/booking'
import type { RoomType } from '../../types/booking'

const bookingStore = useBookingStore()

const startDate = ref(bookingStore.currentBooking.startDate)
const endDate = ref(bookingStore.currentBooking.endDate)
const travelers = ref(bookingStore.currentBooking.travelers)
const selectedRoomType = ref<RoomType>(bookingStore.currentBooking.roomType)

const roomTypes = [
  { value: 'standard', label: '标准房' },
  { value: 'deluxe', label: '豪华房' },
  { value: 'suite', label: '套房' }
]

watch([startDate, endDate, travelers, selectedRoomType], () => {
  bookingStore.updateBooking({
    startDate: startDate.value,
    endDate: endDate.value,
    travelers: travelers.value,
    roomType: selectedRoomType.value
  })
})
</script>

<template>
  <div class="booking-form">
    <h2 class="form-title">预订信息</h2>
    
    <div class="form-group">
      <label for="startDate" class="form-label">入住日期</label>
      <input
        type="date"
        id="startDate"
        v-model="startDate"
        class="form-input"
        :min="new Date().toISOString().split('T')[0]"
      >
    </div>
    
    <div class="form-group">
      <label for="endDate" class="form-label">离店日期</label>
      <input
        type="date"
        id="endDate"
        v-model="endDate"
        class="form-input"
        :min="startDate || new Date().toISOString().split('T')[0]"
      >
    </div>
    
    <div class="form-group">
      <label for="travelers" class="form-label">旅行人数</label>
      <input
        type="number"
        id="travelers"
        v-model="travelers"
        class="form-input"
        min="1"
        max="10"
      >
    </div>
    
    <div class="form-group">
      <label for="roomType" class="form-label">房型选择</label>
      <select
        id="roomType"
        v-model="selectedRoomType"
        class="form-input"
      >
        <option
          v-for="type in roomTypes"
          :key="type.value"
          :value="type.value"
        >
          {{ type.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style>
.booking-form {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.form-input::-webkit-outer-spin-button,
.form-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-input[type=number] {
  -moz-appearance: textfield;
}
</style>