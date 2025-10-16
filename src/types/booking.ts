export type RoomType = 'standard' | 'deluxe' | 'suite'
export type PaymentMethod = 'alipay' | 'wechat' | 'creditCard'

export interface BookingForm {
  startDate: string
  endDate: string
  travelers: number
  roomType: RoomType
}

export interface Booking extends BookingForm {
  id: string
  destinationId: string
  totalPrice: number
  paymentMethod?: PaymentMethod
  status: 'pending' | 'confirmed' | 'cancelled'
}