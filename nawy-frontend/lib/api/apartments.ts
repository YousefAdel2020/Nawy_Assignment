import type { Apartment, ApartmentFilters, PaginatedResponse } from '@/lib/types'
import { API_CONFIG, PAGINATION_CONFIG, FILTER_CONFIG } from '@/lib/config'

/**
 * Builds query string from filters object
 */
function buildQueryString(filters: ApartmentFilters): string {
  const params = new URLSearchParams()
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString())
    }
  })
  
  return params.toString()
}

/**
 * Fetches apartments with filters and pagination
 */
export async function fetchApartments(filters: ApartmentFilters = {}): Promise<PaginatedResponse<Apartment>> {
  const queryString = buildQueryString(filters)
  const url = `${API_CONFIG.URL}/apartments${queryString ? `?${queryString}` : ''}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching apartments:', error)
    throw error
  }
}

/**
 * Fetches a single apartment by ID
 */
export async function fetchApartment(id: string): Promise<Apartment> {
  try {
    const response = await fetch(`${API_CONFIG.URL}/apartments/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching apartment:', error)
    throw error
  }
}

/**
 * Default filters for apartments
 */
export const defaultFilters: ApartmentFilters = {
  page: PAGINATION_CONFIG.DEFAULT_PAGE,
  take: PAGINATION_CONFIG.DEFAULT_TAKE,
  sortBy: FILTER_CONFIG.DEFAULT_SORT_BY,
  sortDirection: FILTER_CONFIG.DEFAULT_SORT_DIRECTION
}
