import Link from "next/link"
import { Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Building2 className="h-6 w-6" />
          <span>Nawy</span>
        </Link>
      </div>
    </header>
  )
}
