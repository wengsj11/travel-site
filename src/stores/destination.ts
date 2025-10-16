import { defineStore } from 'pinia'
import type { Destination, Region, TravelType, Season } from '../types/destination'

interface DestinationFilters {
  region?: Region
  type?: TravelType
  season?: Season
  priceRange?: {
    min: number
    max: number
  }
}

export const useDestinationStore = defineStore('destination', {
  state: () => ({
    destinations: [] as Destination[],
    filters: {
      region: undefined,
      type: undefined,
      season: undefined,
      priceRange: {
        min: 0,
        max: 10000
      }
    } as DestinationFilters
  }),

  getters: {
    filteredDestinations: (state) => {
      return state.destinations.filter(destination => {
        // 地区筛选
        if (state.filters.region && destination.region !== state.filters.region) {
          return false
        }

        // 类型筛选
        if (state.filters.type && destination.type !== state.filters.type) {
          return false
        }

        // 季节筛选
        if (state.filters.season && !destination.seasons.includes(state.filters.season)) {
          return false
        }

        // 价格范围筛选
        if (
          state.filters.priceRange &&
          (destination.basePrice < state.filters.priceRange.min ||
            destination.basePrice > state.filters.priceRange.max)
        ) {
          return false
        }

        return true
      })
    }
  },

  actions: {
    async fetchDestinations() {
      // 模拟API调用
      const mockDestinations: Destination[] = [
        {
          id: '1',
          name: '巴厘岛',
          description: '印度尼西亚最受欢迎的度假胜地，拥有美丽的海滩、古老的寺庙和独特的文化。',
          imageUrl: '/destinations/bali.jpg',
          basePrice: 3999,
          rating: 4.5,
          region: 'asia',
          type: 'beach',
          seasons: ['spring', 'summer', 'autumn']
        },
        {
          id: '2',
          name: '瑞士阿尔卑斯',
          description: '壮丽的山脉、清澈的湖泊和世界级的滑雪胜地。',
          imageUrl: '/destinations/swiss-alps.jpg',
          basePrice: 5999,
          rating: 4.8,
          region: 'europe',
          type: 'mountain',
          seasons: ['winter', 'summer']
        },
        {
          id: '3',
          name: '京都',
          description: '日本古都，千年文化与现代生活的完美融合。',
          imageUrl: '/destinations/kyoto.jpg',
          basePrice: 4599,
          rating: 4.7,
          region: 'asia',
          type: 'culture',
          seasons: ['spring', 'autumn']
        }
      ]

      await new Promise(resolve => setTimeout(resolve, 500))
      this.destinations = mockDestinations
    },

    setFilter(filter: Partial<DestinationFilters>) {
      this.filters = {
        ...this.filters,
        ...filter
      }
    }
  }
})