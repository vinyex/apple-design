"use client"

import { PageTransition } from "@/components/page-transition"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Wifi, WifiOff, Lock } from "lucide-react"
import { useState } from "react"

export default function WifiPage() {
  const [wifiEnabled, setWifiEnabled] = useState(true)

  const networks = [
    { name: "Home Network", signal: 90, secure: true, connected: true },
    { name: "Neighbor's WiFi", signal: 70, secure: true, connected: false },
    { name: "Coffee Shop", signal: 50, secure: false, connected: false },
    { name: "Guest Network", signal: 40, secure: true, connected: false },
    { name: "Public WiFi", signal: 30, secure: false, connected: false },
  ]

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {wifiEnabled ? (
                    <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Label htmlFor="wifi-toggle" className="text-lg font-medium">
                  Wi-Fi
                </Label>
              </div>
              <Switch id="wifi-toggle" checked={wifiEnabled} onCheckedChange={setWifiEnabled} />
            </div>
          </div>

          {wifiEnabled && (
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium">Networks</h3>
              </div>
              <div className="divide-y">
                {networks.map((network) => (
                  <div
                    key={network.name}
                    className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${
                      network.connected ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <SignalStrength strength={network.signal} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{network.name}</span>
                          {network.secure && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                        </div>
                        {network.connected && <span className="text-xs text-muted-foreground">Connected</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

function SignalStrength({ strength }: { strength: number }) {
  const bars = 4
  const activeBars = Math.round((strength / 100) * bars)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm ${i < activeBars ? "bg-blue-500" : "bg-muted-foreground/30"}`}
          style={{
            height: `${6 + i * 2}px`,
          }}
        />
      ))}
    </div>
  )
}
