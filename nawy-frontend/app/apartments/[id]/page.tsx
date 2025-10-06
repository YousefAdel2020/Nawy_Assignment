"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bed, Bath, Maximize } from "lucide-react"
import type { Apartment } from "@/lib/types"
import { getImageUrl } from "@/lib/utils/images"
import { fetchApartment } from "@/lib/api/apartments"

export default function ApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [loading, setLoading] = useState(true)
  
  const resolvedParams = use(params)

  useEffect(() => {
    fetchApartment(resolvedParams.id)
      .then((data) => {
        setApartment(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!apartment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Apartment not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(apartment.images)}
              alt={apartment.unitName}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{apartment.unitName}</h1>
                <p className="text-gray-600">{apartment.project}</p>
              </div>
              <Badge variant={apartment.isAvailable ? "default" : "secondary"}>
                {apartment.isAvailable ? "Available" : "Not Available"}
              </Badge>
            </div>

            <div className="flex gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>{apartment.bedrooms ?? "N/A"} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>{apartment.bathrooms ?? "N/A"} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5" />
                <span>{apartment.area ?? "N/A"} sqft</span>
              </div>
            </div>

            {apartment.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <p className="text-3xl font-bold mb-4">
                {apartment.price ? `$${apartment.price.toLocaleString()}` : "Price not available"}
              </p>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit Number</span>
                  <span className="font-medium">{apartment.unitNumber}</span>
                </div>
                {apartment.floor !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor</span>
                    <span className="font-medium">{apartment.floor}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Project</span>
                  <span className="font-medium">{apartment.project}</span>
                </div>
              </div>

              <Button className="w-full" disabled={!apartment.isAvailable}>
                {apartment.isAvailable ? "Contact Agent" : "Not Available"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
