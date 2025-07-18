"use client"

import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                M2
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold">MacBook Pro</h2>

              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-muted-foreground">Chip:</span>
                  <span>Apple M2 Pro</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>16 GB</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-muted-foreground">Serial Number:</span>
                  <span>C02XL0ZDJGH7</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-muted-foreground">macOS:</span>
                  <span>Sonoma 14.3</span>
                </div>
              </div>

              <div className="pt-4">
                <Button>System Report...</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
