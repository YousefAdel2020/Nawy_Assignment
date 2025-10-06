import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Maximize } from "lucide-react"
import type { Apartment } from "@/lib/types"
import { getImageUrl } from "@/lib/utils/images"

export function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <Link href={`/apartments/${apartment.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-[4/3]">
          <Image
            src={getImageUrl(apartment.images)}
            alt={apartment.unitName}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-3 left-3" variant={apartment.isAvailable ? "default" : "secondary"}>
            {apartment.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{apartment.unitName}</h3>
          <p className="text-sm text-gray-600 mb-3">{apartment.project}</p>

          <p className="text-2xl font-bold mb-3">{apartment.price ? `$${apartment.price.toLocaleString()}` : "N/A"}</p>

          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{apartment.bedrooms ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{apartment.bathrooms ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{apartment.area ?? "N/A"} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
