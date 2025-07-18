"use client"

import type React from "react"
import Link from "next/link"
import {
  ChevronRight,
  Info,
  Download,
  HardDrive,
  Share2,
  History,
  RefreshCw,
  HardDriveIcon as HardDisk,
} from "lucide-react"
import { PageTransition } from "@/components/page-transition"

export default function GeneralPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {/* Settings items */}
          <SettingsGroup>
            <SettingsItem icon={<Info className="h-5 w-5 text-blue-500" />} label="About" href="/general/about" />
            <SettingsItem
              icon={<Download className="h-5 w-5 text-blue-500" />}
              label="Software Update"
              href="/general/software-update"
              badge="1 Update Available"
            />
            <SettingsItem
              icon={<HardDrive className="h-5 w-5 text-blue-500" />}
              label="Storage"
              href="/general/storage"
            />
            <SettingsItem
              icon={<Share2 className="h-5 w-5 text-blue-500" />}
              label="AirDrop & Handoff"
              href="/general/airdrop"
            />
            <SettingsItem
              icon={<RefreshCw className="h-5 w-5 text-blue-500" />}
              label="Login Items"
              href="/general/login-items"
            />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem
              icon={<History className="h-5 w-5 text-blue-500" />}
              label="Time Machine"
              href="/general/time-machine"
            />
            <SettingsItem
              icon={<RefreshCw className="h-5 w-5 text-blue-500" />}
              label="Transfer or Reset"
              href="/general/transfer-reset"
            />
            <SettingsItem
              icon={<HardDisk className="h-5 w-5 text-blue-500" />}
              label="Startup Disk"
              href="/general/startup-disk"
            />
          </SettingsGroup>
        </div>
      </div>
    </PageTransition>
  )
}

function SettingsGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="divide-y">{children}</div>
    </div>
  )
}

function SettingsItem({
  icon,
  label,
  href,
  badge,
}: {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
}) {
  return (
    <Link href={href} className="group">
      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">{badge}</span>}
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
  )
}
