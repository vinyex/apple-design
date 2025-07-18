"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Purple background with logo and waves */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 p-8 flex flex-col relative overflow-hidden">
        {/* Logo and tagline */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 20C61 20 70 29 70 40C70 51 61 60 50 60C39 60 30 51 30 40C30 29 39 20 50 20ZM50 90C37.5 90 26.5 84.5 19 75.5C19.5 62.5 37.5 55.5 50 55.5C62.5 55.5 80.5 62.5 81 75.5C73.5 84.5 62.5 90 50 90Z"
                  fill="#8220FF"
                />
              </svg>
            </div>
            <span className="text-white text-2xl font-bold">PLEXICUS</span>
          </Link>
          <p className="text-white/90 mt-4 max-w-md">
            AI Agent-Driven ASPM: Detect, Prioritize & Remediate your Application Ecosystem
          </p>
        </div>

        {/* Animated waves */}
        <div className="absolute inset-0 z-0 opacity-30">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-white/40 rounded-full"
              style={{
                width: `${Math.random() * 30 + 70}%`,
                left: `${Math.random() * 20}%`,
                top: `${30 + i * 6}%`,
              }}
              animate={{
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
