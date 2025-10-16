<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedDate = ref('')
const travelers = ref(1)

const handleSearch = () => {
  router.push({
    path: '/booking',
    query: { search: searchQuery.value, date: selectedDate.value, travelers: travelers.value }
  })
}
</script>

<template>
  <div class="hero-container" 
       style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')">
    <div class="overlay"></div>
    <div class="hero-content">
      <div class="hero-text">
        <h1>探索世界的每个角落</h1>
        <p>开启您的下一次难忘旅程</p>
        
        <div class="search-container">
          <div class="search-grid">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索目的地"
              class="search-input"
            />
            <input
              v-model="selectedDate"
              type="date"
              class="search-input"
            />
            <div class="search-action">
              <input
                v-model="travelers"
                type="number"
                min="1"
                class="search-input"
                placeholder="旅行人数"
              />
              <button
                @click="handleSearch"
                class="search-button"
              >
                搜索
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hero-container {
  position: relative;
  height: 80vh;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  text-align: center;
  color: white;
  padding: 0 1rem;
}

.hero-text h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-text h1 {
    font-size: 3.75rem;
  }
}

.hero-text p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .hero-text p {
    font-size: 1.5rem;
  }
}

.search-container {
  max-width: 56rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.search-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .search-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  color: #1f2937;
}

.search-action {
  display: flex;
  gap: 1rem;
}

.search-button {
  padding: 0.5rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #60a5fa;
}
</style>