import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Apple-Inspired Layout</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A modern web layout with smooth transitions and Apple-like design elements. Explore the sidebar navigation and
          detail pages.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/general">Explore General Settings</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/wifi">View Wi-Fi Settings</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/owasp">OWASP Security</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
        <div className="p-6 rounded-xl border bg-card">
          <h3 className="font-semibold mb-2">System Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure your system preferences with an intuitive interface.
          </p>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/general">Explore →</Link>
          </Button>
        </div>

        <div className="p-6 rounded-xl border bg-card">
          <h3 className="font-semibold mb-2">Network & Connectivity</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage Wi-Fi, Bluetooth, and network connections.</p>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/wifi">Configure →</Link>
          </Button>
        </div>

        <div className="p-6 rounded-xl border bg-card">
          <h3 className="font-semibold mb-2">Security Standards</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Learn about OWASP security guidelines and best practices.
          </p>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/owasp">Learn →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
