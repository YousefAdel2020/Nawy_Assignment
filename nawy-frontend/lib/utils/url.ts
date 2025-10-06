import type { ApartmentFilters, ApartmentSearchParams } from '@/lib/types'

/**
 * Converts URL search params to apartment filters
 */
export function searchParamsToFilters(searchParams: URLSearchParams): ApartmentFilters {
  const filters: ApartmentFilters = {}

  const page = searchParams.get('page')
  const take = searchParams.get('take')
  const sortBy = searchParams.get('sortBy')
  const sortDirection = searchParams.get('sortDirection')
  const search = searchParams.get('search')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const bedrooms = searchParams.get('bedrooms')
  const bathrooms = searchParams.get('bathrooms')
  const minArea = searchParams.get('minArea')
  const maxArea = searchParams.get('maxArea')
  const isAvailable = searchParams.get('isAvailable')

  if (page) filters.page = parseInt(page, 10)
  if (take) filters.take = parseInt(take, 10)
  if (sortBy) filters.sortBy = sortBy as any
  if (sortDirection) filters.sortDirection = sortDirection as 'ASC' | 'DESC'
  if (search) filters.search = search
  if (minPrice) filters.minPrice = parseInt(minPrice, 10)
  if (maxPrice) filters.maxPrice = parseInt(maxPrice, 10)
  if (bedrooms) filters.bedrooms = parseInt(bedrooms, 10)
  if (bathrooms) filters.bathrooms = parseFloat(bathrooms)
  if (minArea) filters.minArea = parseInt(minArea, 10)
  if (maxArea) filters.maxArea = parseInt(maxArea, 10)
  if (isAvailable) filters.isAvailable = isAvailable === 'true'

  return filters
}

/**
 * Converts apartment filters to URL search params
 */
export function filtersToSearchParams(filters: ApartmentFilters): URLSearchParams {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value.toString())
    }
  })

  return params
}

/**
 * Creates a URL with filters applied
 */
export function createFilteredUrl(filters: ApartmentFilters, basePath: string = ''): string {
  const params = filtersToSearchParams(filters)
  const queryString = params.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}
