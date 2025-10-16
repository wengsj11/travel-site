<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand" @click="router.push('/')">
        <img src="/vite.svg" alt="Logo" class="nav-logo" />
        <span class="brand-name">旅行网</span>
      </div>
      
      <div class="nav-links">
        <button
          class="nav-link"
          @click="router.push('/')"
        >
          首页
        </button>
        <button
          class="nav-link"
          @click="router.push('/user/orders')"
        >
          我的订单
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.nav-logo {
  width: 2rem;
  height: 2rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.nav-link:hover {
  color: #3b82f6;
}
</style>