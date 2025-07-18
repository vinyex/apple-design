"use client"

import { PageTransition } from "@/components/page-transition"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Bluetooth, BluetoothOff, Headphones, Laptop, Mouse, Keyboard, Plus } from "lucide-react"
import { useState } from "react"

export default function BluetoothPage() {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)

  const devices = [
    { name: "AirPods Pro", type: "headphones", connected: true, battery: 85 },
    { name: "Magic Mouse", type: "mouse", connected: true, battery: 64 },
    { name: "Magic Keyboard", type: "keyboard", connected: false, battery: 42 },
    { name: "MacBook Pro", type: "laptop", connected: false, battery: null },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "headphones":
        return <Headphones className="h-4 w-4" />
      case "mouse":
        return <Mouse className="h-4 w-4" />
      case "keyboard":
        return <Keyboard className="h-4 w-4" />
      case "laptop":
        return <Laptop className="h-4 w-4" />
      default:
        return <Bluetooth className="h-4 w-4" />
    }
  }

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {bluetoothEnabled ? (
                    <Bluetooth className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  ) : (
                    <BluetoothOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Label htmlFor="bluetooth-toggle" className="text-lg font-medium">
                  Bluetooth
                </Label>
              </div>
              <Switch id="bluetooth-toggle" checked={bluetoothEnabled} onCheckedChange={setBluetoothEnabled} />
            </div>
          </div>

          {bluetoothEnabled && (
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Devices</h3>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Add Device
                </Button>
              </div>
              <div className="divide-y">
                {devices.map((device) => (
                  <div
                    key={device.name}
                    className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${
                      device.connected ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {device.connected ? "Connected" : "Not Connected"}
                        </div>
                      </div>
                    </div>

                    {device.battery !== null && <div className="text-sm text-muted-foreground">{device.battery}%</div>}
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
