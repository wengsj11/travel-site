import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { BookingForm, Booking, PaymentMethod } from '../types/booking'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    selectedDestinationId: '',
    currentBooking: {
      startDate: '',
      endDate: '',
      travelers: 1,
      roomType: 'standard'
    } as BookingForm,
    bookings: [] as Booking[]
  }),

  actions: {
    initializeBooking(destinationId: string) {
      this.selectedDestinationId = destinationId
      this.currentBooking = {
        startDate: '',
        endDate: '',
        travelers: 1,
        roomType: 'standard'
      }
    },

    updateBooking(booking: BookingForm) {
      this.currentBooking = booking
    },

    getDaysDifference(): number {
      if (!this.currentBooking.startDate || !this.currentBooking.endDate) {
        return 0
      }
      const start = new Date(this.currentBooking.startDate)
      const end = new Date(this.currentBooking.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },

    generateOrderId(): string {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 10000)
      return `ORDER${timestamp}${random}`
    },

    async submitBooking(paymentMethod: PaymentMethod) {
      const router = useRouter()
      const orderId = this.generateOrderId()
      
      const newBooking: Booking = {
        id: orderId,
        ...this.currentBooking,
        destinationId: this.selectedDestinationId,
        totalPrice: 0, // 这里的价格将由PriceCalculator组件计算
        paymentMethod,
        status: 'pending'
      }

      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.bookings.push(newBooking)
        
        // 跳转到订单确认页面
        router.push(`/order-confirmation/${orderId}`)
        
        return newBooking
      } catch (error) {
        throw new Error('预订提交失败')
      }
    }
  }
})