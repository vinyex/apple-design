"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Wifi,
  Bluetooth,
  Network,
  Globe,
  Bell,
  Volume2,
  Moon,
  Clock,
  Settings,
  Palette,
  Accessibility,
  LayoutGrid,
  MessageSquare,
  ShieldCheck,
  Monitor,
  ImageIcon,
  Timer,
  Battery,
  Search,
  User,
  LogOut,
  ChevronRight,
  Home,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MenuItem {
  href: string
  icon: React.ElementType
  label: string
  children?: MenuItem[]
}

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  // Define menu items with children
  const menuItems: MenuItem[] = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/wifi", icon: Wifi, label: "Wi-Fi" },
    { href: "/bluetooth", icon: Bluetooth, label: "Bluetooth" },
    {
      href: "/network",
      icon: Network,
      label: "Network",
      children: [
        { href: "/network/ethernet", icon: Globe, label: "Ethernet" },
        { href: "/network/vpn", icon: Globe, label: "VPN" },
        { href: "/network/firewall", icon: ShieldCheck, label: "Firewall" },
      ],
    },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/sound", icon: Volume2, label: "Sound" },
    { href: "/focus", icon: Moon, label: "Focus" },
    { href: "/screen-time", icon: Clock, label: "Screen Time" },
    {
      href: "/general",
      icon: Settings,
      label: "General",
      children: [
        { href: "/general/about", icon: Settings, label: "About" },
        { href: "/general/software-update", icon: Settings, label: "Software Update" },
        { href: "/general/storage", icon: Settings, label: "Storage" },
      ],
    },
    { href: "/appearance", icon: Palette, label: "Appearance" },
    { href: "/accessibility", icon: Accessibility, label: "Accessibility" },
    { href: "/control-center", icon: LayoutGrid, label: "Control Center" },
    { href: "/siri", icon: MessageSquare, label: "Siri & Spotlight" },
    { href: "/privacy", icon: ShieldCheck, label: "Privacy & Security" },
    { href: "/desktop", icon: Monitor, label: "Desktop & Dock" },
    { href: "/displays", icon: Monitor, label: "Displays" },
    { href: "/wallpaper", icon: ImageIcon, label: "Wallpaper" },
    { href: "/screen-saver", icon: Timer, label: "Screen Saver" },
    { href: "/battery", icon: Battery, label: "Battery" },
    { href: "/owasp", icon: ShieldCheck, label: "OWASP Security" },
  ]

  // Check if a path is active or one of its children is active
  const isActiveOrChildActive = (item: MenuItem): boolean => {
    if (pathname === item.href) return true
    if (item.children) {
      return item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"))
    }
    return pathname.startsWith(item.href + "/")
  }

  // Toggle submenu
  const toggleSubmenu = (href: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  // Filter menu items based on search
  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    if (!searchQuery) return items

    return items
      .filter((item) => {
        const matchesLabel = item.label.toLowerCase().includes(searchQuery.toLowerCase())
        const hasMatchingChildren =
          item.children && item.children.some((child) => child.label.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesLabel || hasMatchingChildren
      })
      .map((item) => {
        if (!item.children) return item

        return {
          ...item,
          children: item.children.filter((child) => child.label.toLowerCase().includes(searchQuery.toLowerCase())),
        }
      })
  }

  const filteredMenuItems = filterMenuItems(menuItems)

  // Auto-expand parent menus when a child is active
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}

    menuItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"))
      ) {
        newOpenMenus[item.href] = true
      }
    })

    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }))
  }, [pathname])

  // Don't render sidebar on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="relative px-2">
          <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 bg-muted/80 border-none focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="mb-4 px-4">
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">John Appleseed</span>
              <span className="text-xs text-muted-foreground">Apple ID</span>
            </div>
          </div>
        </div>

        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              {item.children ? (
                <Collapsible
                  open={openMenus[item.href]}
                  onOpenChange={() => toggleSubmenu(item.href)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isActiveOrChildActive(item)}
                      tooltip={item.label}
                      className="transition-all duration-200"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRight
                        className={`ml-auto h-4 w-4 transition-transform ${openMenus[item.href] ? "rotate-90" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.href}>
                          <SidebarMenuSubButton asChild isActive={pathname === child.href}>
                            <Link href={child.href}>
                              <child.icon />
                              <span>{child.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="transition-all duration-200"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/auth/login">
                <LogOut />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
