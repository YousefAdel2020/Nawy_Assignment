"use client"

import { Suspense } from "react"
import { ApartmentCard } from "@/components/apartment-card"
import { ApartmentFiltersComponent } from "@/components/apartment-filters"
import { Pagination } from "@/components/pagination"
import { useApartments } from "@/hooks/use-apartments"

function HomePageContent() {
  const { data, loading, error, filters, updateFilters, resetFilters, changePage } = useApartments()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading apartments...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apartments</h1>
        <p className="text-gray-600">Browse available apartments</p>
      </div>

      <ApartmentFiltersComponent
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
      />

      {!data || data.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No apartments found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.data.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>

          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={changePage}
            itemCount={data.totalRecords}
            limit={data.limit}
          />
        </>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
