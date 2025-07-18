"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  // Convert pathname to title (e.g., "/general" -> "General")
  const getPageTitle = () => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/auth")) return ""

    const segments = pathname.substring(1).split("/")
    return segments
      .map((segment) =>
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join(" > ")
  }

  // Don't show header on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <div className="h-4 w-px bg-sidebar-border" />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-7 w-7" aria-label="Go back">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.forward()}
            className="h-7 w-7"
            aria-label="Go forward"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="ml-4 flex-1">
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  )
}
