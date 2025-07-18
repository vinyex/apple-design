"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [previousPath, setPreviousPath] = useState<string | null>(null)

  // Determine direction based on path depth
  useEffect(() => {
    if (previousPath) {
      const prevSegments = previousPath.split("/").filter(Boolean).length
      const currentSegments = pathname.split("/").filter(Boolean).length

      if (currentSegments > prevSegments) {
        setDirection("right")
      } else if (currentSegments < prevSegments) {
        setDirection("left")
      }
    }

    setPreviousPath(pathname)
  }, [pathname, previousPath])

  const variants = {
    initial: (direction: "left" | "right") => ({
      x: direction === "right" ? 20 : -20,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -20 : 20,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  return (
    <motion.div
      key={pathname}
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
