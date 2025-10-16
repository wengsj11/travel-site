<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Destination } from '../../types/destination'

const props = defineProps<{
  destinations: Destination[]
}>()

const router = useRouter()

const navigateToBooking = (destinationId: string) => {
  router.push({
    path: '/booking',
    query: { id: destinationId }
  })
}
</script>

<template>
  <div class="destination-grid">
    <div
      v-for="destination in destinations"
      :key="destination.id"
      class="destination-card"
    >
      <img
        :src="destination.imageUrl"
        :alt="destination.name"
        class="destination-image"
      />
      <div class="destination-content">
        <div class="destination-header">
          <h3 class="destination-title">{{ destination.name }}</h3>
          <div class="rating">
            <span class="rating-star">★</span>
            <span class="rating-value">{{ destination.rating }}</span>
          </div>
        </div>
        <p class="destination-description">{{ destination.description }}</p>
        <div class="destination-footer">
          <span class="destination-price">¥{{ destination.basePrice }}</span>
          <button
            @click="navigateToBooking(destination.id)"
            class="book-button"
          >
            立即预订
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.destination-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .destination-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .destination-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.destination-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.destination-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.destination-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

.destination-content {
  padding: 1rem;
}

.destination-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.destination-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.rating {
  display: flex;
  align-items: center;
}

.rating-star {
  color: #fbbf24;
}

.rating-value {
  margin-left: 0.25rem;
  color: #4b5563;
}

.destination-description {
  color: #4b5563;
  margin-bottom: 1rem;
}

.destination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.destination-price {
  color: #3b82f6;
  font-size: 1.125rem;
  font-weight: 700;
}

.book-button {
  padding: 0.5rem 1rem;
  background-color: #22c55e;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.book-button:hover {
  background-color: #4ade80;
}
</style>