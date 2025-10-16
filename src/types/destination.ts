export type Region = 'asia' | 'europe' | 'america' | 'africa' | 'oceania'
export type TravelType = 'beach' | 'mountain' | 'city' | 'culture' | 'adventure'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface Destination {
  id: string
  name: string
  description: string
  imageUrl: string
  basePrice: number
  rating: number
  region: Region
  type: TravelType
  seasons: Season[]
}