import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../pages/BookingPage.vue')
    },
    {
      path: '/order-confirmation/:id',
      name: 'orderConfirmation',
      component: () => import('../pages/OrderConfirmationPage.vue')
    },
    {
      path: '/user/orders',
      name: 'userOrders',
      component: () => import('../pages/UserOrdersPage.vue')
    }
  ]
})

export default router