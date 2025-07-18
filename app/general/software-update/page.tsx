"use client"

import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Download, Check } from "lucide-react"

export default function SoftwareUpdatePage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">macOS Sonoma 14.4</h2>
                <p className="text-muted-foreground">Update available</p>
              </div>
            </div>

            <div className="space-y-4">
              <p>This update provides important security fixes and is recommended for all users.</p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Fixes an issue where some applications may unexpectedly quit</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Addresses security vulnerabilities</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Improves system stability and performance</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Update Now
              </Button>
              <Button variant="outline">More Info</Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
