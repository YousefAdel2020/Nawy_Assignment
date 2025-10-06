"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchApartments, defaultFilters } from '@/lib/api/apartments'
import type { Apartment, ApartmentFilters, PaginatedResponse } from '@/lib/types'

export function useApartments() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<PaginatedResponse<Apartment> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Parse filters from URL search params
  const getFiltersFromUrl = useCallback((): ApartmentFilters => {
    const filters: ApartmentFilters = { ...defaultFilters }

    // Parse each parameter
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
  }, [searchParams])

  // Update URL with new filters
  const updateUrl = useCallback((filters: ApartmentFilters) => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString())
      }
    })

    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [router])

  // Fetch apartments with current filters
  const fetchData = useCallback(async (filters: ApartmentFilters) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchApartments(filters)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apartments')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Update filters and fetch new data
  const updateFilters = useCallback((newFilters: ApartmentFilters) => {
    const mergedFilters = { ...getFiltersFromUrl(), ...newFilters }
    updateUrl(mergedFilters)
    fetchData(mergedFilters)
  }, [getFiltersFromUrl, updateUrl, fetchData])

  // Reset filters to default
  const resetFilters = useCallback(() => {
    updateUrl(defaultFilters)
    fetchData(defaultFilters)
  }, [updateUrl, fetchData])

  // Change page
  const changePage = useCallback((page: number) => {
    updateFilters({ page })
  }, [updateFilters])

  // Initial load
  useEffect(() => {
    const filters = getFiltersFromUrl()
    fetchData(filters)
  }, [getFiltersFromUrl, fetchData])

  return {
    data,
    loading,
    error,
    filters: getFiltersFromUrl(),
    updateFilters,
    resetFilters,
    changePage,
    refetch: () => fetchData(getFiltersFromUrl())
  }
}
