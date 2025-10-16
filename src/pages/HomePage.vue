<script setup lang="ts">
import { onMounted } from 'vue'
import { useDestinationStore } from '../stores/destination'
import Hero from '../components/home/Hero.vue'
import DestinationGrid from '../components/home/DestinationGrid.vue'
import FilterSection from '../components/home/FilterSection.vue'

const destinationStore = useDestinationStore()

onMounted(() => {
  destinationStore.fetchDestinations()
})
</script>

<template>
  <main class="main-container">
    <Hero />
    <div class="content-container">
      <FilterSection />
      <DestinationGrid :destinations="destinationStore.filteredDestinations" />
    </div>
  </main>
</template>

<style>
.main-container {
  min-height: 100vh;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>