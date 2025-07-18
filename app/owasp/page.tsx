import OWASPDashboard from "@/components/owasp/owasp-dashboard"
import { ThemeToggle } from "@/components/theme-toggle"

export default function OWASPPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] dark:bg-[#1d1d1f] px-6 py-12 md:px-12 lg:px-24">
      <ThemeToggle />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] dark:text-white mb-8 tracking-tight">
          OWASP Security Standards
        </h1>
        <OWASPDashboard />
      </div>
    </main>
  )
}
