import { API_CONFIG } from '@/lib/config'

export function getImageUrl(images: string[]): string {
  if (!images || images.length === 0) {
    return "/placeholder.svg"
  }
  
  return `${API_CONFIG.STATIC_URL}/${images[0]}`
}
