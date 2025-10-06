export interface ApartmentImage {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  path: string
  createdAt: string
}

export interface Apartment {
  id: string // UUID
  unitName: string
  unitNumber: string
  project: string
  description?: string | null
  price: number | null
  bedrooms: number | null
  bathrooms: number | null
  area: number | null // in square feet
  floor: number | null
  isAvailable: boolean
  images: string[] // Array of image filenames
  createdAt?: Date
  updatedAt?: Date
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  totalRecords: number
  page: number
  limit: number
  totalPages: number
}

// Filter types
export interface ApartmentFilters {
  page?: number
  take?: number
  sortBy?: 'createdAt' | 'price' | 'area' | 'bedrooms' | 'bathrooms'
  sortDirection?: 'ASC' | 'DESC'
  search?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  minArea?: number
  maxArea?: number
  isAvailable?: boolean
}

// URL search params type
export interface ApartmentSearchParams {
  page?: string
  take?: string
  sortBy?: string
  sortDirection?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  bathrooms?: string
  minArea?: string
  maxArea?: string
  isAvailable?: string
}

