"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Check } from "lucide-react"
import type { ApartmentFilters } from "@/lib/types"

interface ApartmentFiltersProps {
  filters: ApartmentFilters
  onFiltersChange: (filters: ApartmentFilters) => void
  onReset: () => void
}

export function ApartmentFiltersComponent({ 
  filters, 
  onFiltersChange, 
  onReset 
}: ApartmentFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tempFilters, setTempFilters] = useState<ApartmentFilters>(filters)

  const updateFilter = (key: keyof ApartmentFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filters change
    })
  }

  const updateTempFilter = (key: keyof ApartmentFilters, value: any) => {
    setTempFilters({
      ...tempFilters,
      [key]: value
    })
  }

  const applyFilters = () => {
    onFiltersChange({
      ...tempFilters,
      page: 1 // Reset to first page when applying filters
    })
  }

  const resetTempFilters = () => {
    setTempFilters(filters)
  }

  const clearFilter = (key: keyof ApartmentFilters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFiltersChange({
      ...newFilters,
      page: 1
    })
  }

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof ApartmentFilters]
    return value !== undefined && value !== null && value !== '' && key !== 'page' && key !== 'take'
  })

  const hasTempChanges = JSON.stringify(tempFilters) !== JSON.stringify(filters)

  // Sync tempFilters with actual filters when they change
  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  return (
    <div className="mb-6">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search apartments by unit name, unit number or project"
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {Object.keys(filters).filter(key => {
                const value = filters[key as keyof ApartmentFilters]
                return value !== undefined && value !== null && value !== '' && key !== 'page' && key !== 'take'
                && key !== 'sortBy' && key !== 'sortDirection'
              }).length}
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={onReset} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Apartments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={tempFilters.minPrice || ''}
                    onChange={(e) => updateTempFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={tempFilters.maxPrice || ''}
                    onChange={(e) => updateTempFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="Any"
                  value={tempFilters.bedrooms || ''}
                  onChange={(e) => updateTempFilter('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                  className="text-sm"
                />
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bathrooms</label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="Any"
                  value={tempFilters.bathrooms || ''}
                  onChange={(e) => updateTempFilter('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                  className="text-sm"
                />
              </div>

              {/* Area Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Area (sqft)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={tempFilters.minArea || ''}
                    onChange={(e) => updateTempFilter('minArea', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={tempFilters.maxArea || ''}
                    onChange={(e) => updateTempFilter('maxArea', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-4">
              <label className="text-sm font-medium">Availability</label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={tempFilters.isAvailable === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateTempFilter('isAvailable', tempFilters.isAvailable === true ? undefined : true)}
                >
                  Available
                </Button>
                <Button
                  variant={tempFilters.isAvailable === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateTempFilter('isAvailable', tempFilters.isAvailable === false ? undefined : false)}
                >
                  Unavailable
                </Button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="mt-4">
              <label className="text-sm font-medium">Sort By</label>
              <div className="flex gap-2 mt-2">
                <select
                  value={tempFilters.sortBy || 'createdAt'}
                  onChange={(e) => updateTempFilter('sortBy', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="price">Price</option>
                  <option value="area">Area</option>
                  <option value="bedrooms">Bedrooms</option>
                  <option value="bathrooms">Bathrooms</option>
                </select>
                <select
                  value={tempFilters.sortDirection || 'DESC'}
                  onChange={(e) => updateTempFilter('sortDirection', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="DESC">Descending</option>
                  <option value="ASC">Ascending</option>
                </select>
              </div>
            </div>

            {/* Apply Filter Button */}
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={resetTempFilters}
                disabled={!hasTempChanges}
              >
                Reset
              </Button>
              <Button
                onClick={applyFilters}
                disabled={!hasTempChanges}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
