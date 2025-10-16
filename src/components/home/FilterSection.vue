<script setup lang="ts">
import { useDestinationStore } from '../../stores/destination'
import type { TravelType, Season } from '../../types/destination'

const store = useDestinationStore()

const regions = ['亚洲', '欧洲', '美洲', '非洲', '大洋洲']
const travelTypes: TravelType[] = ['adventure', 'leisure', 'cultural', 'business']
const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter']

const travelTypeNames = {
  adventure: '探险',
  leisure: '休闲',
  cultural: '文化',
  business: '商务'
}

const seasonNames = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季'
}
</script>

<template>
  <div class="filter-container">
    <h2 class="filter-title">筛选条件</h2>
    <div class="filter-grid">
      <!-- 地区筛选 -->
      <div class="filter-group">
        <label class="filter-label">地区</label>
        <select
          v-model="store.filters.region"
          class="filter-select"
        >
          <option value="">全部地区</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>

      <!-- 旅行类型筛选 -->
      <div class="filter-group">
        <label class="filter-label">旅行类型</label>
        <select
          v-model="store.filters.type"
          class="filter-select"
        >
          <option value="">全部类型</option>
          <option v-for="type in travelTypes" :key="type" :value="type">
            {{ travelTypeNames[type] }}
          </option>
        </select>
      </div>

      <!-- 季节筛选 -->
      <div class="filter-group">
        <label class="filter-label">季节</label>
        <select
          v-model="store.filters.season"
          class="filter-select"
        >
          <option value="">全部季节</option>
          <option v-for="season in seasons" :key="season" :value="season">
            {{ seasonNames[season] }}
          </option>
        </select>
      </div>

      <!-- 价格范围筛选 -->
      <div class="filter-group">
        <label class="filter-label">价格范围</label>
        <div class="price-range">
          <input
            v-model="store.filters.priceRange.min"
            type="number"
            class="filter-input"
            placeholder="最低价"
          />
          <span class="price-separator">-</span>
          <input
            v-model="store.filters.priceRange.max"
            type="number"
            class="filter-input"
            placeholder="最高价"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.filter-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .filter-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .filter-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.filter-select,
.filter-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-separator {
  color: #6b7280;
}
</style>