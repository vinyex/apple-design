"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Shield } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/80 dark:bg-[#1d1d1f]/80 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg flex items-center gap-2">
        <Link
          href="/"
          className={`p-2 rounded-full transition-all ${
            pathname === "/" ? "bg-[#8220FF] text-white" : "hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>
        <Link
          href="/owasp"
          className={`p-2 rounded-full transition-all ${
            pathname === "/owasp" ? "bg-[#8220FF] text-white" : "hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]"
          }`}
        >
          <Shield className="h-5 w-5" />
          <span className="sr-only">OWASP</span>
        </Link>
      </div>
    </div>
  )
}
